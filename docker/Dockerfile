# Use a imagem base do Node.js 22 para construir a aplicação
FROM node:22-alpine AS builder

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de package.json e yarn.lock
COPY package.json yarn.lock ./

# Instale as dependências usando Yarn
RUN yarn install --frozen-lockfile

# Copie o restante dos arquivos da aplicação
COPY . .

# Compile a aplicação TypeScript
RUN yarn build

# Use uma imagem menor para a produção
FROM node:22-alpine AS deploy

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas os arquivos necessários da fase de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Exponha a porta que a aplicação vai usar (padrão do NestJS é 3000)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "dist/main.js" ]
