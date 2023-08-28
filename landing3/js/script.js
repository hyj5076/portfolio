//---------------------------------------------
// 무한 루프 : 콘텐츠가 흐르는 기능
//---------------------------------------------

// 롤링 배너 복제본 생성
const roller = document.querySelector('.roller');
roller.id = 'roller1';

const clone = roller.cloneNode(true);
clone.id = 'roller2';
document.querySelector('.roller-wrap').appendChild(clone); //부착

//원본, 복제본 배너 위치 지정
document.querySelector('#roller1').style.left = '0px';
document.querySelector('#roller2').style.left = document.querySelector('.roller > div').offsetWidth + 'px';

//클래스 할당
roller.classList.add('original');
clone.classList.add('clone');


//---------------------------------------------
// 전시회 날짜와 시간 설정
//---------------------------------------------

const exhibitionDate = new Date('2023-10-21T10:00:00');

// 업데이트 함수 정의
function updateCountdown() {
  // 현재 날짜와 시간 설정
  let currentDate = new Date();

  // 남은 시간 계산
  let timeDiff = exhibitionDate.getTime() - currentDate.getTime();

  // 남은 시간 변환
  let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000).toString().padStart(2, '0');

  // 결과 표시
  const countdownElement = document.getElementById('countdown');
  const daysElement = document.getElementById('days');
  countdownElement.textContent = hours + ':' + minutes + ':' + seconds;
  daysElement.textContent = days + '일';

  // 남은 시간이 없을 때 처리
  const str = document.getElementById('changeTxt');
  const removeTime = document.getElementById('removeTime');

  if (currentDate > exhibitionDate) {
      str.innerHTML = '감사합니다. 사전예약이 끝났습니다!';
      removeTime.style.display = 'none';
  }      
}

// 1초마다 업데이트
setInterval(updateCountdown, 1000);



//---------------------------------------------
// PC section02 참여품목 section04 참가혜택
//---------------------------------------------

const itemContainer = document.querySelector('#section02 .content');
const benefitContainer = document.querySelector('.benefit');

const moreButton02 = document.getElementById('moreButton02');
const closeButton02 = document.getElementById('closeButton02');

const closeButton04 = document.getElementById('closeButton04');
const moreButton04 = document.getElementById('moreButton04');

const applyFunction = function(container, n, moreButton, closeButton) {
    // 기본적으로 최대 n개의 콘텐츠만 보이도록 설정
    let contentItems;

    // 공통 함수로부터 contentItems 선택
    function selectContentItems() {
        if (container === itemContainer) {
            contentItems = container.querySelectorAll('.item > div');
        } else if (container === benefitContainer) {
            contentItems = container.children;
        }
    }

    // 초기 설정 및 클릭 이벤트 핸들러 등 적용 로직
    function initialize() {
          let initialContentCount = n;

          for (let i = 0; i < contentItems.length; i++) {
              if (i >= initialContentCount) {
                  contentItems[i].style.display = 'none';
              }
          }

          // 버튼 클릭 시 나머지 콘텐츠 보이기
          moreButton.addEventListener('click', function(event) {
              event.preventDefault();
              for (let i = initialContentCount; i < contentItems.length; i++) {
                  if (i < initialContentCount + n) {
                      contentItems[i].style.display = 'block';
                  } else {
                      break;
                  }
              }
              initialContentCount += n;

              if (initialContentCount >= contentItems.length) {
                  moreButton.style.display = 'none'; // 버튼 숨기기
                  closeButton.style.display = 'block'; // closeButton 보이기
              }
          });

          // closeButton 클릭 시 초기 상태로 돌아가기
          closeButton.addEventListener('click', function(event) {
              event.preventDefault();
              for (let i = 0; i < contentItems.length; i++) {
                  if (i >= initialContentCount) {
                      contentItems[i].style.display = 'none';
                  }
              }
              initialContentCount = n;
              for (let i = initialContentCount; i < contentItems.length; i++) {
                  contentItems[i].style.display = 'none';
              }
              moreButton.style.display = 'block'; // moreButton 보이기
              closeButton.style.display = 'none'; // closeButton 숨기기

              // 스크롤 위치 이동
              let section;
              if (container === itemContainer) {
                  section = document.getElementById('section02');
              } else if (container === benefitContainer) {
                  section = document.getElementById('section04');
              }
              section.scrollIntoView({ behavior: 'smooth' });
          });
      }

      // contentItems 선택 및 초기화
      selectContentItems();
      initialize();
}


// 화면 너비가 700px 이상인 경우에만 기능 적용
if (window.innerWidth >= 700) {
    // PC section02 참여품목
    applyFunction(itemContainer, 8, moreButton02, closeButton02);

    // PC section04 참가혜택
    applyFunction(benefitContainer, 6, moreButton04, closeButton04);
}



//---------------------------------------------
// 구글 맵
//---------------------------------------------

  const addressElement = document.querySelector('.place .txt span');

  // button 클릭 이벤트
  document.getElementById("goToMap").onclick = () => {
    // 주소 텍스트 가져오기
    let addressText = addressElement.innerText;

    // Google 지도 링크 생성
    let mapLink = 'https://www.google.co.kr/maps/?hl=ko&entry=ttu&q=' + encodeURIComponent(addressText);

    // 새 창에서 지도 링크 열기
    window.open(mapLink, '_blank');
  };


  
//---------------------------------------------
// 주소 복사 기능
//---------------------------------------------

  const myDiv = document.getElementById("myAddress");

  // button 클릭 이벤트
  document.getElementById("saveButton").onclick = () => {
    // div의 내용(textContent)을 복사한다.
    window.navigator.clipboard.writeText(myDiv.textContent).then(() => {
      // 복사가 완료되면 호출된다.
      alert("복사완료");
    });
  };


//---------------------------------------------
// 달력 띄우기
//---------------------------------------------

var calendarVisible = false;
var calendar;
var initialStartDate = document.getElementById('startDayInput').value;
var initialEndDate = document.getElementById('endDayInput').value;

// calendarIcon 클릭 시 달력 토글
document.getElementById('calendarIcon').addEventListener('click', function() {
  const startDateInput = document.getElementById('startDayInput');
  const endDateInput = document.getElementById('endDayInput');

  calendarVisible = !calendarVisible;

  if (calendarVisible) {
    calendar = flatpickr("#calendar", {
      mode: "range",
      defaultDate: [initialStartDate, initialEndDate], // 초기 value 값을 사용
      onClose: function(selectedDates, dateStr) {
        startDateInput.value = formatDate(selectedDates[0]) || "";
        endDateInput.value = formatDate(selectedDates[selectedDates.length - 1]) || "";
      }
    });

    calendar.open();
  } else {
    calendar.close();
  }
});

// value 값 업데이트
document.addEventListener("DOMContentLoaded", function() {
  const startDateInput = document.getElementById('startDayInput');
  const endDateInput = document.getElementById('endDayInput');

  // 초기 달력 설정
  calendar = flatpickr("#calendar", {
    mode: "range",
    defaultDate: [initialStartDate, initialEndDate], // 초기 value 값을 사용
    onClose: function(selectedDates, dateStr) {
      startDateInput.value = formatDate(selectedDates[0]) || "";
      endDateInput.value = formatDate(selectedDates[selectedDates.length - 1]) || "";
    }
  });
});

// 날짜 형식 지정 함수
function formatDate(date) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
}



//---------------------------------------------
// 문서 준비 이벤트 시작
//---------------------------------------------

document.addEventListener("DOMContentLoaded", function() {

    //---------------------------------------------
    // 창 크기가 변경될 때 섹션 높이 업데이트
    //---------------------------------------------
    function setSectionHeight() {
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let section = document.querySelector('.style');

      if (windowWidth >= 500) {
        section.style.height = '100vh';
      } else {
        section.style.height = windowHeight + 'px';
      }
    }

    // 창 크기가 변경될 때 섹션 높이 업데이트
    window.addEventListener('resize', function() {
      let windowWidth = window.innerWidth;
      if (windowWidth >= 500) {
        setSectionHeight();
      }
    });


    //---------------------------------------------
    // nav 슬라이드 효과
    //---------------------------------------------

    const navBtn = document.querySelector('.nav_btn');
    const nav = document.querySelector('nav');
    const icon = document.querySelector('.nav_btn i');
    const header = document.querySelector('header');

    header.classList.remove('active-scroll', 'active-click', 'active-white');

    let navVisible = false;

    nav.style.overflow = 'hidden';
    nav.style.height = '0';
    nav.style.transition = 'height 0.3s ease';


    //---------------------------------------------
    // 클릭했을 때 메뉴바 띄우기
    //---------------------------------------------

    navBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (!navVisible) {
            nav.style.display = 'block';
            nav.style.height = nav.scrollHeight + 'px';
            icon.classList.remove('bi-list');
            icon.classList.add('bi-x');
            header.classList.add('active-click', 'active-white');
        } else {
            nav.style.height = '0';
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
            header.classList.remove('active-click', 'active-white');
        }
        navVisible = !navVisible;
    });


    //---------------------------------------------
    // 스크롤 이벤트 핸들러
    //---------------------------------------------

    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop > 150) {
          header.classList.add('active-scroll');
        } else {
          header.classList.remove('active-scroll');
        }

        // 메뉴 슬라이드 숨기기
        if (navVisible) {
          nav.style.height = '0';
          icon.classList.remove('bi-x');
          icon.classList.add('bi-list');
          header.classList.remove('active-click', 'active-white');
          navVisible = false;
        }
    });



    //---------------------------------------------
    // 메뉴 링크 클릭 시 스크롤 이동
    //---------------------------------------------

    // 페이지 로드 시 섹션 높이 설정
    window.addEventListener('load', setSectionHeight);

    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });



    //---------------------------------------------
    // 마우스 스냅 스크롤 이벤트
    //---------------------------------------------

      //!--클래스를 다르게 주어야 먹힘--!
      function initializeSlider(contentId) {
        const content = document.querySelector(contentId);

        let isMouseDown = false; 
        let startX;
        let scrollLeft;

        content.addEventListener('mousedown', (e) => {
          isMouseDown = true;
          startX = e.pageX - content.offsetLeft;
          scrollLeft = content.scrollLeft;
        });

        content.addEventListener('mouseleave', () => {
          isMouseDown = false;
        });

        content.addEventListener('mouseup', () => {
          isMouseDown = false;
        });

        content.addEventListener('mousemove', (e) => {
          if (!isMouseDown) return;
          e.preventDefault();
          const x = e.pageX - content.offsetLeft;
          const walk = (x - startX) * 3;
          content.scrollLeft = scrollLeft - walk;
        });
      }

      initializeSlider('#section02 .content');
      initializeSlider('#section04 .content');

}); //문서준비이벤트 끝