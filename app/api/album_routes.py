from flask import Blueprint, request
from sqlalchemy.orm import joinedload, load_only
from flask_login import login_required, current_user
from app.models import db, Album
from app.forms.album_form import AlbumForm

album_routes = Blueprint('albums', __name__)

# I want to return a list of albums with just their normal properties, not the nested ones
# I need to get all the albums, and normalize the data

@album_routes.route('/')
def get_all_albums():
    albums = Album.query.all()

    return {
        "albums": {
            album.id: album.to_dict() for album in albums
        }
    }

@album_routes.route('/', methods=["POST"])
@login_required
def create_an_album():
    form = AlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        
        new_album = Album(
            user_id=current_user.id,
            title=form.title.data,
            image_url=form.image_url.data,
            release_year=form.release_year.data
        )

        db.session.add(new_album)
        db.session.commit()

        return new_album.to_dict()
    
    return form.errors, 401

# if the user is logged in and owns the album, they can update

@album_routes.route('/<int:album_id>', methods=["PUT"])
@login_required
def update_an_album(album_id):
    form = AlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']

