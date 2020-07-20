from __main__ import app, render_template, request, session, make_response
from library.lUser import lUser
from model.user import User


@app.route('/v_user')
def v_user():
    data = dict()
    data['deneme']  = "deneme"
    data['header']  = render_template('klasik/header/header.html', data = data)
    data['menu']    = render_template('klasik/menu/menu.html', data = data)
    data['content'] = render_template('klasik/content/user/anasayfa.html', data = data)
    data['footer']  = render_template('klasik/footer/footer.html', data = data)
    return render_template('klasik/index.html', data = data)



@app.route('/v_user/user_giris')
def v_user_giris():
    data = dict()
    data['deneme']  = "deneme"
    data['header']  = render_template('klasik/header/header.html', data = data)
    data['menu']    = render_template('klasik/menu/menu.html', data = data)
    data['content'] = render_template('klasik/content/user/user_giris.html', data = data)
    data['footer']  = render_template('klasik/footer/footer.html', data = data)
    return render_template('klasik/index.html', data = data)


@app.route('/v_user/user_kaydet')
def v_user_kaydet():
    data = dict()
    data['deneme']  = "deneme"
    data['header']  = render_template('klasik/header/header.html', data = data)
    data['menu']    = render_template('klasik/menu/menu.html', data = data)
    data['content'] = render_template('klasik/content/user/user_kaydet.html', data = data)
    data['footer']  = render_template('klasik/footer/footer.html', data = data)
    return render_template('klasik/index.html', data = data)



@app.route('/v_user/user_list')
def v_user_list():
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
        data['allUser'] = User.query.all()

        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/user/user_list.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)


@app.route('/v_user/user_detay/<userId>')
def v_user_detay(userId):
    data = dict()
    hataSayfa = '404.html'

    userInfo = User.query.filter_by(user_id=str(userId)).first()
    data['userInfo'] = userInfo
    if not userInfo:
        data['hata'] = "hata"
        hataSayfa    = '404.html'

    # hata denetimini yapalım
    if 'hata' in data:
        data['content'] = render_template('klasik/hata/' + hataSayfa, data = data)
    else:
        data['header']  = render_template('klasik/header/header.html', data = data)
        data['menu']    = render_template('klasik/menu/menu.html', data = data)
        data['content'] = render_template('klasik/content/user/user_detay.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)

    return render_template('klasik/index.html', data = data)


@app.route('/v_user/user_duzenle')
def v_user_duzenle():
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
        data['content'] = render_template('klasik/content/user/user_duzenle.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)

    return render_template('klasik/index.html', data = data)




@app.route('/v_user/user_ara')
def v_user_ara():
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
        data['content'] = render_template('klasik/content/user/user_ara.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)


    return render_template('klasik/index.html', data = data)



# üye profil sayfası
@app.route('/v_user/user_profil')
def v_user_profil():
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
        data['content'] = render_template('klasik/content/user/user_profil.html', data = data)
        data['footer']  = render_template('klasik/footer/footer.html', data = data)

    return render_template('klasik/index.html', data = data)


# üye çıkış sayfası
@app.route('/v_user/user_cikis')
def v_user_cikis():
    data = dict()

    data['content'] = render_template('klasik/hata/cikis.html', data = data)
    res = make_response(render_template('klasik/index.html', data = data))
    res.set_cookie('email', '', expires=0)
    res.set_cookie('sifre', '', expires=0)

    return res
