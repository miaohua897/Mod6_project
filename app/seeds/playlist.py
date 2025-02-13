from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text


def seed_playlists():
    playlist1 = Playlist(
        name="Workout Mix",
        image_url="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        user_id=1,
        description="All my favorite workout songs.",
    )
    playlist2  = Playlist(
        name="All-Time Favorites",
        image_url="https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        user_id=2,
        description="A list of my all time favorites",
    )
    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.commit()


def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
