from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint
from datetime import datetime


class Like(db.Model):
    __tablename__ = "likes"

    if environment == "production":
        __table_args__ = (
            UniqueConstraint("user_id", "song_id", name="_user_song_uc"),
            {"schema": SCHEMA},
        )
    else:
        __table_args__ = (UniqueConstraint("user_id", "song_id", name="_user_song_uc"),)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    )
    song_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("songs.id"), ondelete="CASCADE"),
        nullable=False,
    )
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    user = db.relationship("User", back_populates="likes")
    song = db.relationship("Song", back_populates="likes")
