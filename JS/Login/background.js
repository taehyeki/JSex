const arrImg = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
];

const chosenImg = arrImg[Math.floor(Math.random()* arrImg.length)];

var img = document.createElement('img');
img.src = `../${chosenImg}`;

document.body.appendChild(img);