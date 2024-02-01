"""empty message

Revision ID: 765a4d85d20b
Revises: 
Create Date: 2024-01-31 19:09:06.115087

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '765a4d85d20b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('video_uid', sa.String(), nullable=True),
    sa.Column('screen_uid', sa.String(), nullable=True),
    sa.Column('pic_url', sa.String(), nullable=True),
    sa.Column('about', sa.String(), nullable=True),
    sa.Column('link_1', sa.String(), nullable=True),
    sa.Column('link_2', sa.String(), nullable=True),
    sa.Column('link_3', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('screen_uid'),
    sa.UniqueConstraint('username'),
    sa.UniqueConstraint('video_uid')
    )
    op.create_table('chatrooms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.Integer(), nullable=False),
    sa.Column('user_1_id', sa.Integer(), nullable=True),
    sa.Column('user_2_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_1_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_2_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('direct_messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('message_text', sa.String(), nullable=False),
    sa.Column('created_at', sa.String(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=True),
    sa.Column('receiver_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['receiver_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('following',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('followed_id', sa.Integer(), nullable=True),
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('message_text', sa.String(), nullable=False),
    sa.Column('created_at', sa.String(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=True),
    sa.Column('room_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['room_id'], ['chatrooms.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('following')
    op.drop_table('direct_messages')
    op.drop_table('chatrooms')
    op.drop_table('users')
    # ### end Alembic commands ###