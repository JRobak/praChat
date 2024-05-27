from flask import Blueprint, request, jsonify
from models.query import check_session_by_number

session_ = Blueprint('session', __name__)


@session_.route('/check_session')
def check_session():
    session = check_session_by_number
    if session:
        return session
    else:
        return None

