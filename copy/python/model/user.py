from __main__ import app, db


class User(db.Model):
    user_id         = db.Column(db.Integer, primary_key=True)
    adi             = db.Column(db.String(80))
    soyadi          = db.Column(db.String(80))
    email           = db.Column(db.String(120), unique=True)
    sifre           = db.Column(db.String(120))
    yetki           = db.Column(db.String(120))
    durum           = db.Column(db.String(120))
    tarih           = db.Column(db.String(120))


    def __init__(self, adi, soyadi, email, sifre, yetki, durum, tarih):
        self.adi     = adi
        self.soyadi  = soyadi
        self.email   = email
        self.sifre   = sifre
        self.yetki   = yetki
        self.durum   = durum
        self.tarih   = tarih

    # rpr() şeklinde kulllanıyoruz. Burası rapor veya loglama için kullanılıyor
    # olmasada olur
    def __repr__(self):
        return '<User %r>' % self.adi
