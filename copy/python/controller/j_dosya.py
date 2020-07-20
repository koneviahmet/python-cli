from __main__ import app, db, render_template, jsonify, request, make_response, secure_filename
from model.dosya import Dosya
from library.lUser import lUser
import os


# uzantı izni ayarlayalım
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# taslak kaydet
@app.route('/j_dosya/dosya_upload', methods=['POST', 'GET'])
def j_dosya_upload():
    data = dict()


    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        file = request.files['file']

        userInfo = lUser().userInfo()
        if not userInfo:
            data['hata'] = "Bu sayfaya erişme yetkiniz yok"


    # hata olmuş mu ona bakalım
    # data['hata'] = "buradasın f: " + str(file)
    if('hata' in data):
        return  jsonify(data)
    else:
        if file.filename == '':
            data['hata'] = "dosya bulunamadı."
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            dosya_adi = app.config['UPLOAD_FIRST'] + filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], dosya_adi))
            data['oldu'] = "başarıyla eklendi.";

            # resmi db ye yükleyelim
            dosyaYukle = Dosya(dosya_adi, userInfo.user_id, 1, "tarih")
            db.session.add(dosyaYukle)
            db.session.commit()

        return jsonify(data)



# dosya kaydet
@app.route('/j_dosya/dosya_kaydet', methods=['POST'])
def j_dosya_kaydet():
    data = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        url     = request.form['url']

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
            dosya = Dosya(url, userInfo.user_id, 1, 'tarih')
            db.session.add(dosya)
            db.session.commit()
            data['oldu'] = "yeni dosya başarıyla eklendi sonId: "
        except Exception as e:
            print(e)
            data['hata'] = "Bilgileriniz kaydedilemedi."

        return jsonify(data)



# dosya düzenle
@app.route('/j_dosya/dosya_duzenle', methods=['POST', 'GET'])
def j_dosya_duzenle():
    data = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        url       = request.form['url']
        dosya_id   = request.form['dosya_id']

        userInfo = lUser().userInfo()
        if not userInfo:
            data['hata'] = "Bu sayfaya erişme yetkiniz yok"


        # uye bilgilerini alalım
        secilendosyaInfo = Dosya.query.filter_by(dosya_id=str(dosya_id)).first()
        if not secilendosyaInfo:
            data['hata'] = "Düzenlemek istediğiniz dosyaye ulaşılamadı"


        #kendi profilini mi düzenliyor
        if str(userInfo.user_id) != str(secilendosyaInfo.ekleyen_id):
            data['hata'] = "dosya düzenleme yetkiniz yok"



    # data['hata'] = "doğru yerdesin dosyaId: " + str(userInfo.user_id)
    # hata olmuş mu ona bakalım
    if('hata' in data):
        return  jsonify(data)
    else:
        # hata yok demektir buradan devam edelim
        # veri katdetme işlemini hata yakalamak için try içinde yapalım
        try:
            dosya = Dosya.query.filter_by(dosya_id=str(dosya_id)).first()
            dosya.url  = url
            db.session.commit()
            data['oldu'] = "dosya başarıyla düzenlendi"
        except Exception as e:
            data['hata'] = "Bilgileriniz düzenlenemedi."

        return jsonify(data)



# dosya silme işlemi burada
@app.route('/j_dosya/dosya_sil', methods=['POST'])
def j_dosya_sil():
    data = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        dosya_id = request.form['dosya_id']

        userInfo = lUser().userInfo()
        if not userInfo:
            data['hata'] = "Bu sayfaya erişme yetkiniz yok"


        # uye bilgilerini alalım
        secilendosyaInfo = Dosya.query.filter_by(dosya_id=str(dosya_id)).first()
        if not secilendosyaInfo:
            data['hata'] = "silmek istediğiniz dosyaye ulaşılamadı"


        #silme ile ilgili güvenlik önlemleri bu kısımda alınması gerekir.


    # data['hata'] = "doğru yerdesin" + str(dosya_id)
    # hata olmuş mu ona bakalım
    if('hata' in data):
        return  jsonify(data)
    else:
        # hata yok demektir buradan devam edelim
        # veri katdetme işlemini hata yakalamak için try içinde yapalım
        try:
            Dosya.query.filter_by(dosya_id=dosya_id).delete()
            db.session.commit()
            data['oldu'] = "dosya başarıyla silindi silId: " + str(dosya_id)
        except Exception as e:
            print(e)
            data['hata'] = "Sistemden kaynaklanan bir hatadan dolayı silme işlemi gerçekleştirilemedi."

        return jsonify(data)



@app.route('/j_dosya/dosya_ara', methods=['POST'])
def j_dosya_ara():
    data  = dict()
    sonuc = dict()

    if request.method != 'POST':
        data['hata'] = "post methodu göndermelisiniz."
    else:
        ara = request.form['dosya_ara']

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
            dosyas = Dosya.query.filter(Dosya.dosya_id.like(search)).all()

            liste = []

            for usr in dosyas:
                usrDict = dict()
                usrDict['dosya_id']  = usr.dosya_id
                liste.append(usrDict)

            data['ara_sonuc'] = liste


            # data['ara_sonuc'] = jsonify(dosyas)
        except Exception as e:
            print(e)
            data['hata'] = "Sistemden kaynaklanan bir hatadan dolayı arama işlemi gerçekleştirilemedi."

        return jsonify(data)
