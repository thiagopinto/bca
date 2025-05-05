# 📦 BCA - Backend NestJS com Docker, Prometheus e WebSocket

Este projeto é um backend em NestJS com suporte a:

- 🚀 WebSockets para estatísticas em tempo real
- 📈 Exposição de métricas para Prometheus
- 🧪 Testes unitários e de integração com Jest
- 🐳 Deploy e execução com Docker Compose
- ⚙️ Observabilidade via Grafana

---

## ✅ Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (opcional, para rodar localmente)
- [Yarn](https://yarnpkg.com/) (gerenciador de pacotes)
- Arquivo `.env` (copiar `.env.example` se existir)

---

## 🐳 Como rodar com Docker Compose

Na raiz do projeto (`Bca/`), execute:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

---

| Serviço        | Endereço                                       |
| -------------- | ---------------------------------------------- |
| Backend NestJS | [http://localhost:3000](http://localhost:3000) |
| Prometheus     | [http://localhost:9090](http://localhost:9090) |
| Grafana        | [http://localhost:3001](http://localhost:3001) |

---

## 📈 Grafana

Usuário: admin
Senha: admin

## Métricas

http://localhost:3000/metrics

---

## Rodar teestes

```bash
cd backend
yarn install
yarn test       # Testes unitários
yarn test:e2e   # Testes de integração (e2e)

```

### 📝 Observações

Para onsumir websocket:

```Javascript
    import { io } from 'socket.io-client';
    const socket = io('http://localhost:3000');

    socket.on('statistics_update', (data) => {
        console.log('Estatísticas atualizadas:', data);
    });

```
