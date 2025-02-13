from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, URL, ValidationError

class AlbumForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired(), URL()])
    release_year = IntegerField('release_year', validators=[DataRequired()])
    