"""empty message

Revision ID: 7ec8ae931e0c
Revises: 844420e24a0d
Create Date: 2021-11-17 21:56:49.101835

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7ec8ae931e0c'
down_revision = '844420e24a0d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('notepad', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'notepad')
    # ### end Alembic commands ###