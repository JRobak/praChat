from flask import request, jsonify, session, g
from app import create_app
from lib import db, migrate
from flask_socketio import SocketIO, send

app = create_app(db, migrate)
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('connect')
def test_connect():
    pass
    # print('Client connected')


@socketio.on('login')
def login(data):
    user_id = data['id']
    g.user_id = user_id


@app.route('/messages', methods=['POST'])
def messages():
    data = request.get_json()
    if session.get('user_id') is None:
        socketio.emit('error', {'message': 'You need to login first', 'type': 'no-login'})
        return jsonify(data)
    socketio.emit('message', data)
    return jsonify(data)


@socketio.on('message')
def handle_message(message):
    print(f'message: {message} {session["username"]}')
    send(message, broadcast=True)


# @app.before_request
# def before_request():
#     print(g.user_id)


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True)
