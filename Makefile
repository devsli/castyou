dev:
	docker-compose up -d
	gunicorn --reload -b 0.0.0.0:8888 --worker-class aiohttp.worker.GunicornWebWorker castyou.app:app

.PHONY: dev
