# TODO: Split build and running context

FROM alpine
WORKDIR /app
EXPOSE 80

RUN apk -U add py3-virtualenv gcc python3-dev musl-dev postgresql \
               postgresql-dev libmagic

COPY . /app

RUN python3 setup.py develop \
 && pip3 install -e .[dev,test]

CMD ["/app/init.sh"]
