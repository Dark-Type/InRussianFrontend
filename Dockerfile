FROM node:18-bullseye-slim AS build
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
ENV NODE_ENV=production

RUN npm run build

FROM nginx:1.25-alpine

ARG BUILD_DIR=dist

COPY --from=build /app/${BUILD_DIR}/ /usr/share/nginx/html/

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]