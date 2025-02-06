from .db import db, environment, SCHEMA,add_prefix_for_prod
from datetime import datetime
# from flask_sqlalchemy import SQLAlchemy
# db = SQLAlchemy()
class Song(db.Model):
    __tablename__ = "songs"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(200), nullable=False)
    audio_url=db.Column(db.String(2083), nullable=False)
    duration =db.Column(db.Integer, nullable=False)
    lyrics =db.Column(db.Text, nullable=False)
    genre =db.Column(db.String(100), nullable=False)
    release_year =db.Column(db.Integer, nullable=False)
    image_url=db.Column(db.String(2083), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    artist = db.relationship("User", back_populates="songs")
