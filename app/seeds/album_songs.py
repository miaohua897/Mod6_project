from app.models import db, album_songs, environment, SCHEMA
from sqlalchemy.sql import text


def seed_album_songs():
    db.session.execute(album_songs.insert().values(album_id=1, song_id=1))
    db.session.execute(album_songs.insert().values(album_id=1, song_id=2))
    db.session.execute(album_songs.insert().values(album_id=1, song_id=3))
    db.session.execute(album_songs.insert().values(album_id=1, song_id=4))
    db.session.execute(album_songs.insert().values(album_id=1, song_id=5))
    db.session.execute(album_songs.insert().values(album_id=1, song_id=6))
    db.session.execute(album_songs.insert().values(album_id=1, song_id=7))
    db.session.execute(album_songs.insert().values(album_id=2, song_id=8))
    db.session.execute(album_songs.insert().values(album_id=2, song_id=9))
    db.session.commit()
    


def undo_album_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.album_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM album_songs"))

    db.session.commit()