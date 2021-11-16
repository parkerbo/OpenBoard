from flask.cli import AppGroup
from .users import seed_users, undo_users
from .sections import seed_sections, undo_sections
from .tasks import seed_tasks, undo_tasks
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_sections()
    seed_tasks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_tasks()
    undo_sections()
    undo_users()
    # Add other undo functions here
