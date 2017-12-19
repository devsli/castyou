import os
import datetime
import aiohttp_jinja2
from aiohttp import web

from . import const, utils


@aiohttp_jinja2.template('index.html')
async def index(_):
    pass


async def upload(request):
    reader = await request.multipart()
    item = await reader.next()

    filename = datetime.datetime.now().strftime('%y%m%d_%H%M%S')
    ext = os.path.splitext(item.filename)
    fullname = filename + ext[1]

    await utils.upload(item, fullname, const.UPLOADS)
    await utils.new_entry(item, fullname, const.UPLOADS)

    return web.Response(text=f'{item.filename} uploaded')


@aiohttp_jinja2.template('rss.tmpl.xml')
async def rss(_):

    return {
        'config': await utils.config(),
        'items': await utils.items()
    }
