from flask import Flask, render_template, jsonify, request, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random

# app ayarları
app = Flask(__name__)
CORS(app)


app.secret_key = 'any random string'
app.config['SQLALCHEMY_DATABASE_URI']        = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_ECHO']                = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# controlleri ekliyoruz bu kısım için controller sayfasını kullanıcağız
import controller.index
import controller.v_user
import controller.j_user
import controller.hakkinda
import controller.iletisim
import controller.ekle



# db oluşturuyoruz
db.create_all()
db.session.commit()

if __name__ == "__main__":
    app.run(port=5001)
