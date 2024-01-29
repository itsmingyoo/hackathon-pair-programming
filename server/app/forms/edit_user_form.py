from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError

from app.models import User

def username_taken(form, field):
    new_username = field.data
    username = User.query.filter(User.username == new_username).first()
    if username:
        raise ValidationError("This username is already taken.")

class EditProfile(FlaskForm):
    username = StringField("Change your username.", validators=[DataRequired])
    pic_url = StringField("Set a picture for your profile")
    about = StringField("Tell others about yourself.", validators=[DataRequired])
    link_1 = StringField("Link your other accounts.", validators=[DataRequired])
    link_2 = StringField("Link your other accounts.", validators=[DataRequired])
    link_3 = StringField("Link your other accounts.", validators=[DataRequired])