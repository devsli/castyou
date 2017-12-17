import os
import aiohttp_jinja2
from aiohttp import web

from . import paths


async def demo(request):
    name = request.match_info.get('name', "Anonymous")
    text = "Hello, " + name
    return web.Response(text=text)


@aiohttp_jinja2.template('index.html')
async def index(_):
    pass


async def upload(request):
    reader = await request.multipart()
    mp3 = await reader.next()

    size = 0
    with open(os.path.join(paths.UPLOADS, mp3.filename), 'wb') as f:
        while True:
            chunk = await mp3.read_chunk()  # 8192 bytes by default.
            if not chunk:
                break
            size += len(chunk)
            f.write(chunk)

    return web.Response(text=f'{mp3.filename} uploaded')

@aiohttp_jinja2.template('rss.tmpl.xml')
async def rss(_):
    return {
        'config': {
            'title': 'My fucking podcast',
        },
        'items': []
    }
