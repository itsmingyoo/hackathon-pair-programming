from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import uuid


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    video_uid = db.Column(db.String, unique=True, default=lambda:str(uuid.uuid4()))
    screen_uid = db.Column(db.String, unique=True, default=lambda:str(uuid.uuid4()))

    pic_url = db.Column(db.String, nullable=True)

    about = db.Column(db.String, nullable=True)

    link_github = db.Column(db.String, nullable=True)
    link_linkedin = db.Column(db.String, nullable=True)
    link_portfolio = db.Column(db.String, nullable=True)
    link_leetcode = db.Column(db.String, nullable=True)

    messages = db.relationship('Message', back_populates='user', cascade="all, delete-orphan")

    following = db.relationship(
        'Follow',
        foreign_keys='Follow.follower_id',
        back_populates='followed',
        lazy='dynamic'
    )

    followers = db.relationship(
        'Follow',
        foreign_keys='Follow.followed_id',
        back_populates='follower',
        lazy='dynamic'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, include_relationships=True, include_user=True):
        data = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'videoUid': self.video_uid,
            'screenUid': self.screen_uid,
            'picUrl': self.pic_url,
            'about': self.about,
            'github': self.link_github,
            'linkedin': self.link_linkedin,
            'portfolio': self.link_portfolio,
            'leetcode': self.link_leetcode,
        }

        if include_relationships:
            data['following'] = [follow.to_dict(include_user=include_user) for follow in self.following]
            data['followers'] = [follow.to_dict(include_user=include_user) for follow in self.followers]

        return data
