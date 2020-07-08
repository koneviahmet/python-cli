from __main__ import app, db, render_template, jsonify, request
from model.user import User

@app.route('/j_user/user_kaydet', methods=['POST'])
def j_user():
    data = dict()


    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        adi     = request.form['adi']
        soyadi  = request.form['soyadi']
        email   = request.form['email']
        sifre   = request.form['sifre']

        data['oldu'] = str(adi) + " şahıslı kişi"

        try:
            admin = User(adi, soyadi, email, sifre, "[1]", "1", "tarih")
            db.session.add(admin)
            db.session.commit()
            data['oldu'] = "yeni üye başarıyla eklendi sonId: "
        except Exception as e:
            print(e)
            data['hata'] = "Bilgileriniz kaydedilemedi."


    # hata olmuş mu ona bakalım
    if('hata' in data):
        return  jsonify(data)
    else:
        # hata yok demektir buradan devam edelim
        return jsonify(data)
