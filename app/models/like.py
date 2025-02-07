from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint
from datetime import datetime


likes = db.Table(
    "likes",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    ),
    db.Column(
        "song_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("songs.id"), ondelete="CASCADE"),
        nullable=False,
    ),
    db.Column("created_at", db.DateTime, default=datetime.today),
    db.Column(
        "updated_at", db.DateTime, default=datetime.today, onupdate=datetime.today
    ),
    UniqueConstraint("user_id", "song_id", name="_user_song_uc"),
    schema=SCHEMA if environment == "production" else None,
)
