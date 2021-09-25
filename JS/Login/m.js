const m = [{
    dear : " 삶이 있는 한 희망은 있다",
    say : '키케로'
  },
  {
    dear : "산다는 것 그것은 치열한 전투이다",
    say : '로랑로랑'    
  },
  {
    dear : "하루에 3시간을 걸으면 7년 후에 지구를 한바퀴 돌 수 있다.",
    say : '사무엘 존슨'    
  },
  {
    dear : "언제나 현재에 집중할 수 있다면 행복할 것이다.",
    say : '파울로 코엘료'    
  },
  {
    dear : "피할수 없으면 즐겨라",
    say : '로버트 엘리엇'    
  },
  {
    dear : "너무 소심하고 까다롭게 자신의 행동을 고민하지 말라",
    say : '오펜 하우어'    
  },
  {
    dear : "한번의 실패와 영원한 실패를 혼동하지 마라",
    say : 'f 스콧'    
  },
  {
    dear : "일하는 시간과 노는시간을 뚜렷이 구분하라",
    say : '로랑로랑'    
  },
  {
    dear : "자부심을 가져라",
    say : '로랑로랑'    
  }];


  const dear = document.querySelector('.m1 span:first-child');
  const say = document.querySelector('.m1 span:last-child');

  const ran = Math.floor(Math.random() * m.length);
  dear.innerHTML = m[ran].dear;
  say.innerHTML = m[ran].say;