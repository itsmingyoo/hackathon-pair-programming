from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.schema import ForeignKey

class ProfilePic(db.Model):
    __tablename__ = 'profile_pics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)

    def to_dict(self):
        data = {
            'id': self.id,
            'url': self.url,
        }

        return data