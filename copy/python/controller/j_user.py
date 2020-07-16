from __main__ import app, db, render_template, jsonify, request, make_response
from model.user import User

@app.route('/j_user/user_kaydet', methods=['POST'])
def j_user_kaydet():
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



@app.route('/j_user/user_giris', methods=['POST', 'GET'])
def j_user_giris():
    data = dict()
    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:

        email   = request.form['email']
        sifre   = request.form['sifre']

        try:
            userInfo = User.query.filter_by(email=str(email), sifre=str(sifre)).first()
            # userID = userInfo.user_id
            data['oldu']  = "giriş başarıyla gerçekleştirildi."
            data['email'] = userInfo.email
            data['sifre'] = userInfo.sifre
        except Exception as e:
            print(e)
            data['hata'] = "Sistemsel bir hatadan dolayı giriş yapılamadı."


    # data = make_response(data)
    # hata olmuş mu ona bakalım
    if('hata' in data):
        res =  make_response(jsonify(data))
        return res
    else:
        # hata yok demektir buradan devam edelim
        res =  make_response(jsonify(data))
        res.set_cookie('email', str(data['email']))
        res.set_cookie('sifre', str(data['sifre']))
        return res
