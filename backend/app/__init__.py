from flask import Flask
from flask_cors import CORS
import os
from flask_jwt_extended import JWTManager

db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../databases/databases.db"))


def create_app(db, migrate):
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = "topSecret"
    jwt = JWTManager(app)

    db.init_app(app)
    migrate.init_app(app, db)

    from routes import login, sessions, friend_relation
    app.register_blueprint(login.login_)
    app.register_blueprint(sessions.session_)
    app.register_blueprint(friend_relation.friend_relation_)

    return app
