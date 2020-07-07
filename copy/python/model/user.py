from __main__ import app, db 


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    # rpr() şeklinde kulllanıyoruz. Burası rapor veya loglama için kullanılıyor
    # olmasada olur
    def __repr__(self):
        return '<User %r>' % self.username
