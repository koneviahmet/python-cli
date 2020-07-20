from __main__ import app, render_template, request, session, make_response
from library.lUser import lUser
from model.dosya import Dosya


@app.route('/v_dosya')
def v_dosya():
    data = dict()
    hataSayfa = '404.html'

    userInfo = lUser().userInfo()
    data['userInfo'] = userInfo
    if not userInfo:
        data['hata'] = "hata"
        hataSayfa    = 'yetki.html'

    # hata denetimini yapalım
    if 'hata' in data:
        data['content'] = render_template('klasik/hata/' + hataSayfa, data = data)
    else:

        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/dosya/anasayfa.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)



@app.route('/v_dosya/dosya_list')
def v_dosya_list():
    data = dict()
    hataSayfa = '404.html'

    userInfo = lUser().userInfo()
    data['userInfo'] = userInfo
    if not userInfo:
        data['hata'] = "hata"
        hataSayfa    = 'yetki.html'

    # hata denetimini yapalım
    if 'hata' in data:
        data['content'] = render_template('klasik/hata/' + hataSayfa, data = data)
    else:
        # hata yok demektri
        data['allDosya'] = Dosya.query.all()

        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/dosya/dosya_list.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)



@app.route('/v_dosya/dosya_detay/<dosyaId>')
def v_dosya_detay(dosyaId):
    data = dict()
    hataSayfa = '404.html'

    userInfo = lUser().userInfo()
    data['userInfo'] = userInfo
    if not userInfo:
        data['hata'] = "hata"
        hataSayfa    = 'yetki.html'

    # uye bilgilerini alalım
    dosyaInfo = Dosya.query.filter_by(dosya_id=str(dosyaId)).first()
    data['dosyaInfo'] = dosyaInfo
    if not dosyaInfo:
        data['hata'] = "dosya bulunamadı."

    # hata denetimini yapalım
    if 'hata' in data:
        data['content'] = render_template('klasik/hata/' + hataSayfa, data = data)
    else:
        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/dosya/dosya_detay.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)

    return render_template('klasik/index.html', data = data)




@app.route('/v_dosya/dosya_duzenle/<dosyaId>')
def v_dosya_duzenle(dosyaId):
    data = dict()
    hataSayfa = '404.html'

    userInfo = lUser().userInfo()
    data['userInfo'] = userInfo
    if not userInfo:
        data['hata'] = "hata"
        hataSayfa    = 'yetki.html'


    dosyaInfo = Dosya.query.filter_by(dosya_id=str(dosyaId)).first()
    data['dosyaInfo'] = dosyaInfo


    # hata denetimini yapalım
    if 'hata' in data:
        data['content'] = render_template('klasik/hata/' + hataSayfa, data = data)
    else:
        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/dosya/dosya_duzenle.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)




@app.route('/v_dosya/dosya_ara')
def v_dosya_ara():
    data = dict()
    hataSayfa = '404.html'

    userInfo = lUser().userInfo()
    data['userInfo'] = userInfo
    if not userInfo:
        data['hata'] = "hata"
        hataSayfa    = 'yetki.html'

    # hata denetimini yapalım
    if 'hata' in data:
        data['content'] = render_template('klasik/hata/' + hataSayfa, data = data)
    else:
        # hata yok demektri

        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/dosya/dosya_ara.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)



# üye profil sayfası
@app.route('/v_dosya/dosya_kaydet')
def v_dosya_kaydet():
    data = dict()
    hataSayfa = '404.html'

    userInfo = lUser().userInfo()
    data['userInfo'] = userInfo
    if not userInfo:
        data['hata'] = "hata"
        hataSayfa    = 'yetki.html'

    # hata denetimini yapalım
    if 'hata' in data:
        data['content'] = render_template('klasik/hata/' + hataSayfa, data = data)
    else:
        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/dosya/dosya_kaydet.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)
