from datetime import datetime
from flask import jsonify, request
from lib import db
from models.Models import Message
from models.query import check_session_by_number, get_user_by_user_id


def new_message(conversation_id, message, session, socketio):
    date_and_hour = datetime.now()

    new_message = Message(conversation_id=conversation_id, who_send_user_id=check_session_by_number(session),
                          message=message, date_and_hour=date_and_hour)
    db.session.add(new_message)
    db.session.commit()

    socketio.emit('message', {
        'user': get_user_by_user_id(check_session_by_number(session)).username,
        'conversation_id': conversation_id,
        'message': message,
        'date_and_hour': date_and_hour.isoformat()
    })
    return jsonify({'status': 'Message sent'}), 200


def create_message_routes(app, socketio):
    # @app.route('/new_message', methods=['POST'])

    @app.route('/get_messages', methods=['POST'])
    def get_messages():
        data = request.get_json()
        conversation_id = data['conversation_id']

        messages = Message.query.filter_by(conversation_id=conversation_id).all()
        messages_list = [{'user': get_user_by_user_id(msg.who_send_user_id).username, 'message': msg.message,
                          'date_and_hour': msg.date_and_hour.isoformat()} for msg in messages]

        return jsonify(messages_list), 200
