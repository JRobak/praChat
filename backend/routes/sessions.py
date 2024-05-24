from flask import Blueprint, request, jsonify

session_ = Blueprint('session', __name__)


@session_.route('/check_session')
def check_session():
    pass
