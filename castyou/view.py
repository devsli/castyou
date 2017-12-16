import aiohttp_jinja2
from aiohttp import web


async def demo(request):
    name = request.match_info.get('name', "Anonymous")
    text = "Hello, " + name
    return web.Response(text=text)


@aiohttp_jinja2.template('index.html')
async def index(request):
    return {}


@aiohttp_jinja2.template('rss.tmpl.xml')
async def rss(request):
    return {
        'config': {
            'title': 'My fucking podcast',
        },
        'items': []
    }
