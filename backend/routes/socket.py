from flask import request, jsonify

from lib.hash import verify_password
from models.query import checking_is_user_exist_by_email


def create_socket_routes(app, socketio):
    @socketio.on('connect')
    def handle_connect():
        print(f'Client connecte, sid: {request.sid}')

    @socketio.on('disconnect')
    def handle_disconnect():
        print(f'Client disconnected, sid: {request.sid}')

        return jsonify({"message": "Disconected"}), 401

    @socketio.on('login')
    def handle_login(data):
        email = data['email']
        password = data['password']

        if email.strip() == "" or password.strip() == "":
            return jsonify({"message": "Email and password are required"}), 400

        user = checking_is_user_exist_by_email(email)
        if user:
            if verify_password(password, user.password):
                # session_nr = create_session(email)
                # session['user_id'] = user.id
                return jsonify({
                    'message': 'Logged in successfully',
                    'user': {'username': user.username, 'email': user.email}
                }), 200
            else:
                return jsonify({'message': 'Wrong password', 'user': None}), 401
        else:
            return jsonify({'message': 'User with this email does not exist.', 'user': None}), 404
