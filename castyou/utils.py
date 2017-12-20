import os
import asyncpg
import mutagen

from datetime import datetime, timedelta
from email.utils import format_datetime
from magic import Magic


def get_db():
    return asyncpg.connect('postgresql://castyou:castyou@database/castyou')


async def new_entry(file, uploaded_name, location):
    conn = await get_db()

    full_path = os.path.join(location, uploaded_name)
    audio = mutagen.File(full_path)

    duration = str(timedelta(seconds=round(audio.info.length)))
    length = os.path.getsize(full_path)
    mime_type = Magic(mime=True).from_file(full_path)

    await conn.execute('''
        INSERT INTO items (title, pub_date, duration, filename, length, type)
        VALUES ($1, $2, $3, $4, $5, $6)''',
                       file.filename, datetime.now(), duration, uploaded_name,
                       length, mime_type)

    await conn.close()


async def upload(file, filename, location):
    size = 0
    with open(os.path.join(location, filename), 'wb') as f:
        while True:
            chunk = await file.read_chunk()  # 8192 bytes by default.
            if not chunk:
                break
            size += len(chunk)
            f.write(chunk)


async def config():
    result = {}

    con = await get_db()
    rows = await con.fetch('SELECT key, value FROM config')

    for row in rows:
        result[row['key']] = row['value']

    await con.close()
    return result


def decorate_item(item):
    result = dict(item)
    host = os.environ.get('VIRTUAL_HOST', 'localhost')
    result['url'] = f"http://{host}/file/{item['filename']}"
    result['pub_date'] = format_datetime(result['pub_date'])
    result['guid'] = result['url']
    return result


async def items():
    con = await get_db()
    result = await con.fetch('SELECT * FROM items ORDER BY pub_date DESC')
    await con.close()
    return [decorate_item(item) for item in result]
