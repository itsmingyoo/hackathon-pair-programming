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

    # Define a relationship to store sent friend requests (one-to-many)
    sent_friend_requests = db.relationship('FriendRequest', foreign_keys='FriendRequest.sender_id', backref='sender')

    # Define a relationship to store received friend requests (one-to-many)
    received_friend_requests = db.relationship('FriendRequest', foreign_keys='FriendRequest.receiver_id', backref='receiver')

    # Define a many-to-many relationship with the User model itself (friends)
    friends = db.relationship(
        'User',  # Target model (User)
        secondary='friends_association',  # Association table
        primaryjoin='User.id == friends_association.c.user_id',  # Join condition for user_id
        secondaryjoin='User.id == friends_association.c.friend_id',  # Join condition for friend_id
        backref=db.backref('friend_of', lazy='dynamic'),  # Back reference for accessing friends of a user (utilize the friend_of key for accessing associations not initiated by user)
        lazy='dynamic'  # Lazy loading for better performance
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, include_relationships=True, include_friend_requests=False):
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
            data['friends'] = [friend.to_dict(include_relationships=False) for friend in self.friends]
        
        if include_friend_requests:
            data['sentRequests'] = {request.id: request.receiver.to_dict(include_relationships=False) for request in self.sent_friend_requests}
            data['receivedRequests'] = {request.id: request.sender.to_dict(include_relationships=False) for request in self.received_friend_requests}


        return data
