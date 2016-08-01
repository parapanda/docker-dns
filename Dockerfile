FROM alpine:3.3
MAINTAINER "Steve Pandich <pandich@gmail.com>"

ENV PY=2.7.12-r0
RUN apk add --update python=$PY python-dev=$PY gcc libgcc libc-dev py-pip libev

RUN mkdir /project
WORKDIR /project

ADD requirements.txt .
RUN pip install -r requirements.txt

RUN apk del python-dev gcc libgcc libc-dev py-pip libev
RUN rm -rf /tmp/*
RUN rm -rf /var/cache/apk/*

ADD dockerdns .
ENTRYPOINT ["./dockerdns"]
