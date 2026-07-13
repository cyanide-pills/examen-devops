# Build 
FROM node:20-alpine AS builder

WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_VENTAS_API_URL=/api/v1/ventas
ARG VITE_DESPACHOS_API_URL=/api/v1/despachos
ENV VITE_VENTAS_API_URL=$VITE_VENTAS_API_URL
ENV VITE_DESPACHOS_API_URL=$VITE_DESPACHOS_API_URL

RUN npm run build

# Runtime 
FROM nginx:1.27-alpine

# Reemplazar la línea de configuración del PID en nginx.conf para que apunte a /tmp/nginx.pid
RUN sed -i 's|^pid\s.*;|pid /tmp/nginx.pid;|g' /etc/nginx/nginx.conf

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /build/dist /usr/share/nginx/html

RUN mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /var/cache/nginx/fastcgi_temp \
             /var/cache/nginx/uwsgi_temp \
             /var/cache/nginx/scgi_temp && \
    chown -R nginx:nginx /usr/share/nginx/html \
                         /var/cache/nginx \
                         /var/log/nginx \
                         /etc/nginx/conf.d

USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


