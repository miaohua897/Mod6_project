from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


def seed_songs():
    songA = Song(
        title="Eye of the Tiger",
        audio_url="https://testbucketbymiaohua.s3.us-west-1.amazonaws.com/91c8dd721bf749859843d00904452354.mp3",
        duration="4:04",
        lyrics="Risin' up, back on the street",
        genre="Rock",
        release_year=1982,
        image_url="https://testbucketbymiaohua.s3.us-west-1.amazonaws.com/3b41e0933d2b41d8b313bf92d0917c4c.jpg",
        user_id=1,
    )
    songB = Song(
        title="Indian National Anthem",
        audio_url="https://aws-museic-project.s3.us-east-1.amazonaws.com/b5fa2f66555c440e964192663310bfe0.mp3",
        duration="1:00",  # '1:21'
        lyrics=":D",
        genre="Classical",
        release_year=1947,
        image_url="https://t4.ftcdn.net/jpg/09/03/63/45/360_F_903634594_cgIwCDyWrQurd5SgJIr61G8uLHhnncX0.jpg",
        user_id=2,
    )
    db.session.add(songA)
    db.session.add(songB)
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
