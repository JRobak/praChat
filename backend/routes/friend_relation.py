from flask import Blueprint, request, jsonify

friend_relation_ = Blueprint('friend_relation', __name__)


@friend_relation_.route('/get_every_friend', methods=['GET'])
def get_every_friend():
    pass


@friend_relation_.route('/get_every_invations', methods=['GET'])
def get_every_invations():
    pass


@friend_relation_.route('/add_new_friend', methods=['POST'])
def add_new_friend():
    pass
