from __main__ import app, render_template, db, request


class Yetki:
    def __init__(self, yetki):
        self.yetki = yetki


    # yetkileri burada tanımlıyoruz
    def yetkili():
        yetkiliArr = dict()
        yetkiliArr[1] = "Yönetici";
        yetkiliArr[2] = "Yazar";
        yetkiliArr[3] = "Üye";

        return yetkiliArr


    def yetkiDenetle(self, yetkiKey):
        yetkiArr = dict()
        yetkiArr['dosyaYukle']  = "1-2-3"
        yetkiArr['denemeYetki'] = "3"


        if str(self.yetki) in yetkiArr[yetkiKey].split('-'):
            return True
        else:
            return False
