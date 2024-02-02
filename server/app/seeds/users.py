from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', pic_url='https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', about='Aute commodo est reprehenderit consequat incididunt excepteur. Commodo excepteur labore culpa non amet consequat Lorem ex veniam in veniam ex laboris excepteur. Dolor et cupidatat commodo enim irure ea et cillum excepteur minim cupidatat officia. Eiusmod quis sit mollit ullamco laborum consequat pariatur. Excepteur cupidatat quis commodo minim veniam. Ut ad occaecat nisi elit cupidatat veniam commodo nisi cupidatat. Labore ea ullamco ad nostrud non excepteur.', link_github='https://i.imgur.com/1eLi7iL.jpeg', link_linkedin='https://i.imgur.com/1eLi7iL.jpeg', link_portfolio='https://i.imgur.com/1eLi7iL.jpeg', link_leetcode='https://i.imgur.com/1eLi7iL.jpeg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', pic_url='https://images.unsplash.com/photo-1457449940276-e8deed18bfff?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', about='Aute cillum velit eiusmod sit reprehenderit proident adipisicing ad commodo voluptate tempor.')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', pic_url='https://images.unsplash.com/photo-1510917065317-aa26965fe730?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', about='Mollit commodo amet occaecat ullamco eu dolor. Aliqua pariatur est amet do labore laboris qui do quis. Nostrud duis pariatur minim culpa cupidatat eiusmod ex magna. Labore ullamco est magna sunt. Ullamco eiusmod in ad occaecat minim aute ut enim. Fugiat id cillum incididunt eiusmod tempor ullamco nisi amet amet nulla. Nostrud minim fugiat nostrud ut eu exercitation ullamco.')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
