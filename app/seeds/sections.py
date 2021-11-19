from app.models import comment, db, Section
from datetime import date
today = date.today()

# Adds a demo user, you can add other users here if you want
def seed_sections():
    section1 = Section(
        project_id=1,
        board_column=0,
        tasks_order=[1],
        title='Backlog',
        created_at=today,
        updated_at=today)
    section2 = Section(
        project_id=1,
        board_column=1,
        tasks_order=[2],
        title='Open',
        created_at=today,
        updated_at=today)
    section3 = Section(
        project_id=1,
        board_column=2,
        tasks_order=[3,4,5],
        title='In Progress',
        created_at=today,
        updated_at=today)
    section4 = Section(
        project_id=1,
        board_column=3,
        title='Closed',
        created_at=today,
        updated_at=today)

    db.session.add(section1)
    db.session.add(section2)
    db.session.add(section3)
    db.session.add(section4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_sections():
    db.session.execute('TRUNCATE sections RESTART IDENTITY CASCADE;')
    db.session.commit()
