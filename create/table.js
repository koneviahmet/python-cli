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
      let deneme  = await afs.readFile('codeigniter/deneme.html');
      let denemeD = await afs.replaceFile(deneme, 'ol', table_name + ' oldu ');
      await writeFile('codeigniter/deneme.html', denemeD);
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
                  postSilme  += "\n        "+value+" = request.form['"+value+"']";
                });
                jTaslakD = await afs.replaceFile(jTaslakD, "satir=request.form\\['satir']", postSilme);

                var dataSilme = _.join(secJson,', ') //implode
                jTaslakD = await afs.replaceFile(jTaslakD, 'satir,', dataSilme + ',');


                let editDataSilme = "";
                _.forEach(secJson,(value) => {
                  editDataSilme  += "\n            "+table_name+"."+value+" = "+value;
                });
                jTaslakD = await afs.replaceFile(jTaslakD, table_name + '.satir=satir', editDataSilme);

              await writeFile('controller/j_'+table_name+'.py', jTaslakD);


              /***************** VTASLAK *********/
              let vTaslak  = await afs.readFile('controller/v_taslak.py');
              let vTaslakD = await afs.replaceFile(vTaslak, 'taslak', table_name);
                  vTaslakD = await afs.replaceFile(vTaslakD, 'Taslak', table_nameUF);

              await writeFile('controller/v_'+table_name+'.py', vTaslakD);


              /********* VIEWS *****************/
              let viewsTaslakCopy = 'templates/klasik/content/taslakCopy/'
              let projeViews      = "templates/klasik/content/" + table_name;
              await afs.createPage(projeViews);

              // anasayfa.html
              let views_anasayfa  = await afs.readFile(viewsTaslakCopy + 'anasayfa.html');
              let views_anasayfaD = await afs.replaceFile(views_anasayfa, 'taslak', table_name);
              views_anasayfaD = await afs.replaceFile(views_anasayfaD, 'Taslak', table_nameUF);
              await writeFile(projeViews + '/anasayfa.html', views_anasayfaD);

              // taslak_ara.html
              let taslak_ara  = await afs.readFile(viewsTaslakCopy + 'taslak_ara.html');
              let taslak_araD = await afs.replaceFile(taslak_ara, 'taslak', table_name);
              taslak_araD = await afs.replaceFile(taslak_araD, 'Taslak', table_nameUF);
              await writeFile(projeViews + '/'+table_name+'_ara.html', taslak_araD);

              // taslak_detay.html
              let taslak_detay  = await afs.readFile(viewsTaslakCopy + 'taslak_detay.html');
              let taslak_detayD = await afs.replaceFile(taslak_detay, 'taslak', table_name);
              taslak_detayD = await afs.replaceFile(taslak_detayD, 'Taslak', table_nameUF);


              let detayList = "";
              _.forEach(secJson,(value) => {
                detayList  += '<li>'+value+': {{data.'+table_name+'Info.'+value+'}}</li>';
              });
              taslak_detayD = await afs.replaceFile(taslak_detayD, '#detayList', detayList);
              await writeFile(projeViews + '/'+table_name+'_detay.html', taslak_detayD);

              let dFormArr = "";
              _.forEach(secJson,(value) => {
                dFormArr += '<div class="form-group">\n \
                         <label>'+ value +'</label>\n \
                         <input type="text" class="form-control '+ value +'_inputTV" placeholder="'+ value +'" value="{{data.'+ table_name +'Info.'+ value +'}}">\n \
                       </div>\n\n';
              });

              let eFormArr = "";
               _.forEach(secJson,(value) => {
                 eFormArr += '<div class="form-group">\n \
                         <label>'+ value +'</label>\n \
                         <input type="text" class="form-control '+ value +'_inputTV" placeholder="'+ value +'">\n \
                       </div>\n\n';
               });

              // taslak_duzenle.html
              let taslak_duzenle  = await afs.readFile(viewsTaslakCopy + 'taslak_duzenle.html');
              let taslak_duzenleD = await afs.replaceFile(taslak_duzenle, 'taslak', table_name);
              taslak_duzenleD = await afs.replaceFile(taslak_duzenleD, 'Taslak', table_nameUF);
              taslak_duzenleD = await afs.replaceFile(taslak_duzenleD, '#dFormArr#', dFormArr);
              await writeFile(projeViews + '/'+table_name+'_duzenle.html', taslak_duzenleD);

              // taslak_kaydet.html
              let taslak_kaydet  = await afs.readFile(viewsTaslakCopy + 'taslak_kaydet.html');
              let taslak_kaydetD = await afs.replaceFile(taslak_kaydet, 'taslak', table_name);
              taslak_kaydetD = await afs.replaceFile(taslak_kaydetD, 'Taslak', table_nameUF);
              taslak_kaydetD = await afs.replaceFile(taslak_kaydetD, '#eFormArr#', eFormArr);
              await writeFile(projeViews + '/'+table_name+'_kaydet.html', taslak_kaydetD);

              // taslak_list.html
              let taslak_list  = await afs.readFile(viewsTaslakCopy + 'taslak_list.html');
              let taslak_listD = await afs.replaceFile(taslak_list, 'taslak', table_name);
              taslak_listD = await afs.replaceFile(taslak_listD, 'Taslak', table_nameUF);
              await writeFile(projeViews + '/'+table_name+'_list.html', taslak_listD);



              /********* Model *****************/
              let modelTaslak  = await afs.readFile('model/taslak.py');
              let modelTaslakD = await afs.replaceFile(modelTaslak, 'taslak', table_name);
                  modelTaslakD = await afs.replaceFile(modelTaslakD, 'Taslak', table_nameUF);

                  let postModel = "";
                  _.forEach(secJson,(value) => {
                    postModel  += "\n    "+value+"        = db.Column(db.String(255))";
                  });



                  modelTaslakD = await afs.replaceFile(modelTaslakD, 'satir=db.Column\\(db.String\\(255\\)\\)', postModel);
                  modelTaslakD = await afs.replaceFile(modelTaslakD, 'satir,', dataSilme + ',');


                  let postSelf = "";
                  _.forEach(secJson,(value) => {
                    postSelf  += "\n        self."+value+"     = " + value;
                  });

                  modelTaslakD = await afs.replaceFile(modelTaslakD, 'self.satir=satir', postSelf);

              await writeFile('model/'+table_name+'.py', modelTaslakD);


              /******** jScript ***************/
              let projeJs = "static/js/";

              let js_taslak  = await afs.readFile('static/js/script_taslak.js');
              let js_taslakD = await afs.replaceFile(js_taslak, 'taslak', table_name);
              js_taslakD = await afs.replaceFile(js_taslakD, 'Taslak', table_nameUF);


              let dFormAjaxVar = "";
              _.forEach(secJson,(value) => {
                dFormAjaxVar += "\tvar "+value+" = $('."+value+"_inputTV').val().trim(); \n";
              });
              js_taslakD = await afs.replaceFile(js_taslakD, '#dFormAjaxVar#', dFormAjaxVar);

              let dIfJoin = '!' + _.join(secJson,' || !');
              js_taslakD = await afs.replaceFile(js_taslakD, '#ifSutun#', dIfJoin);

              let eSatirSplitArr = [];
               _.forEach(secJson,(value) => {
                 eSatirSplitArr.push("'"+value+"':" + value);
               });
               js_taslakD = await afs.replaceFile(js_taslakD, '#eSatirSplitArr#', eSatirSplitArr);



              /* değişkenleri burada kaydedeceğiz */
              let js_kullanilan  = await afs.readFile(projeJs + 'script.js');
              let js_kullanilanD = await afs.replaceFile(js_kullanilan, '//jsEkle', '//jsEkle \n \n' + js_taslakD);
              await writeFile(projeJs + 'script.js', js_kullanilanD);


              /* header list yapalım */
              let projeViewsHeader = "templates/klasik/header/";

              let hMenuList = '<li class="page-item">  \
                      <a class="page-link" href="/v_'+table_name+'">'+table_name+'</a> \
                      </li> \n <!--headerList-->';


              let header_list  = await afs.readFile(projeViewsHeader + 'header.html');
              let header_listD = await afs.replaceFile(header_list, '<!--headerList-->', hMenuList);
              await writeFile(projeViewsHeader + 'header.html', header_listD)


          }
        }
      }

    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = asenkronAkis;
