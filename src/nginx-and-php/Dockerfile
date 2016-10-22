# nginx/php Docker example.
FROM debian:jessie

RUN apt-get update && \
    apt-get install -y nginx supervisor php5 php5-fpm php5-common

COPY ["/etc", "/etc/"]
COPY ["/opt", "/opt/"]
COPY ["/var", "/var/"]


# adding in pennycuff.rocks domains
RUN chown www-data -R /opt/derek.pennycuff.rocks/ && \
    chgrp www-data -R /opt/derek.pennycuff.rocks/ && \
    chown www-data -R /opt/norma.pennycuff.rocks/ && \
    chgrp www-data -R /opt/norma.pennycuff.rocks/ && \
    chown www-data -R /opt/fiona.pennycuff.rocks/ && \
    chgrp www-data -R /opt/fiona.pennycuff.rocks/ && \
    chown www-data -R /opt/gavin.pennycuff.rocks/ && \
    chgrp www-data -R /opt/gavin.pennycuff.rocks/ && \
    chmod a+w /var/log/

# changing port to expose
EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
