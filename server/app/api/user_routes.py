from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import User, db
from app.forms import EditProfile

from sqlalchemy import select

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

@user_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    user = User.query.get(id)
    if not user:
        return {"error": "User is not found"}

    form = EditProfile()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user.username = form.data['username']
        user.pic_url = form.data['pic_url']
        user.about = form.data['about']

        user.link_1 = form.data['link_1']
        user.link_2 = form.data['link_2']
        user.link_3 = form.data['link_3']

        db.session.commit()
        return user.to_dict()

    return {"errors": form.errors}
