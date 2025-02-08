from flask import Blueprint, request
from sqlalchemy.orm import joinedload, load_only
from flask_login import login_required, current_user
from app.models import db, Album, Song, album_songs
from app.forms.album_form import AlbumForm

album_routes = Blueprint("albums", __name__)


@album_routes.route("/<int:album_id>/songs/<int:song_id>", methods=["POST"])
def add_song_to_album(album_id, song_id):
    album = Album.query.get_or_404(album_id)

    song = Song.query.get_or_404(song_id)

    errors = {}

    if album.user_id != current_user.id:
        errors["album"] = "Album must belong to the current user"

    if song.user_id != current_user.id:
        errors["song"] = "Song must belong to the current user"

    if song in album.songs:
        errors["album_songs"] = "Song is already on the album"

    if errors:
        return errors

    album.songs.append(song)

    db.session.commit()

    return {album.id: album.to_dict()}


@album_routes.route("/<int:album_id>/songs/<int:song_id>", methods=["DELETE"])
def remove_song_from_album(album_id, song_id):
    album = Album.query.get_or_404(album_id)

    song = Song.query.get_or_404(song_id)

    errors = {}

    if album.user_id != current_user.id:
        errors["album"] = "Album must belong to the current user"

    if song.user_id != current_user.id:
        errors["song"] = "Song must belong to the current user"

    if errors:
        return errors

    album.songs.remove(song)

    db.session.commit()

    return {album.id: album.to_dict()}


@album_routes.route("/<int:album_id>", methods=["PUT"])
@login_required
def update_album(album_id):
    form = AlbumForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    edited_album = Album.query.get_or_404(album_id)

    if edited_album.user_id != current_user.id:
        return {"message": "Album must belong to the current user"}

    elif edited_album.user_id == current_user.id and form.validate_on_submit():
        form.populate_obj(edited_album)

        db.session.commit()

        return {edited_album.id: edited_album.to_dict()}

    return form.errors, 400


@album_routes.route("/<int:album_id>", methods=["DELETE"])
@login_required
def delete_album(album_id):
    album_to_delete = Album.query.get_or_404(album_id)

    if album_to_delete.user_id != current_user.id:
        return {"message": "Album must belong to the current user"}

    db.session.delete(album_to_delete)
    db.session.commit()

    return {"message": "Successfully deleted"}


@album_routes.route("/")
def get_all_albums():
    albums = Album.query.all()

    return {"albums": {album.id: album.to_dict() for album in albums}}


@album_routes.route("/", methods=["POST"])
@login_required
def create_album():
    form = AlbumForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_album = Album(
            user_id=current_user.id,
            title=form.title.data,
            image_url=form.image_url.data,
            release_year=form.release_year.data,
        )

        db.session.add(new_album)
        db.session.commit()

        return {new_album.id: new_album.to_dict()}

    return form.errors, 400
