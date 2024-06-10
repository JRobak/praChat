from flask import Blueprint, request, jsonify, session
from models.query import check_session_by_number, extend_date_of_session, get_user_by_user_id

session_ = Blueprint('session', __name__)


@session_.route('/check_session', methods=['POST'])
def check_session():
    session_data = request.json
    session_nr = session_data.get('session')
    user_id = check_session_by_number(session_nr)
    # session['user_id'] = user_id
    if user_id:
        user = get_user_by_user_id(user_id)
        user_with_code = user.username + "#" + str(user.userCode)
        extend_date_of_session(session_nr)
        return jsonify({"user_id": user_id, 'user_with_code': user_with_code})
    else:
        return jsonify({"user_id": None, 'user_with_code': None})

