from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.auth_routes import authenticate
from app.forms import PlaylistForm
from app.models import db, Playlist, playlist_songs

playlist_routes = Blueprint("playlists", __name__)


@playlist_routes.route("/", methods=["GET", "POST"])
@login_required
def playlists():
    """
    Query for all playlists and returns them in a list of playlist dictionaries
    """
    user = authenticate()

    if request.method == "POST":
        form = PlaylistForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            playlist = Playlist(
                user_id=user.id,
                image_url=form.data["image_url"],
                name=form.data["name"],
                description=form.data["description"],
            )
            db.session.add(playlist)
            db.session.commit()
            return playlist.to_dict()
        return form.errors, 401

    return {"playlists": [playlist.to_dict() for playlist in user.playlists]}


@playlist_routes.route("/<int:id>")
@login_required
def playlist(id):
    """
    Query for a playlist by id and returns that playlist in a dictionary
    """
    user = authenticate()
    playlist = filter(lambda playlist: playlist.id == id, user.playlists)
    return playlist.to_dict()


@playlist_routes.route("/<int:id>/songs/<int:song_id>", methods=["POST", "DELETE"])
@login_required
def add_playlist_songs(id, song_id):
    """
    Query for all songs of a playlist by id for `POST` and `DELETE` requests
    """
    if request.method == "POST":
        new_playlist_song = playlist_songs.insert().values(
            playlist_id=id, song_id=song_id
        )
        db.session.execute(new_playlist_song)
        db.session.commit()
        return jsonify({"message": f"Song {song_id} added to playlist {id}"}), 201

    elif request.method == "DELETE":
        deleted_playlist_song = (
            db.session.query(playlist_songs)
            .filter_by(playlist_id=id, song_id=song_id)
            .first()
        )
        db.session.delete(deleted_playlist_song)
        db.session.commit()
        return jsonify({"message": f"Song {song_id} removed from playlist {id}"}), 200
