const searchEl = document.querySelector('.search'); /*클래스가 search인거 찾는겨 */
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () { //이름이 없는 함슈
  // Logic 쓰는곳
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused'); //클래스 정보를 가지고 있는 객체에서 클래스 정보를 추가하겠당.
  searchInputEl.setAttribute('placeholder', '통합검색'); //그 속성에 들어갈 실제 값.
});

searchInputEl.addEventListener('blur', function () { // focus해제됏을때. ->blur
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});




const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () { //  _.throttle(함수, 시간);
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지 숨기기  (badgeEl.style.display = 'none';)
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {   // 0.6초에 걸쳐서 투명도가 점점 낮아졍
      opacity: 0,
      display: 'none' //안보이게하는거 말고 진짜로 없애는거임
    });

    // 버튼 보이기! id = to-top
    gsap.to(toTopEl, .2, {
      x: 0
    });

  } else {
    //배지 보이기  (badgeEl.style.display = 'block';)
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });

    // 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));

toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0 /*화면의 위치를 0픽셀지점으로 0.7동안에 옮겨주게따 */
  });
});



const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  //gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0.7s, 1.4s, 2.1s, 2.8s
    opacity: 1
  });
});


// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', //direction: 'horizontal' => 기본값이라 수평할거면 안써도됨.
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10,
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true, //반복재생, 첨이랑 끝이랑 또 이어지게
  autoplay: {
    delay: 5000 // 5초, 500은 0.5초
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호요소 선택자
    clickable: true // 사용자의 페이지 번호요소 제어가능 여부
  },
  navigation: { // 요소 선택할 수 있오
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container', {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  // autoplay: true,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});



const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false //숨겨져있니? 했는데 눈에보이니까 false임
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion //isHidePromotion이 false니까 반대값(!)은 true당
  //그로니까 클릭하면 true 값 들어가니까 숨겨지는거!
  if (isHidePromotion) {
    // 숨김 처리 !
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리 !
    promotionEl.classList.remove('hide');
  }
});



// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1, //무한반복
    yoyo: true, // 한번 진행되고 다시 돌아올 수 있게
    ease: Power1.easeInOut, // gsap easing 요요를 더 자연스럽게 만드러쥼
    delay: random(0, delay)
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);



const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ //{} -> 객체데이터
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8, // (뷰포트시작점 0, 끝점 1) 0.8뷰포트 지점에 걸리면 어떤요소가 트리거되는겨
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});



const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2022