from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from ..models import User, Follow, db
from sqlalchemy.orm import joinedload

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/user/<int:id>')
def get_user_followers(id):
    user = User.query.get(id)

    # follows = Follow.query.filter(Follow.follower_id == user.id)
    # followers = Follow.query.filter(Follow.followed_id == user.id)

    # Eagerly load the 'followed' and 'follower' user relationships
    follows = Follow.query.options(joinedload(Follow.followed), joinedload(Follow.follower))\
                   .filter(Follow.follower_id == user.id).all()
    followers = Follow.query.options(joinedload(Follow.followed), joinedload(Follow.follower))\
                        .filter(Follow.followed_id == user.id).all()

    return jsonify({
        'follows': [follow.to_dict() for follow in follows],
        'followers': [follower.to_dict() for follower in followers]
    })


@follow_routes.route('/user/<int:id>', methods=['POST'])
@login_required
def follow_user(id):
    target_user = User.query.get(id)

    new_follow = Follow(
        followed_id = target_user.id,
        follower_id = current_user.id
    )

    db.session.add(new_follow)
    db.session.commit()

    return new_follow.to_dict()

@follow_routes.route('/pair/<int:id>', methods=['POST'])
@login_required
def follow_pair(id):
    target_user = User.query.get(id)

    new_follow = Follow(
        followed_id = target_user.id,
        follower_id = current_user.id
    )

    db.session.add(new_follow)
    db.session.commit()

    return current_user.to_dict()

@follow_routes.route('/pair/<int:id>', methods=['DELETE'])
@login_required
def unfollow_pair(id):
    follow = Follow.query.get(id)
    if follow and follow.follower_id == current_user.id:
        db.session.delete(follow)
        db.session.commit()
        return current_user.to_dict()
    else:
        return "You do not follow this user"


@follow_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def unfollow_user(id):
    follow = Follow.query.get(id)
    if follow and follow.follower_id == current_user.id:
        db.session.delete(follow)
        db.session.commit()
        return "Unfollow Successful"
    else:
        return "You do not follow this user"
