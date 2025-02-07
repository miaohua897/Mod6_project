from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .album_songs import album_songs

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.String(200), nullable=False)
    image_url=db.Column(db.String(2083), nullable=False)
    release_year =db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    artist = db.relationship("User", back_populates="albums")
    songs = db.relationship("Song", secondary=album_songs, back_populates="albums")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "image_url": self.image_url,
            "release_year": self.release_year,
            "artist": self.artist,
            "songs": self.songs
        }
  
