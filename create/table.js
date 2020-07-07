const fs    = require('fs');
const _     = require('lodash');
const afs   = require('../afs.js');
const slash = require('slash');
var clc     = require("cli-color");

/* bu uygulamanın yüklü olduğu dizin */
let dir = __dirname;
if(process.env.OS == "Windows_NT"){dir = slash(dir);}
dir = dir.replace("/create", "");

const dizin = process.env.PWD;

let models          = dir + '/copy/codeigniter/application/models/';
let controllers     = dir + '/copy/codeigniter/application/controllers/';
let views           = dir + '/copy/codeigniter/application/views/klasik/';
let viewsTaslakCopy = dir + '/copy/codeigniter/application/views/klasik/content/taslakCopy/';
let js              = dir + '/copy/codeigniter/application/views/klasik/index/js/';

// async/await
async function asenkronAkis(table_name, secJson){
    try {
      //table_name => hepsi_kucuk

      /* baş harfi Büyük*/
      const table_nameUF = _.upperFirst(table_name);



      /*
      _.join(str,'/') //implode
      _.forEach(secJson,(value) => {
        console.log(value);
      });
      */

      /*
      let deneme  = await afs.readFile('codeigniter/deneme.php');
      let denemeD = await afs.replaceFile(deneme, 'ol', table_name + ' oldu ');
      await writeFile('codeigniter/deneme.php', denemeD);
      */

      let codeigniter_durum  = await afs.isFile('controller');
      if(!codeigniter_durum){
        console.log(clc.red("cd <proje_name>"));
      }else{
        let application_durum  = await afs.isFile('controller');
        if(!application_durum){
          console.log(clc.red("php-cli -install <proje_name>"));
        }else{
          /* tablo daha önce oluşturulmuş mu ona bakalım */
          let model_durum  = await afs.isFile('model/'+table_name+'.py');
          //let model_durum  = false;
          if(model_durum){
            console.log(clc.red("tablo daha önce eklenmiş."));
          }else{
            /* her şey yolunda değişimleri yapabilirsin
            bundan sonrası al kopyala kaydet
            */
            



          }
        }
      }

    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = asenkronAkis;
