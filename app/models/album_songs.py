from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

album_songs = db.Table(
     "album_songs",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column("album_id", db.Integer, db.ForeignKey(add_prefix_for_prod("albums.id"), ondelete="CASCADE"), nullable=False),
    db.Column("song_id", db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id"), ondelete="CASCADE"), nullable=False),
    db.Column("created_at", db.DateTime, default=datetime.today),
    db.Column("updated_at", db.DateTime, default=datetime.today, onupdate=datetime.today),
    schema=SCHEMA if environment == "production" else None
)
