from flask import Blueprint, request, jsonify
from models.query import get_conversation_id_by_users_id, check_session_by_number, get_conversation_by_id, \
    get_user_by_user_id

conversation_ = Blueprint('conversation', __name__)


@conversation_.route('/get_conversation_id', methods=['POST'])
def get_conversation_id():
    user1_id = request.json['user_id']
    user2_id = check_session_by_number(request.json['session'])
    id = get_conversation_id_by_users_id(user1_id, user2_id)
    return jsonify({"id": id}), 200


@conversation_.route('/get_users_name_by_conversation_id', methods=['POST'])
def get_users_name_by_conversation_id():
    conversation_id = request.json['currentConversationId']
    user_id = check_session_by_number(request.json['session'])
    conv = get_conversation_by_id(conversation_id)
    user_id_to_fetch = conv.user2_id if conv.user1_id == user_id else conv.user1_id
    return jsonify({"username": get_user_by_user_id(user_id_to_fetch).username}), 200

