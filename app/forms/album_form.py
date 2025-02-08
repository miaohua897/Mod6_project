from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, URL, ValidationError

def validate_release_year(self, field):
    if not field.data:
        raise ValidationError("Release year must be a valid integer.")

class AlbumForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired(), URL()])
    release_year = IntegerField('release_year', validators=[validate_release_year, DataRequired()])
    