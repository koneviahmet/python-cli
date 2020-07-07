from __main__ import app, render_template, db
from model.user import User

@app.route('/<name>/<location>')
def ekle(name, location):
    admin = User(name, location)
    db.session.add(admin)
    db.session.commit()
    return '<h1>Added New User!</h1>'