# nginx/php Docker example.
FROM debian:jessie

RUN apt-get update && \
    apt-get install -y nginx supervisor php5 php5-fpm php5-common

COPY ["/etc", "/etc/"]
COPY ["/opt", "/opt/"]
COPY ["/var", "/var/"]

RUN chown www-data -R /opt/example/ && \
    chgrp www-data -R /opt/example/ && \
    chmod a+rw /var/opt/example/ && \
    chmod a+w /var/log/

EXPOSE 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
