from backend.models.User import User
from backend.lib import db
from backend.lib.hash import hash_password


def add_new_user(username, email, password):
    user = User(username, email, hash_password(password))
    db.session.add(user)
    db.session.commit()
    return user


def checking_is_user_exist(email):
    pass


def try_log_in(email, password):
    pass
