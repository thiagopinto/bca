# Etapa 1: Construção da aplicação
FROM node:22-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários para instalar dependências
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install --frozen-lockfile

# Copia o restante da aplicação, incluindo o .env
COPY . .

# Compila o projeto
RUN yarn build

# Etapa 2: Imagem de produção
FROM node:22-alpine AS deploy

# Diretório de trabalho
WORKDIR /app

# Copia a build, dependências e arquivos importantes
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env .env

# Exponha a porta
EXPOSE 3000

# Inicia a aplicação
CMD ["node", "dist/main.js"]

