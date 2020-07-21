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
          let model_durum  = await afs.isFile('modelx/'+table_name+'.py');
          //let model_durum  = false;
          if(model_durum){
            console.log(clc.red("tablo daha önce eklenmiş."));
          }else{
            /* her şey yolunda değişimleri yapabilirsin */


            let appPy  = await afs.readFile('app.py');
            let appPyD = await afs.replaceFile(appPy, '#controllerImport', 'import controller.j_'+table_name+'\nimport controller.v_'+table_name+'\n#controllerImport');
            await writeFile('app.py', appPyD);

            /***************** JTASLAK ***/
            let jTaslak  = await afs.readFile('controller/j_taslak.py');
            let jTaslakD = await afs.replaceFile(jTaslak, 'taslak', table_name);
                jTaslakD = await afs.replaceFile(jTaslakD, 'Taslak', table_nameUF);

                let postSilme = "";
                _.forEach(secJson,(value) => {
                  postSilme  += "\n\t\t"+value+" = request.form['"+value+"']";
                });
                jTaslakD = await afs.replaceFile(jTaslakD, "satir=request.form\\['satir']", postSilme);

                var dataSilme = _.join(secJson,', ') //implode
                jTaslakD = await afs.replaceFile(jTaslakD, 'satir,', dataSilme + ',');


                let editDataSilme = "";
                _.forEach(secJson,(value) => {
                  editDataSilme  += "\n\t\t\t"+table_name+"."+value+" = "+value;
                });
                jTaslakD = await afs.replaceFile(jTaslakD, table_name + '.satir=satir', editDataSilme);

              await writeFile('controller/j_'+table_name+'.py', jTaslakD);


              /***************** VTASLAK *********/
              let vTaslak  = await afs.readFile('controller/v_taslak.py');
              let vTaslakD = await afs.replaceFile(vTaslak, 'taslak', table_name);
                  vTaslakD = await afs.replaceFile(vTaslakD, 'Taslak', table_nameUF);

              await writeFile('controller/v_'+table_name+'.py', vTaslakD);


              /********* VIEWS *****************/
              await afs.createPage('templates/klasik/content/' + table_name);

              //anasayfa
              let viewAnaSayfa  = await afs.readFile('templates/klasik/content/taslak/anasayfa.html');
              let viewAnaSayfaD = await afs.replaceFile(viewAnaSayfa, 'taslak', table_name);
                  viewAnaSayfaD = await afs.replaceFile(viewAnaSayfaD, 'Taslak', table_nameUF);

              await writeFile('templates/klasik/content/'+table_name+'/anasayfa.html', viewAnaSayfaD);


              //ara
              let viewAra  = await afs.readFile('templates/klasik/content/taslak/taslak_ara.html');
              let viewAraD = await afs.replaceFile(viewAra, 'taslak', table_name);
                  viewAraD = await afs.replaceFile(viewAraD, 'Taslak', table_nameUF);

              await writeFile('templates/klasik/content/'+table_name+'/'+table_name+'_ara.html', viewAraD);

              //detay
              let viewDetay  = await afs.readFile('templates/klasik/content/taslak/taslak_detay.html');
              let viewDetayD = await afs.replaceFile(viewDetay, 'taslak', table_name);
                  viewDetayD = await afs.replaceFile(viewDetayD, 'Taslak', table_nameUF);

              await writeFile('templates/klasik/content/'+table_name+'/'+table_name+'_detay.html', viewDetayD);

              //duzenle
              let viewDuzenle  = await afs.readFile('templates/klasik/content/taslak/taslak_duzenle.html');
              let viewDuzenleD = await afs.replaceFile(viewDuzenle, 'taslak', table_name);
                  viewDuzenleD = await afs.replaceFile(viewDuzenleD, 'Taslak', table_nameUF);

              await writeFile('templates/klasik/content/'+table_name+'/'+table_name+'_duzenle.html', viewDuzenleD);


              //list
              let viewList  = await afs.readFile('templates/klasik/content/taslak/taslak_list.html');
              let viewListD = await afs.replaceFile(viewList, 'taslak', table_name);
                  viewListD = await afs.replaceFile(viewListD, 'Taslak', table_nameUF);

              await writeFile('templates/klasik/content/'+table_name+'/'+table_name+'_list.html', viewListD);



              /********* Model *****************/
              let modelTaslak  = await afs.readFile('model/taslak.py');
              let modelTaslakD = await afs.replaceFile(modelTaslak, 'taslak', table_name);
                  modelTaslakD = await afs.replaceFile(modelTaslakD, 'Taslak', table_nameUF);

                  let postModel = "";
                  _.forEach(secJson,(value) => {
                    postModel  += "\n\t"+value+"  \t\t= db.Column(db.String(255))";
                  });



                  modelTaslakD = await afs.replaceFile(modelTaslakD, 'satir=db.Column\\(db.String\\(255\\)\\)', postModel);
                  modelTaslakD = await afs.replaceFile(modelTaslakD, 'satir,', dataSilme + ',');


                  let postSelf = "";
                  _.forEach(secJson,(value) => {
                    postSelf  += "\n\t\tself."+value+" \t\t= " + value;
                  });

                  modelTaslakD = await afs.replaceFile(modelTaslakD, 'self.satir=satir', postSelf);

              await writeFile('model/'+table_name+'.py', modelTaslakD);

          }
        }
      }

    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = asenkronAkis;
