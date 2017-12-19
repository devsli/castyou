import os
import asyncpg
import mutagen
from datetime import datetime, timedelta


async def new_entry(file, uploaded_name, location):
    conn = await asyncpg.connect(
        'postgresql://castyou:castyou@database/castyou')

    fullpath = os.path.join(location, uploaded_name)
    audio = mutagen.File(fullpath)

    duration = str(timedelta(seconds=audio.info.length))
    length = os.path.getsize(fullpath)

    await conn.execute('''
        INSERT INTO items (title, pub_date, duration, filename, length)
        VALUES ($1, $2, $3, $4, $5)
    ''', file.filename, datetime.now(), duration, uploaded_name, length)


async def upload(file, filename, location):
    size = 0
    with open(os.path.join(location, filename), 'wb') as f:
        while True:
            chunk = await file.read_chunk()  # 8192 bytes by default.
            if not chunk:
                break
            size += len(chunk)
            f.write(chunk)
