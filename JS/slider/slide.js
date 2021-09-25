class Myslider {
  constructor( className) {
    this.targetClassName = className;
    this.currentImage = 0;
    this.direction = "right";
    $("."+className).css({width : ($("."+className).find("li img").eq(0).width() * $("."+className).find("li").length)});
    $("."+className).find("li").css({
      float : 'left',
      listStyle: 'none'
    });
    $("."+className).before("<div></div>");
    $("."+className).prev().append( $("."+className));
    $("."+className).parent().css({
      width: $("."+className).find("li img").eq(0).width() + 'px',
      height: $("."+className).find("li img").eq(0).height() + 'px',
      overflow: "hidden"
    });
    var btn = '<div>';
    for( var i = 0; i <= $("."+className).find('li').length - 1; i++)
    {
      btn += '<button data-val=' + i +'>' +(i+1) +'</button>';
    }
    btn += '</div>';
    $("."+className).parent().after(btn);
    $("."+className).parent().next().find('button').click( (ev)=> {
      this.goTo($(ev.target).attr('data-val'));
     
    })
    this.setAuto();
    $("."+className).find('li img').mouseenter( ()=> {
      this.stopAuto();
       })
    $("."+className).find('li img').mouseleave(() => {
      this.setAuto();
    })

  }
  next() {
    
    if( this.currentImage < $("."+this.targetClassName).find('li').length - 1){
      this.currentImage++;
      $("."+this.targetClassName).parent().animate({
      "scrollLeft":  ($("."+this.targetClassName).find('li img').eq(0).width() * this.currentImage) + 'px'
    },300)
 
    
    }
  };

  goTo(n) {
    this.currentImage =  n;
    $("."+this.targetClassName).parent().animate({
      "scrollLeft":  ($("."+this.targetClassName).find('li img').eq(0).width() * this.currentImage) + 'px'
    })
  }
  prev() {
 
    if( this.currentImage > 0){
      this.currentImage--;
      $("."+this.targetClassName).parent().animate({
      "scrollLeft":  ($("."+this.targetClassName).find('li img').eq(0).width() * this.currentImage) + 'px'
    },300)
    
    
    }
  };
  setAuto() {
    this.timer = setInterval( () => {
      
      if( this.currentImage == $("."+this.targetClassName).find('li').length - 1)
        this.direction = "left";
      if( this.currentImage == 0)
        this.direction = 'right';
      if (this.direction == 'right')
        this.next();
        if (this.direction == 'left')
        this.prev();
    },5000)
  }

  stopAuto() {
    clearInterval(this.timer);
  }
  
}

var slide = new Myslider('slider');
var slide2 = new Myslider('slider2');
$(".prev").click(slide.prev.bind(slide));
$(".next").click(slide.next.bind(slide));



  
