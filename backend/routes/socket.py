from flask import request, jsonify


def create_socket_routes(app, socketio):
    @socketio.on('connect')
    def handle_connect():
        print(f'Client connecte, sid: {request.sid}')

    @socketio.on('disconnect')
    def handle_disconnect():
        print(f'Client disconnected, sid: {request.sid}')

        return jsonify({"message": "Disconected"}), 401
