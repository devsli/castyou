import aiohttp_jinja2
import jinja2
import pathlib

from aiohttp import web

from . import views
from . import const

pathlib.Path(const.UPLOADS).mkdir(parents=True, exist_ok=True)


app = web.Application()

app.router.add_get('/', views.index)
app.router.add_get('/rss.xml', views.rss)
app.router.add_post('/upload', views.upload)
app.router.add_static('/file/', path=str(const.UPLOADS), name='static')

aiohttp_jinja2.setup(app, loader=jinja2.PackageLoader('castyou', 'templates'))
