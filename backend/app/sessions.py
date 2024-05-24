from models.query import create_session


def create_session_cookie(email):
    nr = create_session(email)


def delete_session_cookie(nr):
    pass
