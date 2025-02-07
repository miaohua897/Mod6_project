from flask.cli import AppGroup
from .users import seed_users, undo_users
from .songs import seed_songs, undo_songs
from .likes import seed_likes, undo_likes
from .album_songs import seed_album_songs,undo_album_songs
from .playlist_songs import seed_playlist_songs,undo_playlist_songs
from .playlist import seed_playlists,undo_playlists
from .albums import seed_albums,undo_albums
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
            undo_users()
            undo_songs()
            undo_likes()
            undo_albums()
            undo_playlists()
            undo_album_songs()
            undo_playlist_songs()
    seed_users()
    seed_songs()
    seed_likes()
    seed_albums()
    seed_playlists()
    seed_album_songs()
    seed_playlist_songs()


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    undo_songs()
    undo_likes()
    undo_albums()
    undo_playlists()
    undo_album_songs()
    undo_playlist_songs()
    # Add other undo functions here
