import aiohttp_jinja2
import jinja2
import pathlib
import aiohttp_cors

from aiohttp import web

from . import views
from . import const

pathlib.Path(const.UPLOADS).mkdir(parents=True, exist_ok=True)

app = web.Application()
cors = aiohttp_cors.setup(app)

xhr_routes = []

app.router.add_get('/rss.xml', views.rss)

xhr_routes.append(app.router.add_post('/upload', views.upload))

for route in xhr_routes:
    cors.add(route, {
        "*": aiohttp_cors.ResourceOptions(allow_credentials=False)
    })

aiohttp_jinja2.setup(app, loader=jinja2.PackageLoader('castyou', 'templates'))
