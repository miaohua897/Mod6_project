from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .playlist_songs import playlist_songs


class Playlist(db.Model):
    __tablename__ = "playlists"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    )
    image_url = db.Column(db.String(2083))
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    user = db.relationship("User", back_populates="playlists")
    songs = db.relationship(
        "Song", secondary=playlist_songs, back_populates="playlists"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "image_url": self.image_url,
            "name": self.name,
            "description": self.description
        }