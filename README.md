<div align="center">

# 🏦 SDVM Angola

### Corretora Digital & Distribuidora de Valores Mobiliários

**MVP funcional para o mercado de capitais angolano · BODIVA · Regulado pela CMC**

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis&logoColor=white)](https://redis.io)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://docker.com)
[![CI](https://github.com/sua-org/sdvm-angola/actions/workflows/ci.yml/badge.svg)](https://github.com/sua-org/sdvm-angola/actions)

[**🚀 Demo Local (3 min)**](#-arrancar-em-3-comandos) · [**📊 Ver Dashboards**](#-o-que-vai-ver) · [**💼 Pitch**](docs/PITCH.md) · [**📜 Conformidade**](docs/REGULATORY.md)

</div>

---

## 🎯 O que é isto?

Este repositório é o **MVP funcional e executável** de uma Sociedade Distribuidora de Valores Mobiliários (SDVM) desenhada para o mercado angolano.

Foi construído para **demonstrar viabilidade técnica, conformidade regulatória e modelo de negócio** a decisores, investidores e à Comissão do Mercado de Capitais (CMC).

> **Uma corretora que cabe no bolso do investidor de retalho, com a infraestrutura de uma instituição financeira.**

---

## 🎬 O que vai ver

<table>
<tr>
<td width="33%" align="center">
<h4>👤 Investidor de Retalho</h4>
<img src="docs/screenshots/retail-dashboard.png" width="100%"/>
<p><em>Compra de acções com um clique, saldo a render (Float), depósito via Multicaixa Express.</em></p>
<a href="frontend/retail-dashboard.html"><b>Abrir dashboard →</b></a>
</td>
<td width="33%" align="center">
<h4>📈 Mesa de Negociação</h4>
<img src="docs/screenshots/trading-terminal.png" width="100%"/>
<p><em>Terminal profissional (estilo MetaTrader): gráficos, DOM, Time & Sales, ordens em tempo real.</em></p>
<a href="frontend/trading-terminal.html"><b>Abrir terminal →</b></a>
</td>
<td width="33%" align="center">
<h4>📊 Painel Executivo</h4>
<img src="docs/screenshots/executive-dashboard.png" width="100%"/>
<p><em>Como a SDVM lucra: juros do Float, comissões, volume, conformidade CMC.</em></p>
<a href="frontend/executive-dashboard.html"><b>Abrir painel →</b></a>
</td>
</tr>
</table>

---

## ⚡ Arrancar em 3 comandos

**Pré-requisitos:** Docker + Docker Compose

```bash
git clone https://github.com/sua-org/sdvm-angola.git
cd sdvm-angola
./scripts/start-demo.sh     # Linux/macOS
# ou no Windows:  docker compose up
```

**Em 30 segundos** estará tudo a correr:

| Serviço | URL |
|---------|-----|
| 🌐 **Landing page (para investidores)** | http://localhost:8080 |
| 👤 Dashboard Retalho | http://localhost:8080/retail-dashboard.html |
| 📈 Terminal de Trading | http://localhost:8080/trading-terminal.html |
| 📊 Painel Executivo | http://localhost:8080/executive-dashboard.html |
| 🔌 API REST | http://localhost:3000 |
| 📡 WebSocket | ws://localhost:3000/ws |

**Credenciais de demonstração:**
- 📧 `investidor@demo.ao` / 🔑 `Demo@2025`
- 📧 `trader@demo.ao` / 🔑 `Demo@2025`

---

## 💰 Proposta de Valor

### O problema

| Dores do mercado angolano | Impacto |
|---------------------------|---------|
| **&lt; 1%** da população investe em bolsa | Mercado de capitais subdesenvolvido |
| Custos de custódia e corretagem elevados | Retalho excluído |
| Liquidação T+2 desincentiva operações | Falta de liquidez na BODIVA |
| Onboarding presencial (KYC) | Impossível escalar |

### A solução SDVM

| Vector | Descrição |
|--------|-----------|
| **Onboarding digital** | KYC via NIF + Multicaixa Express em minutos |
| **Custódia automatizada** | Abertura de conta (NRC) via CEVAMA sem intervenção humana |
| **Liquidação instantânea** | Kwik (BNA) via telemóvel/NIF — T+0 |
| **Corretagem transparente** | 0,5% por trade · sem custos escondidos |
| **Float a render** | Saldos parados dos clientes rendem e são partilhados |

### Modelo de receita (3 vectores)

```
┌─────────────────────────────────────────────────────────────┐
│                    RECEITA PROJETADA (Y1)                    │
├─────────────────────────────────────────────────────────────┤
│  💰 Float agregado (spread bancário)   42 380 000 Kz  56%   │
│  📊 Corretagem (0,5% por transação)    28 145 000 Kz  37%   │
│  🔒 Custódia (0,02% a.a.)               3 600 000 Kz   5%   │
│  📡 Market data premium                 1 200 000 Kz   2%   │
├─────────────────────────────────────────────────────────────┤
│  TOTAL Y1                              75 325 000 Kz        │
└─────────────────────────────────────────────────────────────┘
```

> **Prova económica:** com 12 000 investidores activos e ticket médio de 250 000 Kz, a SDVM atinge **break-even no mês 14** e **EBITDA positivo no ano 2**.

---

## 🏗️ Arquitetura

```
┌──────────────────────────────────────────────────────────────────┐
│                     Camada de Apresentação                        │
│   Retail Dashboard │ Trading Terminal │ Executive Dashboard       │
└────────────────────────────┬─────────────────────────────────────┘
                             │ HTTPS · JWT · WebSocket
┌────────────────────────────▼─────────────────────────────────────┐
│              API Gateway (Express + Helmet + Rate Limit)          │
└─────┬────────────────┬──────────────────┬────────────────────────┘
      │                │                  │
┌─────▼──────┐  ┌──────▼──────┐   ┌───────▼────────┐
│ Auth/KYC   │  │  Mesa       │   │  RMS (Risk)    │
│ JWT + 2FA  │  │  Ordens     │◄──┤  Saldo/Títulos │
└────────────┘  └──────┬──────┘   └────────────────┘
                       │
             ┌─────────▼─────────┐
             │  Matching Engine  │
             │  (Order Book)     │
             └─────────┬─────────┘
                       │
             ┌─────────▼─────────┐
             │    Event Bus      │
             │  (Redis Pub/Sub)  │
             └─────────┬─────────┘
                       │
      ┌────────────────┼────────────────┐
      │                │                │
┌─────▼─────┐    ┌─────▼─────┐   ┌──────▼──────┐
│ FIX 4.4   │    │  CEVAMA   │   │ EMIS / Kwik │
│ (BODIVA)  │    │  Custódia │   │ Liquidação  │
└───────────┘    └───────────┘   └─────────────┘
                       │
             ┌─────────▼─────────┐
             │  PostgreSQL 15    │
             │  + Réplica HA     │
             └───────────────────┘
```

**Princípios de engenharia:**
- 🎯 **Event-Driven** — toda ordem publica eventos; módulos plugáveis
- 🛡️ **RMS síncrono** — nenhuma ordem chega à BODIVA sem validação
- 🔐 **Idempotência** — `fix_clordid`, `payment_ref`, `kwik_tx_id` únicos
- 📜 **Auditoria imutável** — tabela `audit_log` (obrigatório CMC)
- 🚀 **Horizontal scaling** — Redis Pub/Sub para múltiplas instâncias

---

## 📋 Conformidade CMC

| Requisito regulatório | Como é cumprido |
|----------------------|-----------------|
| **Separação patrimonial** | Contas custódia em tabela isolada (`custody_accounts`) |
| **Reporte diário à BODIVA** | Gateway FIX envia cada ordem com timestamp regulatório |
| **Prevenção BC/FT** | KYC + limites por perfil aplicados no RMS |
| **Retenção 10 anos** | `audit_log` + backups PostgreSQL (WAL) |
| **Continuidade de negócio** | HA com réplica síncrona + failover automático |
| **Transparência de custos** | Comissão 0,5% mostrada ao cliente antes de confirmar |

Ver [`docs/REGULATORY.md`](docs/REGULATORY.md) para o mapeamento completo.

---

## 🎮 Cenários de Demonstração

Durante o pitch, execute **cenários prontos** com um clique:

```bash
# Cenário 1: Investidor compra 10 acções BAI
curl -X POST http://localhost:3000/api/demo/run/retail-buy-bai

# Cenário 2: Depósito Multicaixa Express confirmado
curl -X POST http://localhost:3000/api/demo/run/deposit-multicaixa

# Cenário 3: Conta custódia CEVAMA aberta (NRC emitido)
curl -X POST http://localhost:3000/api/demo/run/open-custody

# Cenário 4: Spike de mercado (gráficos a mexer)
curl -X POST http://localhost:3000/api/demo/run/market-spike

# Cenário 5: Cross-trade (buyer + seller casam)
curl -X POST http://localhost:3000/api/demo/run/cross-trade
```

Ver [`docs/DEMO.md`](docs/DEMO.md) para o guião completo de 5 minutos.

---

## 🔧 Stack Técnica

**Backend**
- Node.js 20 + Express
- PostgreSQL 15 (HA-ready)
- Redis 7 (Pub/Sub + cache)
- WebSocket (`ws`)
- FIX 4.4 gateway (simulado)

**Frontend**
- HTML5 + Tailwind CSS
- TradingView Lightweight Charts
- WebSocket cliente nativo

**Infraestrutura**
- Docker + Docker Compose
- Nginx (frontend + proxy)
- GitHub Actions (CI/CD)

**Integrações (mocks)**
- EMIS / Multicaixa Express
- Kwik (BNA)
- CEVAMA
- BODIVA (FIX 4.4)

---

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [`docs/PITCH.md`](docs/PITCH.md) | Deck textual de 5 minutos para investidores |
| [`docs/DEMO.md`](docs/DEMO.md) | Guião passo-a-passo da demo |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Detalhes técnicos aprofundados |
| [`docs/REGULATORY.md`](docs/REGULATORY.md) | Mapeamento conformidade CMC |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Roadmap 24 meses |

---

## 🗺️ Roadmap

| Fase | Período | Entregável |
|------|---------|-----------|
| ✅ **MVP** | Q1 2025 | Ordens, RMS, Float, dashboards (este repo) |
| 🔄 **Beta** | Q2 2025 | Conexão FIX real BODIVA + certificação CMC |
| 📱 **Mobile** | Q3 2025 | App React Native + Kwik produção |
| 📊 **Secundário** | Q4 2025 | Mercado OTs/BTs + relatórios CMC automáticos |
| 🏛️ **Dealer** | 2026 | Licença Dealer + leilões BNA |

---

## 🧪 Testes

```bash
npm test              # Jest com cobertura
npm run test:watch    # Modo watch
```

CI corre em cada PR (ver `.github/workflows/ci.yml`).

---

## 🤝 Contribuir

Ver [`CONTRIBUTING.md`](CONTRIBUTING.md). Issues e PRs são bem-vindos.

---

## 📜 Licença

**PROPRIETÁRIA** — © 2025 SDVM Angola. Todos os direitos reservados.
Uso permitido apenas para avaliação por investidores e entidades reguladoras.
Ver [`LICENSE`](LICENSE).

---

<div align="center">

**SDVM Angola** · Luanda, Angola

📧 investidores@sdvm.ao · 🌐 www.sdvm.ao

*Registo de Corretora nº SDVM/2025/017 · Sujeita à supervisão da CMC*

</div>
