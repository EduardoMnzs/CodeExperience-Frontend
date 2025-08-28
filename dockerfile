# Estágio 1: Build da Aplicação React
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV REACT_APP_API_URL=/api
RUN npm run build

# Estágio 2: Servidor de Produção NGINX
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# --- ADICIONE ESTAS DUAS LINHAS ---
# Remove a configuração padrão do NGINX
RUN rm /etc/nginx/conf.d/default.conf
# Copia nosso novo arquivo de configuração para o lugar certo
COPY nginx.frontend.conf /etc/nginx/conf.d/default.conf
# ------------------------------------

EXPOSE 80