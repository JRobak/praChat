from lib import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    userCode = db.Column(db.Integer)
    email = db.Column(db.String)
    password = db.Column(db.String)

    def __init__(self, username, email, password, userCode):
        self.username = username
        self.email = email
        self.password = password
        self.userCode = userCode

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
        return f'{self.session_number}. {self.date_of_creation} - {self.date_of_expiration}'


class FriendsRelation(db.Model):
    __tablename__ = 'friends_relation'

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user2_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date_of_creation = db.Column(db.DateTime)

    def __init__(self, user1_id, user2_id, date_of_creation):
        self.user1_id = user1_id
        self.user2_id = user2_id
        self.date_of_creation = date_of_creation

    def __repr__(self):
        return f'{self.id}. {self.user1_id} - {self.user2_id}'


class Invite(db.Model):
    __tablename__ = 'invates'

    id = db.Column(db.Integer, primary_key=True)
    inviter_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    invitee_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date_of_invite = db.Column(db.DateTime)

    def __init__(self, inviter_user_id, invitee_user_id, date_of_invite):
        self.inviter_user_id = inviter_user_id
        self.invitee_user_id = invitee_user_id
        self.date_of_invite = date_of_invite

    def __repr__(self):
        return f'{self.id}. {self.inviter_user_id} - {self.invitee_user_id}'


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('friends_relation.id'))
    who_send_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message = db.Column(db.String)
    date_and_hour = db.Column(db.DateTime)

    def __init__(self, conversation_id, who_send_user_id, message, date_and_hour):
        self.conversation_id = conversation_id
        self.who_send_user_id = who_send_user_id
        self.date_and_hour = date_and_hour
        self.message = message

    def __repr__(self):
        return f'{self.id}. {self.conversation_id} - {self.message} - {self.date_and_hour}'

