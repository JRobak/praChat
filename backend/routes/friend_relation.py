from flask import Blueprint, request, jsonify

from models.query import get_every_friends_for_user_id, get_user_by_user_id, get_every_invitations_for_user_id, \
    decline_invitation_by_users_id, accept_invitation_by_users_id, check_username_and_code, invite_friend_by_users_id, \
    check_session_by_number

friend_relation_ = Blueprint('friend_relation', __name__)


@friend_relation_.route('/get_every_friend', methods=['GET'])
def get_every_friend():
    user_id = check_session_by_number(request.args.get('session'))
    friends = get_every_friends_for_user_id(user_id)
    user_friends = []
    for x in friends:
        user = get_user_by_user_id(x)
        user_friends.append({'id': user.id, 'username': user.username, 'userCode':user.userCode, 'email': user.email})
    return jsonify({'friends': user_friends})


@friend_relation_.route('/get_every_invitations', methods=['GET'])
def get_every_invitations():
    user_id = check_session_by_number(request.args.get('session'))
    invitations = get_every_invitations_for_user_id(user_id)
    user_invitations = []
    for x in invitations:
        user = get_user_by_user_id(x)
        user_invitations.append({'id': user.id, 'username': user.username, 'userCode':user.userCode, 'email': user.email})
    return jsonify({'invitations': user_invitations})


@friend_relation_.route('/invite_friend', methods=['POST'])
def invite_friend():
    user_input = request.json['user_input']
    user_id = check_session_by_number(request.json['session'])
    if user_input == '' or user_input.find("#") == -1:
        return jsonify({"message": "Username with #code is required"}), 400

    username, code = user_input.split('#')
    if not code.isdigit():
        return jsonify({"message": "Code must be Integer"}), 400

    user = check_username_and_code(username, int(code))

    if user is None:
        return jsonify({"message": f"{user_input} doesn't exist"}), 400
    else:
        invite_friend_by_users_id(user_id, user.id)
        return jsonify({"message": "Invitation sent"}), 200


@friend_relation_.route('/accept_invitation', methods=['POST'])
def accept_invitation():
    data = request.json
    user1_id = data['user_id']
    user_id = check_session_by_number(data['session'])
    accept_invitation_by_users_id(user1_id, user_id)
    return jsonify({"message": "Invitation accepted"}), 200


@friend_relation_.route('/decline_invitation', methods=['DELETE'])
def decline_invitation():
    data = request.json
    user1_id = data['user_id']
    user_id = check_session_by_number(data['session'])
    decline_invitation_by_users_id(user1_id, user_id)
    return jsonify({"message": "Invitation declined"}), 200
