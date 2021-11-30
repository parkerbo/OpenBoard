from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    fullname = field.data
    user = User.query.filter(User.full_name == fullname).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_length(form, field):
    # Checking if username is already in use
    password = field.data
    if len(password) < 8 or len(password) > 25:
        raise ValidationError('Password must be between 8 and 25 characters.')


class SignUpForm(FlaskForm):
    fullname = StringField(
        'fullname', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_length])
