from __main__ import app, db, render_template, jsonify, request, make_response
from model.user import User
from library.lUser import lUser


# üye kaydet
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
            admin = User(adi, soyadi, email, sifre, 1, "1", "tarih")
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



# üye düzenle
@app.route('/j_user/user_duzenle', methods=['POST'])
def j_user_duzenle():
    data = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        adi     = request.form['adi']
        soyadi  = request.form['soyadi']
        email   = request.form['email']
        sifre   = request.form['sifre']
        user_id = request.form['user_id']

        userInfo = lUser().userInfo()
        if not userInfo:
            data['hata'] = "Bu sayfaya erişöe yetkiniz yok"


        # uye bilgilerini alalım
        secilenUserInfo = User.query.filter_by(user_id=str(user_id)).first()
        if not secilenUserInfo:
            data['hata'] = "Düzenlemek istediğiniz üyeye ulaşılamadı"

        #kendi profilini mi düzenliyor
        if userInfo.user_id != secilenUserInfo.user_id:
            data['hata'] = "Profil düzenleme yetkiniz yok"


    # data['hata'] = "doğru yerdesin" + str(userInfo.user_id)
    # hata olmuş mu ona bakalım
    if('hata' in data):
        return  jsonify(data)
    else:
        # hata yok demektir buradan devam edelim
        # veri katdetme işlemini hata yakalamak için try içinde yapalım
        try:
            user = User.query.filter_by(user_id=str(user_id)).first()
            user.adi        = adi
            user.soyadi     = soyadi
            user.email      = email
            user.sifre      = sifre
            db.session.commit()
            data['oldu'] = "yeni üye başarıyla eklendi sonId: "
        except Exception as e:
            print(e)
            data['hata'] = "Bilgileriniz kaydedilemedi."

        return jsonify(data)


# üye silme işlemi burada
@app.route('/j_user/user_sil', methods=['POST'])
def j_user_sil():
    data = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        user_id = request.form['user_id']

        userInfo = lUser().userInfo()
        if not userInfo:
            data['hata'] = "Bu sayfaya erişme yetkiniz yok"

        # uye bilgilerini alalım
        secilenUserInfo = User.query.filter_by(user_id=str(user_id)).first()
        if not secilenUserInfo:
            data['hata'] = "silmek istediğiniz üyeye ulaşılamadı"


        #silme ile ilgili güvenlik önlemleri bu kısımda alınması gerekir.


    # data['hata'] = "doğru yerdesin" + str(user_id)
    # hata olmuş mu ona bakalım
    if('hata' in data):
        return  jsonify(data)
    else:
        # hata yok demektir buradan devam edelim
        # veri katdetme işlemini hata yakalamak için try içinde yapalım
        try:
            User.query.filter_by(user_id=user_id).delete()
            db.session.commit()
            data['oldu'] = "Üye başarıyla silindi silId: " + str(user_id)
        except Exception as e:
            print(e)
            data['hata'] = "Sistemden kaynaklanan bir hatadan dolayı silme işlemi gerçekleştirilemedi."

        return jsonify(data)



@app.route('/j_user/user_ara', methods=['POST'])
def j_user_ara():
    data  = dict()
    sonuc = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        ara = request.form['user_ara']

        userInfo = lUser().userInfo()
        if not userInfo:
            data['hata'] = "Bu sayfaya erişme yetkiniz yok"



        #silme ile ilgili güvenlik önlemleri bu kısımda alınması gerekir.


    #data['hata'] = "doğru yerdesin" + ara
    # hata olmuş mu ona bakalım
    if('hata' in data):
        return  jsonify(data)
    else:
        # hata yok demektir buradan devam edelim
        # veri katdetme işlemini hata yakalamak için try içinde yapalım
        try:
            search = "%{}%".format(ara)
            users = User.query.filter(User.adi.like(search)).all()

            liste = []

            for usr in users:
                usrDict = dict()
                usrDict['adi']      = usr.adi
                usrDict['soyadi']   = usr.soyadi
                usrDict['user_id']  = usr.user_id
                liste.append(usrDict)


            data['ara_sonuc'] = liste
            print(liste)

            # data['ara_sonuc'] = jsonify(users)
        except Exception as e:
            print(e)
            data['hata'] = "Sistemden kaynaklanan bir hatadan dolayı arama işlemi gerçekleştirilemedi."

        return jsonify(data)




# üye giriş
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
