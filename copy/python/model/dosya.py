from __main__ import app, db


class Dosya(db.Model):
    dosya_id        = db.Column(db.Integer, primary_key=True)
    url             = db.Column(db.String(255))
    ekleyen_id      = db.Column(db.String(80))
    durum           = db.Column(db.String(120))
    tarih           = db.Column(db.String(120))


    def __init__(self, url, ekleyen_id, durum, tarih):
        self.url        = url
        self.ekleyen_id = ekleyen_id
        self.durum      = durum
        self.tarih      = tarih


    # rpr() şeklinde kulllanıyoruz. Burası rapor veya loglama için kullanılıyor
    # olmasada olur
    def __repr__(self):
        return '<taslak %r>' % self.url
