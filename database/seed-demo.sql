-- =====================================================================
-- SEED DE DEMONSTRAÇÃO — SDVM Angola MVP
-- Este ficheiro é executado automaticamente no primeiro `docker compose up`
-- =====================================================================

-- Instrumentos (acções + títulos)
INSERT INTO instruments (id, ticker, isin, name, type, currency, face_value, coupon_rate, maturity_date, status) VALUES
  ('11111111-1111-1111-1111-111111111111', 'BAI',    'AO0000000001', 'Banco Angolano de Investimentos', 'STOCK', 'AOA', NULL, NULL, NULL, 'LISTED'),
  ('22222222-2222-2222-2222-222222222222', 'BFA',    'AO0000000002', 'Banco de Fomento Angola',          'STOCK', 'AOA', NULL, NULL, NULL, 'LISTED'),
  ('33333333-3333-3333-3333-333333333333', 'BCGA',   'AO0000000003', 'Banco Caixa Geral Angola',         'STOCK', 'AOA', NULL, NULL, NULL, 'LISTED'),
  ('44444444-4444-4444-4444-444444444444', 'ENSA',   'AO0000000004', 'ENSA Seguros',                     'STOCK', 'AOA', NULL, NULL, NULL, 'LISTED'),
  ('55555555-5555-5555-5555-555555555555', 'OT-2027','AO0000000005', 'Obrigação do Tesouro 2027',        'OT',    'AOA', 1000, 0.1550, '2027-12-31', 'LISTED'),
  ('66666666-6666-6666-6666-666666666666', 'BT-2025','AO0000000006', 'Bilhete do Tesouro 2025',          'OT',    'AOA', 950,  0.1200, '2025-12-31', 'LISTED')
ON CONFLICT DO NOTHING;

-- Utilizadores de demo (password: Demo@2025)
INSERT INTO users (id, email, phone, nif, full_name, password_hash, role, kyc_status, kyc_verified_at, is_active) VALUES
  ('aaaaaaaa-0000-0000-0000-000000000001', 'investidor@demo.ao', '+244923000001', '000123456LA041', 'Ana Silva (Demo)', '$2a$10$dummyhashplaceholder', 'RETAIL', 'APPROVED', NOW(), TRUE),
  ('aaaaaaaa-0000-0000-0000-000000000002', 'trader@demo.ao',     '+244923000002', '000123457LA042', 'João Mateus (Demo)', '$2a$10$dummyhashplaceholder', 'RETAIL', 'APPROVED', NOW(), TRUE),
  ('aaaaaaaa-0000-0000-0000-000000000003', 'admin@sdvm.ao',      '+244923000003', '000123458LA043', 'Direcção SDVM (Demo)', '$2a$10$dummyhashplaceholder', 'ADMIN', 'APPROVED', NOW(), TRUE)
ON CONFLICT DO NOTHING;

-- Contas custódia (NRC emitido pela CEVAMA)
INSERT INTO custody_accounts (id, user_id, nrc, cevama_ref, status, opened_at) VALUES
  ('cccccccc-0000-0000-0000-000000000001', 'aaaaaaaa-0000-0000-0000-000000000001', 'AO-SDVM-2025-00042', 'CEV-2025-001', 'ACTIVE', NOW()),
  ('cccccccc-0000-0000-0000-000000000002', 'aaaaaaaa-0000-0000-0000-000000000002', 'AO-SDVM-2025-00043', 'CEV-2025-002', 'ACTIVE', NOW()),
  ('cccccccc-0000-0000-0000-000000000003', 'aaaaaaaa-0000-0000-0000-000000000003', 'AO-SDVM-2025-00001', 'CEV-2025-000', 'ACTIVE', NOW())
ON CONFLICT DO NOTHING;

-- Saldos em Kwanzas (com Float a render)
INSERT INTO cash_accounts (user_id, balance_aoa, blocked_aoa, float_aoa, float_yield_aoa) VALUES
  ('aaaaaaaa-0000-0000-0000-000000000001', 485000.00, 18500.00, 466500.00, 312.40),
  ('aaaaaaaa-0000-0000-0000-000000000002', 1250000.00, 0.00, 1250000.00, 1840.00),
  ('aaaaaaaa-0000-0000-0000-000000000003', 50000000.00, 0.00, 0.00, 0.00)
ON CONFLICT DO NOTHING;

-- Carteiras de demonstração
INSERT INTO portfolios (user_id, instrument_id, quantity, avg_price) VALUES
  ('aaaaaaaa-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 15, 18200.00),
  ('aaaaaaaa-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 8,  12100.00),
  ('aaaaaaaa-0000-0000-0000-000000000001', '55555555-5555-5555-5555-555555555555', 50, 1000.00),
  ('aaaaaaaa-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 120, 17900.00),
  ('aaaaaaaa-0000-0000-0000-000000000002', '33333333-3333-3333-3333-333333333333', 45, 9600.00),
  ('aaaaaaaa-0000-0000-0000-000000000002', '44444444-4444-4444-4444-444444444444', 30, 7100.00)
ON CONFLICT DO NOTHING;

-- Métricas executivas (para painel do pitch)
INSERT INTO revenue_metrics (metric_date, float_balance_aoa, float_yield_aoa, commission_aoa, volume_traded_aoa, active_users) VALUES
  (CURRENT_DATE - INTERVAL '5 months', 380000000, 5200000,  3800000, 760000000,  6200),
  (CURRENT_DATE - INTERVAL '4 months', 420000000, 6100000,  4100000, 820000000,  7400),
  (CURRENT_DATE - INTERVAL '3 months', 510000000, 7400000,  4600000, 920000000,  8900),
  (CURRENT_DATE - INTERVAL '2 months', 560000000, 8000000,  5200000, 1040000000, 10200),
  (CURRENT_DATE - INTERVAL '1 month',  640000000, 9300000,  5800000, 1180000000, 11600),
  (CURRENT_DATE,                       700000000, 6400000,  4600000, 1840000000, 12480)
ON CONFLICT DO NOTHING;

-- Depósito recente (para extrato)
INSERT INTO deposits (user_id, payment_ref, amount_aoa, status, confirmed_at) VALUES
  ('aaaaaaaa-0000-0000-0000-000000000001', 'MCX-SEED-001', 50000.00, 'CONFIRMED', NOW() - INTERVAL '2 days'),
  ('aaaaaaaa-0000-0000-0000-000000000001', 'MCX-SEED-002', 25000.00, 'CONFIRMED', NOW() - INTERVAL '5 days')
ON CONFLICT DO NOTHING;
