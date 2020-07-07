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

      let codeigniter_durum  = await afs.isFile('application');
      if(!codeigniter_durum){
        console.log(clc.red("cd <proje_name>"));
      }else{
        let application_durum  = await afs.isFile('application');
        if(!application_durum){
          console.log(clc.red("php-cli -install <proje_name>"));
        }else{
          /* tablo daha önce oluşturulmuş mu ona bakalım */
          let model_durum  = await afs.isFile('application/models/'+table_name+'_model.php');
          //let model_durum  = false;
          if(model_durum){
            console.log(clc.red("tablo daha önce eklenmiş."));
          }else{
            /* her şey yolunda değişimleri yapabilirsin*/


            /* models */
            let taslak_model  = await afs.readFile(models + 'taslak_model.php');
            let taslak_modelD = await afs.replaceFile(taslak_model, 'taslak', table_name);
            taslak_modelD = await afs.replaceFile(taslak_modelD, 'Taslak', table_nameUF);

            let createTable = "";
            _.forEach(secJson,(value) => {
              createTable += "'"+value+"'=>array('type' =>'VARCHAR','constraint' => 255), \n";
            });

            taslak_modelD = await afs.replaceFile(taslak_modelD, '#createTable#', createTable);
            taslak_modelD = await afs.replaceFile(taslak_modelD, "'satir'", "//'satir'");
            await writeFile('application/models/'+table_name+'_model.php', taslak_modelD);

            /* controllers */
            let h_taslak  = await afs.readFile(controllers + 'h_taslak.php');
            let h_taslakD = await afs.replaceFile(h_taslak, 'taslak', table_name);
            h_taslakD = await afs.replaceFile(h_taslakD, 'Taslak', table_nameUF);
            await writeFile('application/controllers/h_'+table_name+'.php', h_taslakD);



            /* php ile ilgili değişkenleri buraya koyalım */
            let phpFormKontrol = [];
            _.forEach(secJson,(value) => {
              phpFormKontrol.push("\n array(\n \
                  'field'   => '"+value+"',\n \
                  'label'   => '"+value+"',\n \
                  'rules'   => 'trim|required|max_length[100]|min_length[4]'\n \
               )");
            });


            let phpPost = "";
              _.forEach(secJson,(value) => {
                phpPost += "$"+value+" = $this->input->post('"+value+"', TRUE); \n";
            });

            let phpData = "";
             _.forEach(secJson,(value) => {
               phpData += "$data['"+value+"'] = $"+value+"; \n";
             });


            let taslakC  = await afs.readFile(controllers + 'taslak.php');
            let taslakCD = await afs.replaceFile(taslakC, 'taslak', table_name);
            taslakCD = await afs.replaceFile(taslakCD, 'Taslak', table_nameUF);
            taslakCD = await afs.replaceFile(taslakCD, '#phpFormKontrol#', phpFormKontrol);
            taslakCD = await afs.replaceFile(taslakCD, '#phpPost#', phpPost);
            taslakCD = await afs.replaceFile(taslakCD, '#phpData#', phpData);
            taslakCD = await afs.replaceFile(taslakCD, "\\$data\\['satir'\\]", "//\$data\['satir'\]");
            taslakCD = await afs.replaceFile(taslakCD, "\\$satir = \\$this->input->post", "//\$satir = \$this->input->post");
            await writeFile('application/controllers/'+table_name+'.php', taslakCD);




            /* view kısmını oluşturalım  */
            let projeViews = "application/views/klasik/content/" + table_name;
            await afs.createPage(projeViews);


            /* anasayfa.php */
            let views_anasayfa  = await afs.readFile(viewsTaslakCopy + 'anasayfa.php');
            let views_anasayfaD = await afs.replaceFile(views_anasayfa, 'taslak', table_name);
            views_anasayfaD = await afs.replaceFile(views_anasayfaD, 'Taslak', table_nameUF);
            await writeFile(projeViews + '/anasayfa.php', views_anasayfaD);

            /* taslak_ara.php */
            let taslak_ara  = await afs.readFile(viewsTaslakCopy + 'taslak_ara.php');
            let taslak_araD = await afs.replaceFile(taslak_ara, 'taslak', table_name);
            taslak_araD = await afs.replaceFile(taslak_araD, 'Taslak', table_nameUF);
            await writeFile(projeViews + '/'+table_name+'_ara.php', taslak_araD);

            /* taslak_detay.php */
            let taslak_detay  = await afs.readFile(viewsTaslakCopy + 'taslak_detay.php');
            let taslak_detayD = await afs.replaceFile(taslak_detay, 'taslak', table_name);
            taslak_detayD = await afs.replaceFile(taslak_detayD, 'Taslak', table_nameUF);
            await writeFile(projeViews + '/'+table_name+'_detay.php', taslak_detayD);

            let dFormArr = "";
            _.forEach(secJson,(value) => {
              dFormArr += '<div class="form-group">\n \
                       <label>'+ value +'</label>\n \
                       <input type="text" class="form-control '+ value +'_inputTV" placeholder="'+ value +'" value="<?php print $'+table_name+'_info[\''+value+'\']; ?>">\n \
                     </div>\n\n';
            });

            let eFormArr = "";
             _.forEach(secJson,(value) => {
               eFormArr += '<div class="form-group">\n \
                       <label>'+ value +'</label>\n \
                       <input type="text" class="form-control '+ value +'_inputTV" placeholder="'+ value +'">\n \
                     </div>\n\n';
             });

            /* taslak_duzenle.php */
            let taslak_duzenle  = await afs.readFile(viewsTaslakCopy + 'taslak_duzenle.php');
            let taslak_duzenleD = await afs.replaceFile(taslak_duzenle, 'taslak', table_name);
            taslak_duzenleD = await afs.replaceFile(taslak_duzenleD, 'Taslak', table_nameUF);
            taslak_duzenleD = await afs.replaceFile(taslak_duzenleD, '#dFormArr#', dFormArr);
            await writeFile(projeViews + '/'+table_name+'_duzenle.php', taslak_duzenleD);

            /* taslak_kaydet.php */
            let taslak_kaydet  = await afs.readFile(viewsTaslakCopy + 'taslak_kaydet.php');
            let taslak_kaydetD = await afs.replaceFile(taslak_kaydet, 'taslak', table_name);
            taslak_kaydetD = await afs.replaceFile(taslak_kaydetD, 'Taslak', table_nameUF);
            taslak_kaydetD = await afs.replaceFile(taslak_kaydetD, '#eFormArr#', eFormArr);
            await writeFile(projeViews + '/'+table_name+'_kaydet.php', taslak_kaydetD);

            /* taslak_list.php */
            let taslak_list  = await afs.readFile(viewsTaslakCopy + 'taslak_list.php');
            let taslak_listD = await afs.replaceFile(taslak_list, 'taslak', table_name);
            taslak_listD = await afs.replaceFile(taslak_listD, 'Taslak', table_nameUF);
            await writeFile(projeViews + '/'+table_name+'_list.php', taslak_listD);


            let projeJs = "application/views/klasik/index/js/";

            /* javascript */
            let js_taslak  = await afs.readFile(js + 'script_taslak.js');
            let js_taslakD = await afs.replaceFile(js_taslak, 'taslak', table_name);
            js_taslakD = await afs.replaceFile(js_taslakD, 'Taslak', table_nameUF);


            let dFormAjaxVar = "";
            _.forEach(secJson,(value) => {
              dFormAjaxVar += "var "+value+" = $('."+value+"_inputTV').val().trim(); \n";
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
            let projeViewsHeader = "application/views/klasik/header/";



            let hMenuList = '<li class="page-item <?php print $s=="h_'+table_name+'"?"active":""; ?>">  \
                    <a class="page-link" href="<?php print ayar("site_url"); ?>index.php?s=h_'+table_name+'">'+table_name+'</a> \
                    </li> \n <!--headerList-->';


            let header_list  = await afs.readFile(projeViewsHeader + 'header.php');
            let header_listD = await afs.replaceFile(header_list, '<!--headerList-->', hMenuList);
            await writeFile(projeViewsHeader + 'header.php', header_listD);


          }
        }
      }

    } catch (e) {
      console.log('hata oldu: ', e);
    }
}


module.exports.create = asenkronAkis;
