from __main__ import app, render_template

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
    data['deneme']  = "deneme"
    data['header']  = render_template('klasik/header/header.html', data = data)
    data['menu']    = render_template('klasik/menu/menu.html', data = data)
    data['content'] = render_template('klasik/content/user/user_list.html', data = data)
    data['footer']  = render_template('klasik/footer/footer.html', data = data)
    return render_template('klasik/index.html', data = data)

@app.route('/v_user/user_detay/<userId>')
def v_user_detay(userId):
    data = dict()
    data['deneme']  = "deneme"
    data['header']  = render_template('klasik/header/header.html', data = data)
    data['menu']    = render_template('klasik/menu/menu.html', data = data)
    data['content'] = render_template('klasik/content/user/user_detay.html', data = data)
    data['footer']  = render_template('klasik/footer/footer.html', data = data)
    return render_template('klasik/index.html', data = data)


@app.route('/v_user/user_duzenle')
def v_user_duzenle():
    data = dict()
    data['deneme']  = "deneme"
    data['header']  = render_template('klasik/header/header.html', data = data)
    data['menu']    = render_template('klasik/menu/menu.html', data = data)
    data['content'] = render_template('klasik/content/user/user_duzenle.html', data = data)
    data['footer']  = render_template('klasik/footer/footer.html', data = data)
    return render_template('klasik/index.html', data = data)


@app.route('/v_user/user_ara')
def v_user_ara():
    data = dict()
    data['deneme']  = "deneme"
    data['header']  = render_template('klasik/header/header.html', data = data)
    data['menu']    = render_template('klasik/menu/menu.html', data = data)
    data['content'] = render_template('klasik/content/user/user_ara.html', data = data)
    data['footer']  = render_template('klasik/footer/footer.html', data = data)
    return render_template('klasik/index.html', data = data)



@app.route('/v_user/user_profil')
def v_user_profil():
    data = dict()
    data['deneme']  = "deneme"
    data['header']  = render_template('klasik/header/header.html', data = data)
    data['menu']    = render_template('klasik/menu/menu.html', data = data)
    data['content'] = render_template('klasik/content/user/user_profil.html', data = data)
    data['footer']  = render_template('klasik/footer/footer.html', data = data)
    return render_template('klasik/index.html', data = data)
