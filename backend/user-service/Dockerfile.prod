FROM node:20 AS builder

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install --strict-ssl=false

COPY src ./src
COPY tsconfig.json tsconfig.json

RUN npm run build

FROM node:20

WORKDIR /src

COPY --from=builder /src/dist ./dist
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/package.json .

USER node

CMD ["node", "./dist/app.js"]
