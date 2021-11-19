from app.models import db, Task, Comment, section
from datetime import date, datetime
today = date.today()
# Adds a demo user, you can add other users here if you want
def seed_tasks():
    task1 = Task(
        title='Fix database relationship error',
        description='There is a joins table relationship error in the ProjectMembers joins table',
        owner_id=1,
        assignee_id=2,
        section_id=1,
        status="At Risk",
        priority="High",
        end_date=today,
        created_at=today,
        updated_at=today)
    task2 = Task(
        title='Style landing page',
        description='Add more padding and colors to the landing page',
        owner_id=1,
        assignee_id=1,
        section_id=2,
        status="At Risk",
        priority="Low",
        end_date=today,
        created_at=today,
        updated_at=today)
    task3 = Task(
        title='Fix JSON error in project create route',
        description='We are getting an unexpected token error in the JSON return message in our project api route.',
        owner_id=2,
        assignee_id=1,
        section_id=3,
        status="On Track",
        priority="Medium",
        end_date=today,
        created_at=today,
        updated_at=today)
    task4 = Task(
        title='Upgrade PostgreSQL database',
        description='We made changes to the data structure so update the database to reflect new column additon proposal',
        owner_id=2,
        assignee_id=1,
        section_id=3,
        status="On Track",
        priority="Medium",
        end_date=today,
        created_at=today,
        updated_at=today)
    task5 = Task(
        title='Debug event listener not firing',
        description='On scroll event listener is not firing to change header background color',
        owner_id=1,
        assignee_id=2,
        section_id=3,
        status="On Track",
        priority="Medium",
        end_date=today,
        created_at=today,
        updated_at=today)


    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)

    comment1 = Comment(
        user_id=1,
        comment='Looks like we need to research SQLAlchemy a bit more',
        created_at=today,
        updated_at=today)

    comment2 = Comment(
        user_id=2,
        comment='I will get on that today!',
        created_at=today,
        updated_at=today)

    comment3 = Comment(
        user_id=1,
        comment='I am thinking I will go with a neutral color scheme',
        created_at=today,
        updated_at=today)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    task1.task_comments.append(comment1)
    task1.task_comments.append(comment2)
    task2.task_comments.append(comment3)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
