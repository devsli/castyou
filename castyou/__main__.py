import asyncio
import aiohttp_jinja2
import jinja2
from aiohttp import web

from .view import demo, rss, index

loop = asyncio.get_event_loop()

app = web.Application()
app.router.add_get('/', index)
app.router.add_get('/rss.xml', rss)
app.router.add_get('/{name}', demo)

aiohttp_jinja2.setup(app, loader=jinja2.PackageLoader('castyou', 'templates'))

web.run_app(app, port=8888, loop=loop)

loop.run_forever()
loop.close()
