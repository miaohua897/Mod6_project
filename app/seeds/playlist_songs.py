from app.models import db, playlist_songs, environment, SCHEMA
from sqlalchemy.sql import text


def seed_playlist_songs():
    db.session.execute(playlist_songs.insert().values(playlist_id=1, song_id=2))
    db.session.execute(playlist_songs.insert().values(playlist_id=2, song_id=1))
    db.session.commit()


def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
