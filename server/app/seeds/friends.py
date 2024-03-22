# Import necessary modules
from app.models import db, User, Friend, environment, SCHEMA, FriendshipStatus
from sqlalchemy.sql import text

# Define a function to seed the friends data
def seed_friends():
    # Define friendships between users
    friendships = [
        {'user_id': 1, 'friend_id': 2, 'status': FriendshipStatus.ACCEPTED},  # Example friendship between user 1 and user 2
        {'user_id': 1, 'friend_id': 3, 'status': FriendshipStatus.PENDING},  # Example friendship between user 1 and user 3
        # Add more friendships as needed
    ]

    # Iterate over the friendships and add them to the database
    for friendship in friendships:
        new_friendship = Friend(**friendship)
        db.session.add(new_friendship)

    # Commit the changes to the database
    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends_association RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends_association"))

    db.session.commit()
