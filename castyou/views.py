import os
import datetime
import aiohttp_jinja2
import shortuuid
from aiohttp import web

from . import const, utils


async def upload(request):
    reader = await request.multipart()
    item = await reader.next()

    fullname = '{}_{}{}'.format(
        datetime.datetime.now().strftime('%y%m%d_%H%M%S'),
        shortuuid.uuid(),
        os.path.splitext(item.filename)[1])

    await utils.upload(item, fullname, const.UPLOADS)
    await utils.new_entry(item, fullname, const.UPLOADS)

    return web.Response(text=f'{item.filename} uploaded')


@aiohttp_jinja2.template('rss.tmpl.xml')
async def rss(_):
    return {
        'config': await utils.config(),
        'items': await utils.items()
    }
