import aiohttp_jinja2
from aiohttp import web

async def demo(request):
    name = request.match_info.get('name', "Anonymous")
    text = "Hello, " + name
    return web.Response(text=text)


@aiohttp_jinja2.template('index.html')
async def index(request):
    return {}


async def upload(request):
    reader = await request.multipart()
    mp3 = await reader.next()

    return web.Response(text=f'{mp3.filename} uploaded')


@aiohttp_jinja2.template('rss.tmpl.xml')
async def rss(_):
    return {
        'config': {
            'title': 'My fucking podcast',
        },
        'items': []
    }