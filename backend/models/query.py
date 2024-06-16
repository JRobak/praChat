from datetime import datetime, timedelta
from models.Models import User, Session, FriendsRelation, Invite, Message
from lib import db
from lib.hash import hash_password


# USERS
def add_new_user(username, email, password):
    users_with_same_name = User.query.filter_by(username=username).all()

    from lib.creator_userCode import create_user_code, LENGTH
    code = str(create_user_code(LENGTH))

    if not users_with_same_name:
        users_code_with_same_name = [x.userCode for x in users_with_same_name]
        while code in users_code_with_same_name:
            code = create_user_code(LENGTH)

    user = User(username, email, hash_password(password), code)
    db.session.add(user)
    db.session.commit()
    return user


def checking_is_user_exist_by_email(email):
    user = User.query.filter_by(email=email).first()
    return user if user else None


def get_user_by_user_id(id):
    user = User.query.filter_by(id=id).first()
    return user if user else None


def check_username_and_code(username, code):
    user = User.query.filter_by(username=username, userCode=code).first()
    return user if user else None


# SESSIONS
def check_exists_number_session(nr):
    session = Session.query.filter_by(session_number=nr).first()
    return session if session else None


def create_session(email, sid):
    # from lib.creator_sessions import create_session_number, LENGTH
    # new_session_number = create_session_number(LENGTH)
    # while check_exists_number_session(new_session_number):
    #     new_session_number = create_session_number(LENGTH)

    date_of_creation = datetime.now()
    expiration_date = datetime.now() + timedelta(days=4)

    user = checking_is_user_exist_by_email(email)

    new_session = Session(sid, user.id, date_of_creation, expiration_date)
    db.session.add(new_session)
    db.session.commit()

    return sid


def delete_session(nr):
    session = Session.query.filter_by(session_number=nr).first()
    db.session.delete(session)
    db.session.commit()


# def check_expiration_date(nr):
#     session = Session.query.filter_by(session_number=nr).first()
#     expiration_date = session.date_of_expiration
#     current_datetime = datetime.now()
#     return (expiration_date - current_datetime).days >= 0
#
#
# def extend_date_of_session(nr):
#     expiration_date = datetime.now() + timedelta(days=4)
#     session = Session.query.filter_by(session_number=nr).first()
#     session.expiration_date = expiration_date
#     db.session.commit()
#
#
# def check_session_by_number(nr):
#     session = check_exists_number_session(nr)
#     if session:
#         if check_expiration_date(nr) > 0:
#             return session.user_id
#     return None


# FRIENDS RELATIONS
def get_every_friends_for_user_id(user_id):
    relations1 = FriendsRelation.query.filter_by(user1_id=user_id).all()
    relations2 = FriendsRelation.query.filter_by(user2_id=user_id).all()

    friends = []
    for relation in relations1:
        friends.append(relation.user2_id)
    for relation in relations2:
        friends.append(relation.user1_id)
    friends = list(set(friends))

    return friends


def get_every_invitations_for_user_id(user_id):
    invitations = Invite.query.filter_by(invitee_user_id=user_id).all()
    invitations_users_list = []
    for invitation in invitations:
        invitations_users_list.append(invitation.inviter_user_id)
    return invitations_users_list


def accept_invitation_by_users_id(user1_id, user2_id):
    invitation = Invite.query.filter_by(inviter_user_id=user1_id, invitee_user_id=user2_id).first()
    db.session.delete(invitation)
    date = datetime.now()
    friend_relation = FriendsRelation(user1_id, user2_id, date)
    db.session.add(friend_relation)
    db.session.commit()


def decline_invitation_by_users_id(user1_id, user2_id):
    invitation = Invite.query.filter_by(inviter_user_id=user1_id, invitee_user_id=user2_id).first()
    db.session.delete(invitation)
    db.session.commit()


def invite_friend_by_users_id(inviter_user_id, invitee_user_id):
    invitation = Invite(inviter_user_id, invitee_user_id, datetime.now())
    db.session.add(invitation)
    db.session.commit()


# MESSAGES
def create_new_message(conversation_id, message):
    new_message = Message(conversation_id, datetime.now(), message)
    db.session.add(new_message)
    db.session.commit()


def get_every_messages_for_conversation_id(conversation_id):
    messages = Message.query.filter_by(conversation_id=conversation_id).all()


# conversation
def get_conversation_id_by_users_id(user1_id, user2_id):
    con1 = FriendsRelation.query.filter_by(user1_id=user1_id, user2_id=user2_id).first()
    con2 = FriendsRelation.query.filter_by(user1_id=user2_id, user2_id=user1_id).first()
    if con1:
        return con1.id
    if con2:
        return con2.id


def get_conversation_by_id(conversation_id):
    conv = FriendsRelation.query.filter_by(id=conversation_id).first()
    return conv if conv else None
