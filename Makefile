dev:
	gunicorn --reload -b 0.0.0.0:8880 --worker-class aiohttp.worker.GunicornWebWorker castyou.app:app

.PHONY: dev
