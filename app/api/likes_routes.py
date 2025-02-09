from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, likes

likes_routes = Blueprint("likes", __name__)


@likes_routes.route("/", methods=["POST"])
@login_required
def add_liked_song():
    """
    Add a song to the logged in user's liked songs list
    """
    user_id = current_user.id
    data = request.get_json()
    song_id = data["song_id"]
    new_liked_song = likes.insert().values(user_id=user_id, song_id=song_id)
    db.session.execute(new_liked_song)
    db.session.commit()
    return jsonify({"message": "Song added to user's likes'"}), 201


@likes_routes.route("/<int:song_id>", methods=["DELETE"])
@login_required
def delete_liked_song(song_id):
    """
    Remove a song from a logged in user's liked songs list
    """
    user_id = current_user.id
    db.session.execute(
        likes.delete().where(
            (likes.c.user_id == user_id) & (likes.c.song_id == song_id)
        )
    )
    db.session.commit()
    return jsonify({"message": "Song removed from user's likes"}), 200
