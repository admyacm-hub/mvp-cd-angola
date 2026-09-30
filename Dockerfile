FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache wget tini

COPY package*.json ./
RUN npm ci --omit=dev

COPY src/ ./src/
COPY database/ ./database/
COPY scripts/ ./scripts/

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "src/server.js"]
