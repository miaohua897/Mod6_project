from app.models import db, likes, environment, SCHEMA
from sqlalchemy.sql import text


def seed_likes():
    db.session.execute(likes.insert().values(user_id=1, song_id=1))
    db.session.execute(likes.insert().values(user_id=2, song_id=1))
    db.session.execute(likes.insert().values(user_id=1, song_id=2))
    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
