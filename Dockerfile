FROM python:2.7

MAINTAINER TMKDEV tekolody@gmail.com
# Install uWSGI
RUN pip install uwsgi flask

RUN apt-get update \
    && apt-get install -y nginx \
    && rm -rf /var/lib/apt/lists/*

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
#RUN rm -rf /etc/nginx/default.conf
RUN rm -rf /etc/nginx/sites-enabled/*
COPY nginx.conf /etc/nginx/sites-enabled/
COPY uwsgi.ini /etc/uwsgi/

RUN apt-get update \
    && apt-get install -y supervisor \
    && rm -rf /var/lib/apt/lists/*

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY ./app /app
WORKDIR /app

CMD ["/usr/bin/supervisord"]
