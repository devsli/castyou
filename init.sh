#!/bin/sh

python3 setup.py develop
pip3 install -e .[dev,test]

alembic upgrade head

/usr/bin/gunicorn --reload -b 0.0.0.0:80 --worker-class aiohttp.worker.GunicornWebWorker castyou.app:app
