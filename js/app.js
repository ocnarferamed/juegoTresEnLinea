$(function(){
  arregloColumnas = [$(".col-1"),$(".col-2"),$(".col-3"),$(".col-4"),$(".col-5"),$(".col-6"),$(".col-7")];
  arregloImagenes = ["image/1.png","image/2.png","image/3.png","image/4.png"];
  var keyReinicio = false;
  var barroja = 0;
  var espera = 0;
  var reloj = 0;
  var min = 2;
  var seg = 0;
  var mov  = 0;
  var pTotal = 0;
  contador = 0;
  var eliminador = 0;
  var bv = busquedaVertical();
  var bh = busquedaHorizontal();
  $(window).on('load',cambiarColor($('.main-titulo')));
  $('.btn-reinicio').on('click', function(){
    if (keyReinicio == false) {
      barroja =  setInterval(function (){
        llenarTablero();
        contador++;
    if (contador ==7) {
        despdrop();
        };
      },600);
      reloj = setInterval(function(){
        cronometro();
      },1000);
        //iniciar timer
      //contar movimientos
      keyReinicio = true ;
      $('.btn-reinicio').text('Reiniciar');
    }else if(keyReinicio==true){
     location.reload();
     keyReinicio = false;
      }
    });


//...............................................................................
 function despdrop (){
   clearInterval(barroja);
   eliminador = setInterval(function(){
     eliminarCaramelos();
     if ((bv==0) && (bh==0))
      {
       clearInterval(eliminador);
       };
     },600);
 }



// funciones recursivas para animacion del titulo del juego.........................
function cambiarColor(elemento){
$(elemento).animate(
  {
    color:"yelow"
  },1000, function(){
    cambiarColor2(elemento)
    }
  )
}

function cambiarColor2(elemento){
$(elemento).animate(
  {
    color:"#DCFF0E"
  },1000, function(){
    cambiarColor(elemento)
    }
  )
}
//funcion que crea un numero aleatorio que se usa para llenar el tablero..........................
function generarAleatorio(){
  var x = parseInt(Math.random()*4);
  return x;
}

//llenado del tablero con caramelos aleatorios............................
function llenarTablero(){

  for (var i = 1; i < 8; i++) {
  $('.col-'+i).prepend("<img  class=caramelo src="+arregloImagenes[generarAleatorio()]+" />").css("justify-content", "flex-start");
    $(" div img  ").css("width", "96px");

  }

}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// vaciar el  tablero::::::::::::::::::::::::::::::::::::::::::::::::::::::;:::::::::::::::::::::::::::::::::::::::::::::::
function vaciarTablero(){
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j <7; j++) {

  arregloColumnas[i].html("");

    }
  }

}


//funciones para detectar 3 en linea...................
//buscqueda en eje horizontal:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function busquedaHorizontal(){
  var matchHorizontal=0;
  for(var j=1;j<8;j++)
  {
    for(var k=1;k<6;k++)
    {
      var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src")
      var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src")
      var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src")
      if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
      {
          $(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","caramelo marcado")
          $(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","caramelo marcado")
          $(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","caramelo marcado")
          matchHorizontal=1;
      }
    }
  }
  return matchHorizontal;
}
// funcion para busqueda eje vertical::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function busquedaVertical(){
  var matchVertical=0;
  for(var l=1;l<6;l++)
  {
    for(var k=1;k<8;k++)
    {
      var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src")
      var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src")
      var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src")
      if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null))
      {
          $(".col-"+k).children("img:nth-child("+(l)+")").attr("class","caramelo marcado")
          $(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","caramelo marcado")
          $(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class"," caramelo marcado")
          matchVertical=1;
        }
      }
  }
  return matchVertical;
}


// funcion para eliminar caramelos::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function eliminarCaramelos(){
  bv = busquedaVertical();
  bh = busquedaHorizontal();
  if ((bv==1) || (bh==1)) {
    $(".marcado").hide("pulsate",1500,function(){
     var pParcial= $(".marcado").length;
      $(".marcado").remove('img');
      pTotal = pTotal+pParcial;
      $("#score-text").html(pTotal) ;
    $("div[class^='col']").css("justify-content","flex-end");
    reponer();
  });

}

  $(".caramelo").draggable({
    containment: ".panel-tablero",
    revert: true,
    revertDuration: 0,
    snap: ".caramelo",
    snapMode: "inner",
    snapTolerance: 40,
    start: function(event, ui){
      mov=mov+1;
      $("#movimientos-text").html(mov)
    }
  });



}

//funcion para agregar caramelos despues de borrado:::::::::::::::::::::::::::::::::::::::::::
function reponer(){
  for (var i = 1; i < 8; i++) {
    if ($('.col-'+i).children().length < 7) {
      var dif = (7 - $('.col-'+i).children().length);
      for ( j=0; j<dif; j++){
      $('.col-'+i).prepend("<img  class=caramelo src="+arregloImagenes[generarAleatorio()]+" />");
      $(" div img  ").css("width", "96px");

      }
    }
  }
  $(".caramelo").droppable({
    drop: function (event, ui) {
      var dropped = ui.draggable;
      var droppedOn = this;
      espera=0;
      do{
        espera=dropped.swap($(droppedOn));
      }while(espera==0)
      bv = busquedaVertical();
      bh = busquedaHorizontal();
      if(bh==0 && bv==0)
      {
        dropped.swap($(droppedOn));
      }
      if(bh==1 || bv==1)
      {
        despdrop();
      }
      },
    });

}

//::::::::::::::::::::::::::::::::::OOOOOOOOOOOOOOOOOO::::::::::::::::OOOOOOOOOOOOOOOOOOOO:::::::::::::::::::OOOOOOOOOOOOOOOOO::::::::::::::::::OOOOOOOOOOOOOOOOOO
//funccion del cronometro ;;;;;;;;;;;;;;;;;;;;;;;;;;;::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function cronometro(){
  if ((min==2)&&(seg==0)){
    min = min-1;
    seg = 59;
  }
  if ( min ==1){
    if(seg!=0){
      seg = seg-1;
    }
    if(seg==0){
      min=min-1;
      seg=59;

    }
  }
  if( min == 0){
    seg = seg-1;
  }
  if(( min==0)&&(seg==0)){
    clearInterval(reloj);
    vaciarTablero();
    $('.panel-tablero').hide('fold','slow', function(){
      $('.panel-score').animate({
        width :"100%",
      },4000);
    });
    $('.time').hide();
  }
  $("#timer").html("0"+min+":"+seg);
}




//funcion de swap::::::::::::::
jQuery.fn.swap = function(b)
{
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};


});
