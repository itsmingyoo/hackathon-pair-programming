from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import EditProfile
from .auth_routes import validation_errors_to_error_messages

from sqlalchemy import select
from .aws_image_helpers import get_unique_filename, upload_file_to_s3

user_routes = Blueprint('users', __name__)


# @login_required
@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


# @login_required
@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/edit', methods=['PUT'])
@login_required
def edit_user():

    form = EditProfile()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        current_user.username = form.data['username']
        current_user.about = form.data['about']
        current_user.link_github = form.data['link_github']
        current_user.link_linkedin = form.data['link_linkedin']
        current_user.link_portfolio = form.data['link_portfolio']
        current_user.link_leetcode = form.data['link_leetcode']


        if form.data['pic_url']:
            profile_pic = form.data['pic_url']
            profile_pic.filename = get_unique_filename(profile_pic.filename)
            pic_upload = upload_file_to_s3(profile_pic)
            current_user.pic_url = pic_upload['url']

        db.session.commit()
        return current_user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
