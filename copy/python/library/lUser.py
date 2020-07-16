from __main__ import app, render_template, db, request
from model.user import User

class lUser:
    def __init__(self):
        pass

    def userInfo(self):
        email = request.cookies.get('email')
        sifre = request.cookies.get('sifre')
        userInfo = User.query.filter_by(email=str(email), sifre=str(sifre)).first()
        if not userInfo:
            return False
        else:
            return userInfo
