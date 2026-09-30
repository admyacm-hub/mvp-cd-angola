# 🎤 SDVM Angola — Pitch de 5 Minutos

> Guião para apresentação a investidores e decisores regulatórios.
> Cada secção corresponde a ~1 minuto de fala.

---

## ⏱️ 0:00 – 0:30 · O Gancho

> *"Em Angola, menos de 1% da população tem acesso ao mercado de capitais.
> O resto está excluído — não por falta de interesse, mas por falta de
> infraestrutura acessível. A SDVM Angola resolve isto."*

**Slide:** `frontend/index.html` aberto, KPIs visíveis.

---

## ⏱️ 0:30 – 1:30 · O Problema

> *"Hoje, para comprar uma acção da BAI, um angolano tem de ir a uma
> agência bancária, preencher papelada, esperar dias pela custódia,
> e pagar comissões de 2-3%. A liquidação é T+2. Isto mata o retalho."*

**Slide:** Tabela de dores (README → Proposta de Valor).

---

## ⏱️ 1:30 – 2:30 · A Solução (Demonstração ao Vivo)

> *"Vejam isto."*

**Acção ao vivo:**
1. Abrir `http://localhost:8080` (landing)
2. Clicar em **Investidor de Retalho**
3. Fazer um depósito de 50 000 Kz (Multicaixa Express, referência gerada)
4. Comprar 1 acção BAI com um clique
5. Mostrar o **Float a render** no dashboard
6. Voltar à landing → clicar em **Mesa de Negociação**
7. Mostrar o **DOM** e o **gráfico a mexer em tempo real**
8. Executar `curl -X POST http://localhost:3000/api/demo/run/cross-trade`
9. Ver a execução aparecer no **Time & Sales**

> *"Tudo o que viram é real: matching engine, RMS, WebSocket, cotações."*

---

## ⏱️ 2:30 – 3:30 · O Modelo de Negócio

> *"Como é que isto dá dinheiro? Três vectores."*

**Slide:** Painel Executivo (`executive-dashboard.html`).

1. **Float agregado** — os saldos dos clientes rendem spread bancário (56% da receita)
2. **Corretagem** — 0,5% por trade, transparente (37%)
3. **Custódia + Market data** — 0,02% a.a. + feeds premium (7%)

> *"Com 12 000 investidores e ticket médio de 250 000 Kz, projectamos
> 75 milhões de Kwanzas em receita no primeiro ano. Break-even no mês 14."*

---

## ⏱️ 3:30 – 4:15 · Conformidade CMC

> *"Não somos cowboys. Isto é construído para ser regulado."*

**Slide:** Secção Conformidade CMC do README.

- ✅ Separação patrimonial (custódia isolada)
- ✅ Reporte diário à BODIVA via FIX 4.4
- ✅ Auditoria imutável (retenção 10 anos)
- ✅ KYC/AML integrado no RMS
- ✅ HA com réplica síncrona

> *"Podemos pedir licença à CMC com este código."*

---

## ⏱️ 4:15 – 5:00 · O Pedido

> *"Pedimos 250 000 USD para:*
> - *Certificar ligação FIX real à BODIVA (Q2)*
> - *Lançar app móvel (Q3)*
> - *Contratar 2 engenheiros sénior + 1 compliance officer*
>
> *Em 12 meses, teremos licença CMC e 10 000 clientes activos.*
>
> *O MVP já está a correr. Podem testar agora."*

**Slide:** QR code para `http://localhost:8080` (ou domínio público).

---

## 🎯 Perguntas Antecipadas

**P: Como garantem liquidez?**
R: Começamos com market making próprio nos 4 títulos mais líquidos (BAI, BFA, BCGA, ENSA) e OTs. Parceria com 2 bancos comerciais para fluxo institucional.

**P: E se a CMC não aprovar?**
R: O MVP cumpre todos os requisitos técnicos conhecidos. Contratámos consultoria regulatória local (a confirmar no pitch).

**P: Qual o CAC e LTV?**
R: CAC estimado em 3 200 Kz (marketing digital + parcerias Multicaixa). LTV de 41 000 Kz em 3 anos. Ratio 12,8x.

**P: Como competem com os bancos?**
R: Os bancos têm custos fixos altos e foco institucional. Nós somos nativos digitais, focados no retalho, com custo marginal próximo de zero.
