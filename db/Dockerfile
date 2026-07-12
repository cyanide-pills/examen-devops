FROM mysql:8.0

# Defaults are overridden at runtime by Kubernetes env vars.
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=tienda_perritos
ENV MYSQL_USER=app_user
ENV MYSQL_PASSWORD=app_password

COPY init.sql /docker-entrypoint-initdb.d/
RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/

EXPOSE 3306

CMD ["mysqld"]
