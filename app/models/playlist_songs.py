from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

playlist_songs = db.Table(
    "playlist_songs",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column("playlist_id", db.Integer, db.ForeignKey(add_prefix_for_prod("playlists.id"), ondelete="CASCADE"), nullable=False),
    db.Column("song_id", db.Integer, db.ForeignKey(add_prefix_for_prod( "songs.id"), ondelete="CASCADE"), nullable=False),
    db.Column("created_at", db.DateTime, default=datetime.today),
    db.Column("updated_at", db.DateTime, default=datetime.today, onupdate=datetime.today),
    schema=SCHEMA if environment == "production" else None
)

# if environment == "production":
#     playlist_songs.schema = SCHEMA