from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.auth_routes import authenticate
from app.forms.playlist_form import PlaylistForm 
from app.models import db, Playlist, playlist_songs

playlist_routes = Blueprint("playlists", __name__)


@playlist_routes.route("/", methods=["GET"])
@login_required
def playlists():
    """
    Query for all playlists and returns them in a list of playlist dictionaries
    """
    user = authenticate()
    playlists = Playlist.query.filter(Playlist.user_id==user['id'] )

    return {"playlists": [playlist.to_dict() for playlist in playlists]}


@playlist_routes.route("/", methods=["POST"])
@login_required
def add_playlist():
    """
    Creates a playlist for the loggied in user and returns it as a dict
    """
    user = authenticate()

    # form = PlaylistForm()
    # form["csrf_token"].data = request.cookies["csrf_token"]
    # if form.validate_on_submit():
        
    data = request.get_json()
    playlist = Playlist(
        user_id=user['id'],
        image_url=data["image_url"],
        name=data["name"],
        description=data["description"],
    )
    db.session.add(playlist)
    db.session.commit()
    return playlist.to_dict()
    # return form.errors, 401

  

@playlist_routes.route("/<int:id>/songs/<int:song_id>", methods=["POST"])
@login_required
def add_playlist_songs(id, song_id):
    """
    Add a song to a playlist
    """
    
    new_playlist_song = playlist_songs.insert().values(
        playlist_id=id, song_id=song_id
    )
    db.session.execute(new_playlist_song)
    db.session.commit()
    return jsonify({"message": f"Song {song_id} added to playlist {id}"}), 201


@playlist_routes.route("/<int:id>/songs/<int:song_id>", methods=["DELETE"])
@login_required
def delete_playlist_songs(id, song_id):
    """
    Delete a song from a playlist
    """
    db.session.execute(
        playlist_songs.delete().where(
            (playlist_songs.c.playlist_id == id) & (playlist_songs.c.song_id == song_id)
        )
    )
    db.session.commit()

    return jsonify({"message": f"Song {song_id} removed from playlist {id}"}), 200