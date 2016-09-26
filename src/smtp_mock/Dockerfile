# Mock SMTP Server
# This is a testing SMTP server that uses the postfix smtp-sink program to log all emails to /var/smtp, you can browse
# the emails via HTTP as this folder is also exposed for viewing over the web.
FROM debian:jessie

# Add a postfix user for postfix to run under.
# The mailtest user is for our email logging script to run under. Postfix launches it via pipe and pipe will not
#    execute a script as root or any of the postfix users. So we need a throwaway account for mail.sh to run as.
RUN groupadd -r postfix --gid=999 && \
    useradd -r -g postfix --uid=999 postfix && \
    groupadd -r mailtest --gid=998 && \
    useradd -r -g mailtest --uid=998 mailtest

# The DEBIAN_FRONTEND environment variable is set so that the postfix install will not ask any questions.
# nginx is installed so we can serve the folder our emails are logged in over HTTP
# rsyslog is installed for debugging postfix, since postfix uses syslog.
# supervisor is installed because our container is going to launch all 3 of those programs, and supervisord is made for
#   that kind of thing.
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get install -y postfix nginx rsyslog supervisor

# The build context contains our nginx, supervisor, and postfix configurations, we'll just replace the files that were
# created by the installs previously.
COPY ["/", "/"]

# Since we use a regex "table" for virtual mailboxes and destinations in our postfix config, we have to build an index
# db file using the postmap tool.
# Postfix was complaining that it has no services file in it's chroot, so copy the default one from /etc.
# Our mail.sh script writes emails piped to it via postfix, so let's make sure it's executable, and that the /var/smtp
#   foler is also writeable by the script (since it runs under the mailtest account).
RUN postmap /etc/postfix/virtual_mailboxes && \
    postmap /etc/postfix/destinations && \
    cp /etc/services /var/spool/postfix/etc/services && \
    chmod +x /var/smtp/mail.sh && \
    chown mailtest -R /var/smtp/ && \
    chgrp mailtest -R /var/smtp/

# Listen on port 25 for SMTP to receive mail
# Listen on port 80 for HTTP so you can view logged emails with your web browser.
EXPOSE 25 80

# These folders contain the mutable data you might want to keep between container runs.
VOLUME ["/var/spool/postfix", "/var/smtp" ]

# Start up supervisord with our config file.
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
