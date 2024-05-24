from app import create_app
from lib import db, migrate

app = create_app(db, migrate)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
