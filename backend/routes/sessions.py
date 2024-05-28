from flask import Blueprint, request, jsonify
from models.query import check_session_by_number, extend_date_of_session

session_ = Blueprint('session', __name__)


@session_.route('/check_session', methods=['POST'])
def check_session():
    session_data = request.json
    session_nr = session_data.get('session')
    user_id = check_session_by_number(session_nr)
    if user_id:
        extend_date_of_session(session_nr)
        return jsonify({"user_id": user_id})
    else:
        return jsonify({"user_id": None})

