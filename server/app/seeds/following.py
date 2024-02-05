from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_follows():
    users_count = 21  # Assuming we have 20 users
    follow_relationships = set()  # To keep track of already created relationships

    for follower_id in range(1, users_count + 1):
        # Decide randomly how many users this user will follow, e.g., 0 to 5
        follows_count = random.randint(0, 5)
        followed_ids = random.sample([id for id in range(1, users_count + 1) if id != follower_id], follows_count)

        for followed_id in followed_ids:
            # Ensure the relationship is unique before adding
            if (follower_id, followed_id) not in follow_relationships:
                follow = Follow(followed_id=followed_id, follower_id=follower_id)
                db.session.add(follow)
                follow_relationships.add((follower_id, followed_id))

    db.session.commit()

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.following RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM following"))

    db.session.commit()
