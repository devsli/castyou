"""Initial schema

Revision ID: 74b39fe8d4b1
Revises: 
Create Date: 2017-12-17 08:29:59.028699

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '74b39fe8d4b1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('config',
        sa.Column('key', sa.String(), nullable=False),
        sa.Column('value', sa.String()),
        sa.PrimaryKeyConstraint('key')
    )

    conf_keys = ['title', 'url', 'language', 'copyright', 'link', 'subtitle',
                 'author', 'summary', 'description', 'owner_name',
                 'owner_email', 'image', 'category', 'explicit']

    for key in conf_keys:
        op.get_bind().execute(sa.sql.text(
            "INSERT INTO config (key) VALUES ('%s');" % (key, )))

    op.create_table('items',
        sa.Column('id', sa.Integer, primary_key=True),

        sa.Column('title', sa.String(), nullable=True),
        sa.Column('author', sa.String(), nullable=True),
        sa.Column('subtitle', sa.String(), nullable=True),
        sa.Column('summary', sa.String(), nullable=True),
        sa.Column('image', sa.String(), nullable=True),
        sa.Column('url', sa.String(), nullable=True),
        sa.Column('length', sa.String(), nullable=True),
        sa.Column('type', sa.String(), nullable=True),
        sa.Column('guid', sa.String(), nullable=True),
        sa.Column('pub_date', sa.String(), nullable=True),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('duration', sa.String(), nullable=True),
        sa.Column('explicit', sa.Boolean(), default=True),
    )


def downgrade():
    op.drop_table('config')
    op.drop_table('items')
