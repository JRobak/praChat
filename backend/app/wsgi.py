from flask import request, jsonify, session, g
from flask_socketio import SocketIO, send
from datetime import datetime
from app import create_app
from lib import db, migrate
from models.Models import Message
from models.query import check_session_by_number

app = create_app(db, migrate)
socketio = SocketIO(app, cors_allowed_origins="*")


@app.before_request
def before_request():
    g.user_id = session.get('user_id')


@socketio.on('login')
def login(data):
    user_id = data['id']
    session['user_id'] = user_id
    session.modified = True
    g.user_id = user_id


@app.route('/new_message', methods=['POST'])
def new_message(conversation_id, message, session):
    date_and_hour = datetime.now()

    new_message = Message(conversation_id=conversation_id, who_send_user_id=check_session_by_number(session), message=message, date_and_hour=date_and_hour)
    db.session.add(new_message)
    db.session.commit()

    socketio.emit('message', {
        'conversation_id': conversation_id,
        'message': message,
        'date_and_hour': date_and_hour.isoformat()
    })
    return jsonify({'status': 'Message sent'}), 200


@app.route('/get_messages', methods=['POST'])
def get_messages():
    data = request.get_json()
    conversation_id = data['conversation_id']

    messages = Message.query.filter_by(conversation_id=conversation_id).all()
    messages_list = [{'message': msg.message, 'date_and_hour': msg.date_and_hour.isoformat()} for msg in messages]

    return jsonify(messages_list), 200


@socketio.on('message')
def handle_message(message):
    print(f'message: {message}')
    new_message(message['currentConversationId'], message['text'], message['session'])
    send(message, broadcast=True)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True)
