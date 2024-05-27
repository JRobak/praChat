from datetime import datetime, timedelta
from models.Models import User, Session
from lib import db
from lib.hash import hash_password


# USERS
def add_new_user(username, email, password):
    user = User(username, email, hash_password(password))
    db.session.add(user)
    db.session.commit()
    return user


def checking_is_user_exist_by_email(email):
    user = User.query.filter_by(email=email).first()
    return user if user else None


# SESSIONS
def check_exists_number_session(nr):
    session = Session.query.filter_by(session_number=nr).first()
    return session if session else None


def create_session(email):
    from lib.creator_sessions import create_session_number, LENGTH
    new_session_number = create_session_number(LENGTH)
    while check_exists_number_session(new_session_number):
        new_session_number = create_session_number(LENGTH)

    date_of_creation = datetime.now()
    expiration_date = datetime.now() + timedelta(days=4)

    user = checking_is_user_exist_by_email(email)

    new_session = Session(new_session_number, user.id, date_of_creation, expiration_date)
    db.session.add(new_session)
    db.session.commit()

    return new_session_number


def check_expiration_date(nr):
    session = Session.query.filter_by(session_number=nr).first()
    expiration_date = session.date_of_expiration
    current_datetime = datetime.now()
    return (expiration_date - current_datetime).days >= 0


def extend_date_of_session(nr):
    expiration_date = datetime.now() + timedelta(days=4)
    session = Session.query.filter_by(session_number=nr).first()
    session.expiration_date = expiration_date
    db.session.commit()


def check_session_by_number(nr):
    session = check_exists_number_session(nr)
    if not session: return None
    if check_exists_number_session(nr) <= 0: return None
    return session.user_id


def delete_session(nr):
    session = Session.query.filter_by(session_number=nr).first()
    db.session.delete(session)
    db.session.commit()


