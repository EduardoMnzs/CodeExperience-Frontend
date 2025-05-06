# Etapa 1: Build do app
FROM node:22 AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:stable-alpine

# Remove o conteúdo padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do build para a pasta pública do nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia um nginx.conf customizado (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]