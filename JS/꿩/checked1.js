

var spans = document.querySelectorAll('span');
var imgs = document.querySelectorAll('img');
for(let i = 0; i<spans.length; i++) {
  spans[i].addEventListener( 'click' , function() {
    
    var a = imgs.length - 1;
    while (a != -1)
    {
      imgs[a].style.opacity = 0;
      a--;
    }
    imgs[i].style.opacity = 1;
  })
}