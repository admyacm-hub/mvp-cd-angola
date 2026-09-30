#!/usr/bin/env bash
# =====================================================================
# SDVM Angola — Arranque de demonstração
# Uso: ./scripts/start-demo.sh
# =====================================================================

set -e
BOLD='\033[1m'; GREEN='\033[0;32m'; AMBER='\033[0;33m'; BLUE='\033[0;34m'; NC='\033[0m'

echo -e "${BOLD}${BLUE}"
cat <<'EOF'
   ███████╗██████╗ ██╗   ██╗███╗   ███╗
   ██╔════╝██╔══██╗██║   ██║████╗ ████║
   ███████╗██║  ██║██║   ██║██╔████╔██║
   ╚════██║██║  ██║╚██╗ ██╔╝██║╚██╔╝██║
   ███████║██████╔╝ ╚████╔╝ ██║ ╚═╝ ██║
   ╚══════╝╚═════╝   ╚═══╝  ╚═╝     ╚═╝
        Corretora Digital · Angola
EOF
echo -e "${NC}"

echo -e "${BOLD}→ A verificar pré-requisitos…${NC}"
command -v docker >/dev/null 2>&1 || { echo "❌ Docker não instalado. Visite https://docs.docker.com/get-docker/"; exit 1; }
command -v docker compose >/dev/null 2>&1 || docker compose version >/dev/null 2>&1 || { echo "❌ docker compose não disponível"; exit 1; }
echo -e "${GREEN}✓ Docker OK${NC}"

echo -e "${BOLD}→ A construir e arrancar serviços…${NC}"
docker compose up -d --build

echo -e "${BOLD}→ A aguardar API (health check)…${NC}"
for i in $(seq 1 30); do
  if curl -sf http://localhost:3000/health >/dev/null 2>&1; then
    echo -e "${GREEN}✓ API pronta em http://localhost:3000${NC}"
    break
  fi
  sleep 1
  [ $i -eq 30 ] && { echo "❌ API não respondeu em 30s"; docker compose logs api; exit 1; }
done

echo -e "${BOLD}→ A validar dados de demonstração…${NC}"
curl -sf http://localhost:3000/api/trading/quotes | grep -q BAI && echo -e "${GREEN}✓ Mercado activo (6 instrumentos)${NC}"

echo ""
echo -e "${BOLD}${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${BOLD}${GREEN}  ✅ SDVM Angola está a correr!${NC}"
echo -e "${BOLD}${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${BOLD}Landing page (investidores):${NC}"
echo -e "    ${AMBER}http://localhost:8080${NC}"
echo ""
echo -e "  ${BOLD}Dashboards directos:${NC}"
echo -e "    👤 Investidor:  ${AMBER}http://localhost:8080/retail-dashboard.html${NC}"
echo -e "    📈 Terminal:    ${AMBER}http://localhost:8080/trading-terminal.html${NC}"
echo -e "    📊 Executivo:   ${AMBER}http://localhost:8080/executive-dashboard.html${NC}"
echo ""
echo -e "  ${BOLD}API + Documentação:${NC}"
echo -e "    REST API:  ${AMBER}http://localhost:3000${NC}"
echo -e "    Health:    ${AMBER}http://localhost:3000/health${NC}"
echo -e "    WebSocket: ${AMBER}ws://localhost:3000/ws${NC}"
echo ""
echo -e "  ${BOLD}Cenários de demo guiada:${NC}"
echo -e "    ${AMBER}curl -X POST http://localhost:3000/api/demo/run/retail-buy-bai${NC}"
echo -e "    ${AMBER}curl -X POST http://localhost:3000/api/demo/run/deposit-multicaixa${NC}"
echo -e "    ${AMBER}curl -X POST http://localhost:3000/api/demo/run/cross-trade${NC}"
echo ""
echo -e "  ${BOLD}Para parar:${NC}  docker compose down"
echo ""
