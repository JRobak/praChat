from flask import Flask
from flask_cors import CORS
import os

db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../databases/databases.db"))


def create_app(db, migrate):
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'test'

    db.init_app(app)
    migrate.init_app(app, db)

    from routes import login, sessions
    app.register_blueprint(login.login_)
    app.register_blueprint(sessions.session_)

    return app
