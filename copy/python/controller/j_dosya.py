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
@app.route('/j_dosya/dosya_kaydet', methods=['POST', 'GET'])
def j_dosya_kaydet():
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
