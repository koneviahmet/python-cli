const fs = require('fs');
const _  = require('lodash');
var ncp = require('ncp').ncp;


module.exports.createPage = createPage = (page) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(page, { recursive: true }, (err) => {
      if(err){
        reject("2 - dosya oluşturma anında hata oldu");
      }else{
        resolve("2 - dosya oluşturma tamam");
      }
    });
  })
}


module.exports.copy_file = copy_file = (dir, page, where) => {
  return new Promise((resolve, reject) => {
    fs.copyFile(dir + '/copy/' + page, where, (err) => {
      if(err){
        reject("1 - kopyalama anında hata oldu");
      }else{
        resolve("1 - kopyalama tamam");
      }
    });
  });
}

module.exports.copy_all_file = copy_file = (dir, page, where) => {
  return new Promise((resolve, reject) => {

    ncp.limit = 16;
    ncp(dir + '/copy/' + page, where, function (err) {
     if (err) {
       console.log(dir + '/copy/' + page);
       reject("2 - kopyalama anında hata oldu");
     }

     resolve("1 - kopyalama tamam");
    });


  });
}


module.exports.readFile = readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function read(err, data) {
      if(err){
        reject("file okuma hatası");
      }else{
        resolve(data.toString());
      }
    });
  });
}




module.exports.isFile = isFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.access(file, (err) => {
      if(err){
        resolve(false);
        //reject("cd codeigniter");
      }else{
        resolve(true);
      }
    });
  });
}


module.exports.writeFile = writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if(err){
        reject("file okuma hatası");
      }else{
        resolve(data);
      }
    });
  });
}


module.exports.replaceFile = replaceFile = (data,bunu,bunla) => {
  return new Promise((resolve, reject) => {
      var res = _.replace(data, new RegExp(bunu,"g"), bunla);
      if(!res){
        reject("file okuma hatası");
      }else{
        resolve(res);
      }
  });
}


module.exports.createFile = createFile = (file, text) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(file, text, function (err) {
      if(err){
        reject("7 - file  ekleme anında hata oldu");
      }else{
        resolve("7 - file  ekleme tamam");
      }
    });
  });
}
