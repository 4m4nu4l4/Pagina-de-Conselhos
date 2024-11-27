# cria uma imagem do node
FROM node:20 AS build

# criar pastas
WORKDIR /app

# copiar os arquivos de config
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# inicializar o nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80