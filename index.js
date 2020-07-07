#!/usr/bin/env node
var clc           = require("cli-color");
const { program } = require('commander');
const fs          = require('fs');
const _           = require('lodash');

const tprojeCreate = require('./create/proje.js');

program.version('0.0.1');

program
  .option('-install, --install', 'kurulumu başlat')
  .option('-table, --table', 'tablo ekle');
program.parse(process.argv);

if(program.install){
  /* instal */
  if(process.argv.length != 4){
    console.log(clc.red("> php-cli -install <proje_name>"));
  }else{


    const proje_name = process.argv[3];
    console.log(clc.green("[" + proje_name+"] proje oluşturuluyor"));

    tprojeCreate.create(proje_name);

  }

}else if(program.table){
  /* instal */
  if(process.argv.length != 4){
    console.log(clc.red("> php-cli -install <proje_name>"));
  }else{


    const table_name = process.argv[3];
    console.log(clc.green("[" + table_name+"] Tablo oluşturuluyor"));

    /* index tableye git gerekli seçme işlemlerini yaptır */
    const ins = require('./index-table');
    let sec = ins.create(table_name);

  }

}else{
  console.log(clc.red("> php-cli --help yazabilirsiniz.."));
}
