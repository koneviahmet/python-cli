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
