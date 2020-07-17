$(function(){
  var site_url = $('body').attr('data-sitehref');
  ajax_durum = 0;


  //jsEkle


  /********TASLAK********************/
  $('.taslak_kaydetBTN').click(function(){
    var satir = $('.satir_inputTV').val().trim();

    loading(true);
    if(!satir){
      loading(false);
      hata('Ara formunu doldurmalısınız.');
    }else{

      if(!ajax_durum){
        ajax_durum = 1;

        ajax_al('taslak', 'taslak_kaydet', {'satir':satir},

          function(sonuc){
            loading(false);
            ajax_durum = 0;
            hata(sonuc.hata);
          },
          function(sonuc){
            loading(false);
            ajax_durum = 0;
            oldu("Taslak başarıyla eklendi.");
        });


      }else{
        hata('Lütfen form isteğinin sonuc vermesini bekleyiniz');
      }
    }

   return false;
  });


  var sil_taslak_id;
    $('.taslak_sil_modal').click(function(){
      sil_taslak_id = $(this).data('id');
      $('#taslakSilModal').modal('show');
      return false;
    });



    $('.taslak_silBTN').click(function(){
      loading(true);
      if(!sil_taslak_id){
          loading(false);
          hata('Silme işlemi gerçekleştirilemedi.');
      }else{

        if(!ajax_durum){
          ajax_durum = 1;
          ajax_al('taslak', 'taslak_sil', {'taslak_id': sil_taslak_id},
            function(sonuc){
              loading(false);
              ajax_durum = 0;
              hata(sonuc.hata);
            },
            function(sonuc){
              loading(false);
              ajax_durum = 0;
              $('.taslakTr_'+sil_taslak_id).remove();
              $('#taslakSilModal').modal('hide');
              oldu("taslak başarıyla silindi.");
          });


        }else{
          hata('Lütfen form isteğinin sonuc vermesini bekleyiniz');
        }
      }

     return false;
    });



    $('.taslak_duzenleBTN').click(function(){
      var taslak_id  = $(this).data('id');
      var satir      = $('.satir_inputTV').val().trim();

      loading(true);
      if(!satir){
          loading(false);
          hata('Formunu doldurmalısınız.');
      }else{

        if(!ajax_durum){
          ajax_durum = 1;

          ajax_al('taslak', 'taslak_duzenle', {'satir':satir,'taslak_id':taslak_id},
            function(sonuc){
              loading(false);
              ajax_durum = 0;
              hata(sonuc.hata);
            },
            function(sonuc){
              loading(false);
              ajax_durum = 0;
              oldu("taslak başarıyla düzenlendi.");
          });


        }else{
          hata('Lütfen form isteğinin sonuc vermesini bekleyiniz');
        }
      }

     return false;
    });



    /* taslak arayalım */
    $('.taslak_araBTN').click(function(){
      var ara = $('.taslak_araTV').val().trim();
      $('.araSonuc').html('');
      loading(true);
      if(!ara){
          loading(false);
          hata('Ara formunu doldurmalısınız.');
      }else{

        if(!ajax_durum){
          ajax_durum = 1;

          ajax_al('taslak', 'taslak_ara', {'taslak_ara':ara},

            function(sonuc){
              loading(false);
              ajax_durum = 0;
              hata(sonuc.hata);
            },
            function(sonuc){
              loading(false);
              ajax_durum = 0;

              /* bulunan sonuçları bastıralım */
              $.each(sonuc.ara_sonuc, function(k,v){
                console.log(v.user_id);
                $('.araSonuc').append('<tr> \
                    <td> \
                      <i data-feather="link" style="max-width: 10px;"></i> \
                      <a href="#"> \
                        '+ v.taslak_id+' \
                      </a> \
                    </td> \
                </tr>');
              });


            });


        }else{
          hata('Lütfen form isteğinin sonuc vermesini bekleyiniz');
        }
      }

     return false;
    });




  /********TASLAK-Biter********************/
  $('.user_kaydetBTN').click(function(){
    var adi     = $('.adi_inputTV').val().trim();
    var soyadi  = $('.soyadi_inputTV').val().trim();
    var email   = $('.email_inputTV').val().trim();
    var sifre   = $('.sifre_inputTV').val().trim();

    loading(true);
    if(!adi || !soyadi || !email || !sifre){
      loading(false);
        hata('Ara formunu doldurmalısınız.');
    }else{

      if(!ajax_durum){
        ajax_durum = 1;
        ajax_al('j_user', 'user_kaydet', {'adi':adi,'soyadi':soyadi,'email':email,'sifre':sifre},

          function(sonuc){
            loading(false);
            ajax_durum = 0;
            hata(sonuc.hata);
          },
          function(sonuc){
            loading(false);
            ajax_durum = 0;
            oldu(sonuc.oldu);
        });


      }else{
        hata('Lütfen form isteğinin sonuc vermesini bekleyiniz');
      }
    }

   return false;
  });


  /*
  üye girişi yapalım
  */
  $('.user_girisBTN').click(function(){
    var email = $('.email_inputTV').val().trim();
    var sifre = $('.sifre_inputTV').val().trim();
    loading(true);
    if(!email || !sifre){
        loading(false);
        hata('Ara formunu doldurmalısınız.');
    }else{

      if(!ajax_durum){
        ajax_durum = 1;
        ajax_al('j_user', 'user_giris', {'email':email,'sifre':sifre},

          function(sonuc){
            loading(false);
            ajax_durum = 0;
            hata(sonuc.hata);
          },
          function(sonuc){
            loading(false);
            ajax_durum = 0;
            yonlen(site_url + 'v_user/user_profil');
            //oldu(sonuc.oldu);

        });


      }else{
        hata('Lütfen form isteğinin sonuc vermesini bekleyiniz');
      }
    }

   return false;
  });



  /* user silelim */
  var sil_user_id;
  $('.user_sil_modal').click(function(){
    sil_user_id = $(this).data('id');
    $('#userSilModal').modal('show');
    return false;
  });

  /* düzenleme işlemini yapalım */
  $('.user_duzenleBTN').click(function(){
  var user_id      = $(this).data('id');
  var adi = $('.adi_inputTV').val().trim();
  var soyadi = $('.soyadi_inputTV').val().trim();
  var email = $('.email_inputTV').val().trim();
  var sifre = $('.sifre_inputTV').val().trim();


  loading(true);
  if(!adi || !soyadi || !email || !sifre){
    loading(false);
      hata('Formunu doldurmalısınız.');
  }else{

    if(!ajax_durum){
      ajax_durum = 1;
      ajax_al('j_user', 'user_duzenle', {'adi':adi,'soyadi':soyadi,'email':email,'sifre':sifre,'user_id':user_id},
        function(sonuc){
          loading(false);
          ajax_durum = 0;
          hata(sonuc.hata);
        },
        function(sonuc){
          loading(false);
          ajax_durum = 0;
          oldu("User başarıyla düzenlendi.");
      });


    }else{
      hata('Lütfen form isteğinin sonuc vermesini bekleyiniz');
    }
  }

 return false;
});


  $('.user_silBTN').click(function(){
    loading(true);
    if(!sil_user_id){
        loading(false);
        hata('Silme işlemi gerçekleştirilemedi.');
    }else{

      if(!ajax_durum){
        ajax_durum = 1;

        ajax_al('j_user', 'user_sil', {'user_id': sil_user_id},

          function(sonuc){
            loading(false);
            ajax_durum = 0;
            hata(sonuc.hata);
            $('#userSilModal').modal('hide');
          },
          function(sonuc){
            loading(false);
            ajax_durum = 0;
            $('.userTr_' + sil_user_id).remove();
            $('#userSilModal').modal('hide');
            alert(sonuc.oldu);
        });


      }else{
        hata('Lütfen form isteğinin sonuc vermesini bekleyiniz');
      }
    }

   return false;
  });


  /* üye arayalım */
  $('.user_araBTN').click(function(){
    var ara = $('.user_araTV').val().trim();
    $('.araSonuc').html('');
    loading(true);
    if(!ara){
        loading(false);
        hata('Ara formunu doldurmalısınız.');
    }else{

      if(!ajax_durum){
        ajax_durum = 1;

        ajax_al('j_user', 'user_ara', {'user_ara':ara},

          function(sonuc){
            loading(false);
            ajax_durum = 0;
            hata(sonuc.hata);
          },
          function(sonuc){
            loading(false);
            ajax_durum = 0;

            /* bulunan sonuçları bastıralım */
            $.each(sonuc.ara_sonuc, function(k,v){
              console.log(v.user_id);
              $('.araSonuc').append('<tr> \
                  <td> \
                    <i data-feather="link" style="max-width: 10px;"></i> \
                    <a href="#"> \
                      '+ v.adi + ' ' + v.soyadi +' \
                    </a> \
                  </td> \
              </tr>');
            });


          });


      }else{
        hata('Lütfen form isteğinin sonuc vermesini bekleyiniz');
      }
    }

   return false;
  });



  //resim yukleme
  $(document).delegate('.j-res-editor-file', "change", function() {
      var type = $(this).data('type');
      var sinavid = $(this).data('sinavid');

      $(this).simpleUpload(site_url + "index.php?s=dosya&f=dosya_yukle&sinav_id="+sinavid, {
          start: function(file){
              $('.progressBar-content').show();
              $('#filename').html(file.name);
              $('#progress').html("");
              $('#progressBar').width(0);
          },
          progress: function(progress){
              //$('#progress').html("Yükleme: " + Math.round(progress) + "%");
              $('#progressBar').width(progress + "%");
          },
          success: function(data){
              $('.progressBar-content').hide();
              var sonuc = JSON.parse(data);
              if(sonuc.hata){
                hata(sonuc.hata);
                console.log(sonuc.arr);
              }else{
                oldu(sonuc.oldu);
              }
          },
          error: function(error){
              $('.progressBar-content').hide();
              hata('sistemnden kaynaklanan bir hata oldu');
          }

      });
    });


  /*
  loading
  */
  function loading(durum){
    //true ise yükleniyoru göster
    if(durum){
      $('.loading').show();
    }else{
      $('.loading').hide();
    }

  }

  function hata(metin){
    alert(metin);
  }

  function oldu(metin){
    alert(metin);
  }


  function ajax_al(s,f,data,hata,oldu){
    $.ajax({
      method: "POST",
      url: site_url + s + "/" + f,
      dataType: 'json',
      data: data,
      success: function(sonuc){
          if(sonuc.hata){
            hata(sonuc);
          }else{
            oldu(sonuc);
          }
      }
  });
  }


  function yonlen(url){
    $(location).attr('href', url);
  }




});
