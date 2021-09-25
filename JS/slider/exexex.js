$(function() {
 
  var imgs = $('.imgBox img');
  var btns = $('.btnBox label');
  var toNext = $('.next img');
  var toPrev = $('.prev img');

  function setting(thing) {
    imgs.css({left : '-822px', opacity : 0});
    imgs.eq(thing).css({left : 0, opacity : 1});
    btns.css({backgroundColor : 'lightgray'});
    btns.eq(thing).css({backgroundColor : 'lightcoral'});
    btns.attr('g','0');
    btns.eq(thing).attr('g','1');
  }

  function init() {
    imgs.eq(0).css({left : 0});
    btns.eq(0).css({backgroundColor : 'lightcoral'});
  }
  
  init();
 


  var number = 0;
  setInterval(function() {
    for(let j = 0; j <= 3; j++){ 
      if(imgs.eq(j).attr('onImg') == 'Y'){  
        var flag = 1;  // 속성값에 Y가 있다는 의미
        break;
      }
      else 
        var flag = 0; // 속성값에 Y가 없다는 의미
    }
    if (flag == 0){ // Y가 있으면 setinterval을 if문을 안돌기 때문에 실행x
      for(let i = 0; i <= 3; i++){
        if(btns.eq(i).attr('g') == 1 ){ 
          number = i;     
          btns.attr('g','0');
        }
      }
      var next = (number + 1) % 4;
      btns.css({backgroundColor : 'lightgray'});
      imgs.css({left: '-822px', opacity : 0});
      imgs.eq(next).css({left: 0, opacity : 1});
      btns.eq(next).css({backgroundColor : 'lightcoral'});
      number = next;
    }
  },4000)
    
   
   

  btns.click(function() {
    var index = $(this).attr('data-index');
    setting(index);
  });
  
  imgs.mouseenter(function() { // 마우스가 이미지에 들어오면 속성값을 만듦
    $(this).attr('onImg','Y');
  });

  imgs.mouseleave(function() { // 마우스가 이미지에서 나가면 속성값을 만듦
    $(this).attr('onImg','N');
  });

  toNext.click(function() { // 화살표를 누르면 현재 이미지에서 다음이미지로 넘어가는 기능
    for(var i = 0; i <= 3; i++){
      if (imgs.eq(i).css('opacity') == 1){ // 현재 이미지의 기준을 opacity == 1인 것으로 잡음
        var next = (i + 1) % 4;
        setting(next);
      }
    }
  });

  toPrev.click(function() {
    for(var i = 0; i <= 3; i++){
      if (imgs.eq(i).css('opacity') == 1){
        var prev = (i - 1)% 4 ;
        if (prev < 0) prev = 3;
        setting(prev);
      }
    }
  });

});

