  $('.taslak_kaydetBTN').click(function(){
    #dFormAjaxVar#

    loading(true);
    if(#ifSutun#){
      loading(false);
      hata('Ara formunu doldurmalısınız.');
    }else{

      if(!ajax_durum){
        ajax_durum = 1;

        ajax_al('taslak', 'taslak_kaydet', {#eSatirSplitArr#},

          function(sonuc){
            loading(false);
            ajax_durum = 0;
            hata(sonuc.hata.hata);
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
              hata(sonuc.hata.hata);
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
      #dFormAjaxVar#

      loading(true);
      if(#ifSutun#){
          loading(false);
          hata('Formunu doldurmalısınız.');
      }else{

        if(!ajax_durum){
          ajax_durum = 1;

          ajax_al('taslak', 'taslak_duzenle', {#eSatirSplitArr#,'taslak_id':taslak_id},
            function(sonuc){
              loading(false);
              ajax_durum = 0;
              hata(sonuc.hata.hata);
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
              hata(sonuc.hata.hata);
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
