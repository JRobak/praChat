from flask_socketio import send
from routes.message import new_message
from flask import request


def create_socket_routes(socketio):
    @socketio.on('login')
    def login(data):
        pass
        # user_id = data['id']
        # session['user_id'] = user_id
        # session.modified = True
        # g.user_id = user_id

    @socketio.on('connect')
    def connect():
        print(f'connect {request.sid}')

    @socketio.on('disconnect')
    def disconnect():
        print(f'disconnect {request.sid}')

    @socketio.on('message')
    def handle_message(message):
        print(f'message: {message}')
        print(f"sid: {request.sid}")
        new_message(message['currentConversationId'], message['text'], message['session'], socketio)
        send(message, broadcast=True)