from flask import Blueprint, request, jsonify
from models.query import get_conversation_id_by_users_id, check_session_by_number

conversation_ = Blueprint('conversation', __name__)


@conversation_.route('/get_conversation_id', methods=['POST'])
def get_conversation_id():
    user1_id = request.json['user_id']
    user2_id = check_session_by_number(request.json['session'])
    id = get_conversation_id_by_users_id(user1_id, user2_id)
    return jsonify({"id": id}), 200
