from flask import request, jsonify, session
from app import create_app
from lib import db, migrate
from flask_socketio import SocketIO, send

app = create_app(db, migrate)
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('connect')
def test_connect():
    print('Client connected')

@socketio.on('login')
def login(username):
    session['username'] = username


@app.route('/messages', methods=['POST'])
def messages():
    data = request.get_json()
    if session.get('username') is None:
        socketio.emit('error', {'message': 'You need to login first', 'type': 'no-login'})
        return jsonify(data)
    print(data)
    socketio.emit('message', data)
    return jsonify(data)


@socketio.on('message')
def handle_message(message):
    print(f'message: {message} {session["username"]}')
    send(message, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True)
