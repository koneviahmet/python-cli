from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

# app ayarları
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']        = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_ECHO']                = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# controlleri ekliyoruz bu kısım için controller sayfasını kullanıcağız
import controller.index
import controller.hakkinda
import controller.iletisim
import controller.ekle

# db oluşturuyoruz
db.create_all()
db.session.commit()

if __name__ == "__main__":
    app.run(port=5001)

