from app.models import db, album_songs, environment, SCHEMA
from sqlalchemy.sql import text


def seed_album_songs():
    db.session.execute(album_songs.insert().values(user_id=1, song_id=1))
    db.session.execute(album_songs.insert().values(user_id=2, song_id=2))
    db.session.commit()
    


def undo_album_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.album_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM album_songs"))

    db.session.commit()