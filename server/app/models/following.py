from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

class Follow(db.Model):
    __tablename__ = 'following'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    followed_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    follower_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))

    followed = db.relationship('User', foreign_keys=[followed_id], lazy='joined')
    follower = db.relationship('User', foreign_keys=[follower_id], lazy='joined')


    def to_dict(self, include_user=True):
        data = {
            'id': self.id,
            'followed_id': self.followed_id,
            'follower_id': self.follower_id
        }

        if include_user:
            if self.followed:
                data['followed'] = {'id': self.followed.id, 'username': self.followed.username, 'picUrl': self.followed.pic_url}
            if self.follower:
                data['follower'] = {'id': self.follower.id, 'username': self.follower.username, 'picUrl': self.follower.pic_url}

        return data


# follow = db.Table(
#     'following',
#     db.Model.metadata,
#     db.Column('followed_user', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
#     db.Column('follower', db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
# )

# if environment == "production":
#     follow.schema = SCHEMA
