const body = document.querySelector("body");
const IMG_NUM = 5; //랜덤하게 골라질 배경 사진 수
//const bgGuide = document.querySelector(".backgroundGuide");

function showImage(imgNum) { //이미지 출력 함수
  const image = new Image(); //image 객체 생성
  image.src = `images/${imgNum + 1}.jpg`; //이미지 객체의 이름 설정
  image.classList.add("bgImage"); //bgImage 클래스(from CSS) 추가
  body.appendChild(image); //body 아래에 image가 있도록 처리
}

function getRandomNum() { //난수 생성 함수
  const randNum = Math.floor(Math.random() * IMG_NUM); //math 모듈로 난수 생성 + 실수이므로 버림 처리, random() * n => 0~n 사이의 난수 생성
  return randNum;
}

function init() {
  const photoNum = getRandomNum();
  showImage(photoNum);
  /*
  bgGuide.innerText = `If you want to change background image,
  just refresh :^)`;
  */
  /*
  <div class="backgroundGuide">
  </div>
  */
  alert(`Welcome to my page!
If you want to change background image, just refresh :^)`)
}

init();

/* image.src = `images/${imgNum + 1}.jpg`; //이미지 객체의 이름 설정 - 이미지를 폴더로 묶었을 때*/
