from __main__ import app, render_template, request, session, make_response
from library.lUser import lUser
from model.taslak import Taslak


@app.route('/v_taslak')
def v_taslak():
    data = dict()
    data['deneme']  = "deneme"
    data['header']  = render_template('klasik/header/header.html', data = data)
    data['menu']    = render_template('klasik/menu/menu.html', data = data)
    data['content'] = render_template('klasik/content/taslak/anasayfa.html', data = data)
    data['footer']  = render_template('klasik/footer/footer.html', data = data)
    return render_template('klasik/index.html', data = data)



@app.route('/v_taslak/taslak_list')
def v_taslak_list():
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
        data['allTaslak'] = Taslak.query.all()

        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/taslak/taslak_list.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)



@app.route('/v_taslak/taslak_detay/<taslakId>')
def v_taslak_detay(taslakId):
    data = dict()
    hataSayfa = '404.html'

    userInfo = lUser().userInfo()
    data['userInfo'] = userInfo
    if not userInfo:
        data['hata'] = "hata"
        hataSayfa    = 'yetki.html'

    # uye bilgilerini alalım
    taslakInfo = Taslak.query.filter_by(taslak_id=str(taslakId)).first()
    data['taslakInfo'] = taslakInfo
    if not taslakInfo:
        data['hata'] = "taslak bulunamadı."

    # hata denetimini yapalım
    if 'hata' in data:
        data['content'] = render_template('klasik/hata/' + hataSayfa, data = data)
    else:
        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/taslak/taslak_detay.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)

    return render_template('klasik/index.html', data = data)




@app.route('/v_taslak/taslak_duzenle/<taslakId>')
def v_taslak_duzenle(taslakId):
    data = dict()
    hataSayfa = '404.html'

    userInfo = lUser().userInfo()
    data['userInfo'] = userInfo
    if not userInfo:
        data['hata'] = "hata"
        hataSayfa    = 'yetki.html'


    taslakInfo = Taslak.query.filter_by(taslak_id=str(taslakId)).first()
    data['taslakInfo'] = taslakInfo


    # hata denetimini yapalım
    if 'hata' in data:
        data['content'] = render_template('klasik/hata/' + hataSayfa, data = data)
    else:
        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/taslak/taslak_duzenle.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)




@app.route('/v_taslak/taslak_ara')
def v_taslak_ara():
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
        data['content'] = render_template('klasik/content/taslak/taslak_ara.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)



# üye profil sayfası
@app.route('/v_taslak/taslak_kaydet')
def v_taslak_kaydet():
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
        data['content'] = render_template('klasik/content/taslak/taslak_kaydet.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)
