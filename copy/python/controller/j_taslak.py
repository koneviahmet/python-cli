from __main__ import app, db, render_template, jsonify, request, make_response
from model.taslak import Taslak
from library.lUser import lUser


# taslak kaydet
@app.route('/j_taslak/taslak_kaydet', methods=['POST'])
def j_taslak_kaydet():
    data = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        satir=request.form['satir']

        userInfo = lUser().userInfo()
        if not userInfo:
            data['hata'] = "Bu sayfaya erişme yetkiniz yok"


    # hata olmuş mu ona bakalım
    # data['hata'] = "buradasın"
    if('hata' in data):
        return  jsonify(data)
    else:
        # hata yok demektir buradan devam edelim
        try:
            taslak = Taslak(satir, userInfo.user_id, 1, 'tarih')
            db.session.add(taslak)
            db.session.commit()
            data['oldu'] = "yeni taslak başarıyla eklendi sonId: "
        except Exception as e:
            data['hata'] = "Bilgileriniz kaydedilemedi."

        return jsonify(data)



# taslak düzenle
@app.route('/j_taslak/taslak_duzenle', methods=['POST'])
def j_taslak_duzenle():
    data = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        satir=request.form['satir']
        taslak_id   = request.form['taslak_id']

        userInfo = lUser().userInfo()
        if not userInfo:
            data['hata'] = "Bu sayfaya erişme yetkiniz yok"


        # uye bilgilerini alalım
        secilenTaslakInfo = Taslak.query.filter_by(taslak_id=str(taslak_id)).first()
        if not secilenTaslakInfo:
            data['hata'] = "Düzenlemek istediğiniz taslakye ulaşılamadı"


        #kendi profilini mi düzenliyor
        if str(userInfo.user_id) != str(secilenTaslakInfo.ekleyen_id):
            data['hata'] = "taslak düzenleme yetkiniz yok"



    # data['hata'] = "doğru yerdesin taslakId: " + str(userInfo.user_id)
    # hata olmuş mu ona bakalım
    if('hata' in data):
        return  jsonify(data)
    else:
        # hata yok demektir buradan devam edelim
        # veri katdetme işlemini hata yakalamak için try içinde yapalım
        try:
            taslak = Taslak.query.filter_by(taslak_id=str(taslak_id)).first()
            taslak.satir=satir
            db.session.commit()
            data['oldu'] = "taslak başarıyla düzenlendi"
        except Exception as e:
            data['hata'] = "Bilgileriniz düzenlenemedi."

        return jsonify(data)



# taslak silme işlemi burada
@app.route('/j_taslak/taslak_sil', methods=['POST'])
def j_taslak_sil():
    data = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        taslak_id = request.form['taslak_id']

        userInfo = lUser().userInfo()
        if not userInfo:
            data['hata'] = "Bu sayfaya erişme yetkiniz yok"


        # uye bilgilerini alalım
        secilenTaslakInfo = Taslak.query.filter_by(taslak_id=str(taslak_id)).first()
        if not secilenTaslakInfo:
            data['hata'] = "silmek istediğiniz taslakye ulaşılamadı"


        #silme ile ilgili güvenlik önlemleri bu kısımda alınması gerekir.


    # data['hata'] = "doğru yerdesin" + str(taslak_id)
    # hata olmuş mu ona bakalım
    if('hata' in data):
        return  jsonify(data)
    else:
        # hata yok demektir buradan devam edelim
        # veri katdetme işlemini hata yakalamak için try içinde yapalım
        try:
            Taslak.query.filter_by(taslak_id=taslak_id).delete()
            db.session.commit()
            data['oldu'] = "taslak başarıyla silindi silId: " + str(taslak_id)
        except Exception as e:
            data['hata'] = "Sistemden kaynaklanan bir hatadan dolayı silme işlemi gerçekleştirilemedi."

        return jsonify(data)



@app.route('/j_taslak/taslak_ara', methods=['POST'])
def j_taslak_ara():
    data  = dict()
    sonuc = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        ara = request.form['taslak_ara']

        userInfo = lUser().userInfo()
        if not userInfo:
            data['hata'] = "Bu sayfaya erişöe yetkiniz yok"



        #silme ile ilgili güvenlik önlemleri bu kısımda alınması gerekir.


    # data['hata'] = "doğru yerdesin" + ara
    # hata olmuş mu ona bakalım
    if('hata' in data):
        return  jsonify(data)
    else:
        # hata yok demektir buradan devam edelim
        # veri katdetme işlemini hata yakalamak için try içinde yapalım
        try:
            search = "%{}%".format(ara)
            Taslaks = Taslak.query.filter(Taslak.taslak_id.like(search)).all()

            liste = []

            for usr in Taslaks:
                usrDict = dict()
                usrDict['taslak_id']  = usr.taslak_id
                liste.append(usrDict)

            data['ara_sonuc'] = liste


            # data['ara_sonuc'] = jsonify(Taslaks)
        except Exception as e:
            data['hata'] = "Sistemden kaynaklanan bir hatadan dolayı arama işlemi gerçekleştirilemedi."

        return jsonify(data)
