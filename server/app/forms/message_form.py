from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class NewMessage(FlaskForm):
    message = StringField("Write your message here.", validators=[DataRequired()])
