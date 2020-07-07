const fs = require('fs');
const _  = require('lodash');
const afs = require('../afs.js');
const slash = require('slash');

/* bu uygulamanın yüklü olduğu dizin */
let dir = __dirname;
if(process.env.OS == "Windows_NT"){dir = slash(dir);}
dir = dir.replace("/create", "");


// async/await
async function asenkronAkis(proje_name){
    try {
      //proje_name => hepsi_kucuk

      /* baş harfi Büyük*/
      const proje_nameUF = _.upperFirst(proje_name);

      /* proje daha önce oluşturulmuşmu ana bakalım */
      let proje_durum  = await afs.isFile(proje_name);
      if(proje_durum){
        console.log("Proje daha önce oluşturulmuş başka bir isim bulmalısınız.");
      }else{

        /* burada projelerin tamamı kopyalandı */
        await afs.copy_all_file(dir, 'codeigniter', proje_name);

        /* databese ismini değiştirelim */
        let projeConfig = proje_name + "/application/config/";
        let projeHelper = proje_name + "/application/helpers/";



        let db  = await afs.readFile(projeConfig + 'database.php');
        let dbD = await afs.replaceFile(db, 'taslak', proje_name);
        await writeFile(projeConfig + 'database.php', dbD);

        let helper  = await afs.readFile(projeHelper + 'ayar_helper.php');
        let helperD = await afs.replaceFile(helper, 'taslak', proje_name);
        await writeFile(projeHelper + 'ayar_helper.php', helperD);

      }




    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = asenkronAkis;
