"""empty message

Revision ID: 844420e24a0d
Revises: 3eda111d7984
Create Date: 2021-11-16 15:29:46.075000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '844420e24a0d'
down_revision = '3eda111d7984'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('start_date', sa.Date(), nullable=True))
    op.add_column('tasks', sa.Column('end_date', sa.Date(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tasks', 'end_date')
    op.drop_column('tasks', 'start_date')
    # ### end Alembic commands ###
