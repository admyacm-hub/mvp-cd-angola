# 🎬 Guião de Demonstração (5 minutos)

## Preparação (antes do pitch)

```bash
git clone https://github.com/sua-org/sdvm-angola.git
cd sdvm-angola
./scripts/start-demo.sh
```

Abrir 3 separadores no browser:
1. `http://localhost:8080` (landing)
2. `http://localhost:8080/trading-terminal.html`
3. `http://localhost:8080/executive-dashboard.html`

Ter um terminal aberto para os cenários `curl`.

---

## Roteiro

### Minuto 1 — Landing
- Mostrar os KPIs (3 vectores de receita, 4 integrações, CMC, 6 meses)
- Ler o headline: *"O mercado de capitais ao alcance de todos os angolanos"*

### Minuto 2 — Investidor de Retalho
1. Clicar em **Investidor de Retalho**
2. Mostrar saldo (485 000 Kz) e Float a render (312 Kz)
3. **Depositar 50 000 Kz** — mostrar a referência Multicaixa gerada
4. Aguardar confirmação (4s) → saldo sobe
5. **Comprar 1 acção BAI** — mostrar comissão de 92,50 Kz
6. Voltar ao extrato → transacção registada

### Minuto 3 — Mesa de Negociação
1. Voltar à landing → clicar em **Mesa de Negociação**
2. Mostrar o **gráfico** a atualizar em tempo real
3. Apontar para o **DOM** (livro de ofertas) a mexer
4. Mostrar o **Time & Sales** (execuções a entrar)
5. Enviar uma ordem (Limite, 1 BAI) → ver aparecer no DOM

### Minuto 4 — Cenários Guiados (terminal)
```bash
# Cross-trade (buyer + seller casam)
curl -X POST http://localhost:3000/api/demo/run/cross-trade
# Ver execução no Time & Sales

# Spike de mercado (gráficos a mexer)
curl -X POST http://localhost:3000/api/demo/run/market-spike
```

### Minuto 5 — Painel Executivo
1. Voltar à landing → **Painel Executivo**
2. Mostrar o gráfico de receita por fonte
3. Ler os números: Float 42M, Corretagem 28M, Custódia 3,6M
4. Mostrar a secção **Conformidade CMC**
5. Fechar com o **pedido de investimento** (docs/PITCH.md)

---

## Perguntas frequentes durante a demo

**"Isto é real ou é simulado?"**
→ Tudo é real: PostgreSQL, WebSocket, matching engine. As únicas partes simuladas são as APIs externas (EMIS, Kwik, CEVAMA, BODIVA) — que em produção são substituídas 1:1.

**"Quanto tempo até produção?"**
→ 6 meses até licença CMC (Beta em Q2 2025).

**"Qual a stack?"**
→ Node.js + PostgreSQL + Redis + Docker. Escala horizontal via Redis Pub/Sub.

**"Posso testar?"**
→ Sim: `docker compose up` e abrir `http://localhost:8080`.

---

## Comandos úteis durante a demo

```bash
# Ver logs da API em tempo real
docker compose logs -f api

# Reiniciar tudo (fresh state)
docker compose down -v && docker compose up -d

# Ver estado dos serviços
docker compose ps

# Abrir psql na base de dados
docker compose exec postgres psql -U sdvm sdvm_angola
```
