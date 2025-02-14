from flask import Blueprint, jsonify, redirect, request, url_for
from flask_login import login_required, current_user
from app.forms.playlist_form import PlaylistForm
from app.models import db, Playlist, playlist_songs, Song

playlist_routes = Blueprint("playlists", __name__)


@playlist_routes.route("/", methods=["GET"])
@login_required
def playlists():
    """
    Query for all playlists and returns them in a list of playlist dictionaries
    """
    playlists = Playlist.query.filter(Playlist.user_id == current_user.id)
    return {"playlists": [playlist.to_dict() for playlist in playlists]}


@playlist_routes.route("", methods=["POST"])
@login_required
def add_playlist():
    """
    Creates a playlist for the logged in user and returns it as a dict
    """
    form = PlaylistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        playlist = Playlist(
            user_id=current_user.id,
            name=form.name.data,
            description=form.description.data,
            image_url=form.image_url.data,
        )
        db.session.add(playlist)
        db.session.commit()
        return playlist.to_dict()

    return form.errors, 401


@playlist_routes.route("/<int:playlist_id>", methods=["PUT"])
@login_required
def update_playlist(playlist_id):
    """
    Updates a playlist for the logged in user and returns it as a dict
    """
    edited_playlist = Playlist.query.get_or_404(playlist_id)

    if current_user.id != edited_playlist.user_id:
        return redirect(url_for("authenticate"))

    form = PlaylistForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        form.populate_obj(edited_playlist)
        db.session.commit()
        return edited_playlist.to_dict()

    return form.errors, 401


@playlist_routes.route("/<int:playlist_id>/songs", methods=["POST"])
@login_required
def add_playlist_songs(playlist_id):
    """
    Add a song to a playlist
    """
    data = request.get_json()
    song_id = data["song_id"]
    
    playlist = Playlist.query.get_or_404(playlist_id)
    Song.query.get_or_404(song_id)

    if current_user.id != playlist.user_id:
        return redirect(url_for("authenticate"))

    new_playlist_song = playlist_songs.insert().values(
        playlist_id=playlist_id, song_id=song_id
    )
    db.session.execute(new_playlist_song)
    db.session.commit()
    return jsonify({"message": "Song added to playlist"}), 201


@playlist_routes.route("/<int:playlist_id>/songs/<int:song_id>", methods=["DELETE"])
@login_required
def delete_playlist_songs(playlist_id, song_id):
    """
    Delete a song from a playlist
    """
    playlist = Playlist.query.get_or_404(playlist_id)
    Song.query.get_or_404(song_id)

    if current_user.id != playlist.user_id:
        return redirect(url_for("authenticate"))

    db.session.execute(
        playlist_songs.delete().where(
            (playlist_songs.c.playlist_id == playlist_id)
            & (playlist_songs.c.song_id == song_id)
        )
    )
    db.session.commit()
    return jsonify({"message": "Song removed from playlist"}), 200
