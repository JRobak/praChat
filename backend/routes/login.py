from flask import request, jsonify

from lib.hash import verify_password
from models.query import checking_is_user_exist_by_email, add_new_user


def create_login_route(app):
    @app.route('/login', methods=['POST'])
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
        return {'error': 'Bad request'}, 400

    @app.route('/register', methods=['POST'])
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
            # session = create_session(email)
            return jsonify({
                "message": "User registered successfully",
                "user": {"username": user.username, "email": user.email}
            }), 201

    @app.route('/logout')
    def logout():
        pass
