from flask import Blueprint, request, jsonify, session
from flask_cors import cross_origin

from models.query import get_every_friends_for_user_id, get_user_by_user_id, get_every_invitations_for_user_id, \
    decline_invitation_by_users_id, accept_invitation_by_users_id

friend_relation_ = Blueprint('friend_relation', __name__)

user_id = 5 # naprawic, aby user_id zgadzał się z tym co jest zalogowany


@friend_relation_.route('/get_every_friend', methods=['GET'])
def get_every_friend():
    friends = get_every_friends_for_user_id(user_id)
    user_friends = []
    for x in friends:
        user = get_user_by_user_id(x)
        user_friends.append({'id': user.id, 'username': user.username, 'userCode':user.userCode, 'email': user.email})
    return jsonify({'friends': user_friends})


@friend_relation_.route('/get_every_invitations', methods=['GET'])
def get_every_invitations():
    invitations = get_every_invitations_for_user_id(user_id)
    user_invitations = []
    for x in invitations:
        user = get_user_by_user_id(x)
        user_invitations.append({'id': user.id, 'username': user.username, 'userCode':user.userCode, 'email': user.email})
    return jsonify({'invitations': user_invitations})


@friend_relation_.route('/invite_friend', methods=['POST'])
def invite_friend():
    user_input = request.json['user_input']
    print(user_input)


@friend_relation_.route('/accept_invitation', methods=['POST'])
@cross_origin()
def accept_invitation():
    data = request.json
    user1_id = data['user_id']
    accept_invitation_by_users_id(user1_id, user_id)
    return jsonify({"message": "Invitation accepted"}), 200


@friend_relation_.route('/decline_invitation', methods=['DELETE'])
@cross_origin()
def decline_invitation():
    data = request.json
    user1_id = data['user_id']
    decline_invitation_by_users_id(user1_id, user_id)
    return jsonify({"message": "Invitation declined"}), 200
