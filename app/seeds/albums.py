from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text


def seed_albums():
    albumA = Album(
        user_id=1,
        title="Eye Of The Tiger",
        image_url="https://testbucketbymiaohua.s3.us-west-1.amazonaws.com/Untitled+design+(10).png",
        release_year=1982,
    )

    albumB = Album(
        user_id=2,
        title="Songs of India",
        image_url="https://testbucketbymiaohua.s3.us-west-1.amazonaws.com/Untitled+design+(11).png",
        release_year=1996,
    )

    db.session.add(albumA)
    db.session.add(albumB)
    db.session.commit()


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()