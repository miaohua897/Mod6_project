from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from .song_data import song_data

def seed_songs():

    for songA in song_data:
            songA =Song(
                title=songA["title"],
                audio_url=songA["audio_url"],
                duration=songA["duration"],
                lyrics=songA["lyrics"],
                genre=songA["genre"],
                release_year=songA["release_year"],
                image_url=songA[ "image_url"],
                user_id =songA["user_id" ]
            )
            db.session.add(songA)
            db.session.commit()
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
