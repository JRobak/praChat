from flask import Blueprint, request, jsonify, session, g
from flask_jwt_extended import create_access_token

from models.query import checking_is_user_exist_by_email, add_new_user, create_session
from lib.hash import verify_password

login_ = Blueprint('login', __name__)


@login_.route("/login", methods=['POST'])
def login():
    if request.method == "POST":
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if email.strip() == "" or password.strip() == "":
            return jsonify({"message": "Email and password are required"}), 400

        user = checking_is_user_exist_by_email(email)
        if user:
            if verify_password(password, user.password):
                session_nr = create_session(email)
                access_token = create_access_token(identity=user.id)
                return jsonify({
                    'message': 'Logged in successfully',
                    'user': {'username': user.username, 'email': user.email},
                    'session': session_nr,
                    'access_token': access_token
                }), 200
            else:
                return jsonify({'message': 'Wrong password', 'user': None}), 401
        else:
            return jsonify({'message': 'User with this email does not exist.', 'user': None}), 404
    return {'error': 'Bad request'}, 400


@login_.route("/register", methods=['POST'])
def register():
    if request.method == "POST":
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if email.strip() == "" or username.strip() == "" or password.strip() == "":
            return jsonify({"message": "Fields cannot be empty"}), 400

        if checking_is_user_exist_by_email(email) is not None:
            return jsonify({"message": "User with this email exist"}), 409

        user = add_new_user(username, email, password)
        session = create_session(email)
        return jsonify({
            "message": "User registered successfully",
            "user": {"username": user.username, "email": user.email},
            "session": session
        }), 201


@login_.route("/logout", methods=['GET'])
def logout():
    pass
