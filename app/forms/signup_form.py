from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


def artist_name_exists(form, field):
    # Checking if artist_name is already in use
    artist_name = field.data
    user = User.query.filter(User.artist_name == artist_name).first()
    if user:
        raise ValidationError("Artist name is already in use.")


class SignUpForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), username_exists])
    email = StringField("Email", validators=[DataRequired(), user_exists])
    artist_name = StringField(
        "Artist Name", validators=[DataRequired(), artist_name_exists]
    )
    password = StringField("Password", validators=[DataRequired()])
