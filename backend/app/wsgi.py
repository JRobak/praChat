from flask import request, jsonify
from app import create_app
from lib import db, migrate
from flask_socketio import SocketIO, send

app = create_app(db, migrate)
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route('/messages', methods=['POST'])
def messages():
    data = request.get_json()
    print(data)
    socketio.emit('message', data)
    return jsonify(data)


@socketio.on('message')
def handle_message(message):
    print(f'message: {message}')
    send(message, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True)
