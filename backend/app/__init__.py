from flask import Flask
from flask_cors import CORS
import os

db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../databases/databases.db"))


def create_app(db, migrate):
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)

    from routes import login, sessions, friend_relation, conversation
    app.register_blueprint(login.login_)
    app.register_blueprint(sessions.session_)
    app.register_blueprint(friend_relation.friend_relation_)
    app.register_blueprint(conversation.conversation_)

    return app
