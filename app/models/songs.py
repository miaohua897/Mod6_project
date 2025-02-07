from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .album_songs import album_songs
from .like import likes
from .playlist_songs import playlist_songs


class Song(db.Model):
    __tablename__ = "songs"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    audio_url = db.Column(db.String(2083), nullable=False)
    duration = db.Column(db.String(10), nullable=False)
    lyrics = db.Column(db.Text, nullable=False)
    genre = db.Column(db.String(100), nullable=False)
    release_year = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(2083), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    albums = db.relationship("Album", secondary=album_songs, back_populates="songs")
    artist = db.relationship("User", back_populates="songs")
    user_likes = db.relationship("User", secondary=likes, back_populates="liked_songs")
    playlists = db.relationship(
        "Playlist", secondary=playlist_songs, back_populates="songs"
    )


    def to_dict(self):
        return {
            "id":self.id,
            "title":self.title,
            "audio_url":self.audio_url,
            "duration":self.duration,
            "lyrics":self.lyrics,
            "genre":self.genre,
            "release_year":self.release_year,
            "image_url":self.image_url,
            "user_id":self.user_id,
            "albums":self.albums,
            "likes":self.user_likes
        }
