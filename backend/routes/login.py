from flask import Blueprint

login_ = Blueprint('login', __name__)


@login_.route("/login", methods=['GET'])
def login():
    pass


@login_.route("/logout", methods=['GET'])
def logout():
    pass
