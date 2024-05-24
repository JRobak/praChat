from lib import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return f"{self.id} {self.username} {self.email} {self.password}"


class Session(db.Model):
    __tablename__ = 'sessions'

    session_number = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.Integer)
    date_of_creation = db.Column(db.DateTime)
    date_of_expiration = db.Column(db.DateTime)

    def __init__(self, session_number, user_id, date_of_creation, date_of_expiration):
        self.session_number = session_number
        self.user_id = user_id
        self.date_of_creation = date_of_creation
        self.date_of_expiration = date_of_expiration

    def __repr__(self):
        return f'{self.id}. {self.date_of_creation} - {self.date_of_expiration}'
