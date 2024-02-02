from app.models import db, Follow, environment, SCHEMA
from sqlalchemy.sql import text

def seed_follows():
    follow1 = Follow(followed_id=2, follower_id=1)  # Demo follows Marnie
    # follow2 = Follow(followed_id=3, follower_id=1)  # Demo follows Bobbie
    follow3 = Follow(followed_id=1, follower_id=2)  # Marnie follows Demo
    follow4 = Follow(followed_id=3, follower_id=2)  # Marnie follows Bobbie
    follow5 = Follow(followed_id=1, follower_id=3)  # Bobbie follows Demo
    follow6 = Follow(followed_id=2, follower_id=3)  # Bobbie follows Marnie

    db.session.add(follow1)
    # db.session.add(follow2)
    db.session.add(follow3)
    db.session.add(follow4)
    db.session.add(follow5)
    db.session.add(follow6)

    db.session.commit()

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.following RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM following"))

    db.session.commit()
