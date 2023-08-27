//---------------------------------------------
// 페이지 색깔 변경
//---------------------------------------------

const colors = ["black", "skyblue", "pink", "green", "yellow"];

function updateDotColors() {
    const paginationItems = document.querySelectorAll("#pagination li");
    paginationItems.forEach((item, index) => {
        if (index === page) {
            item.querySelector('i').style.color = colors[index];
        } else {
            item.querySelector('i').style.color = "#ddd";
        }
    });
}

//---------------------------------------------
// PC형 페이징 스크롤
//---------------------------------------------

const html = document.querySelector("html");
const header = document.querySelector("header"); // 헤더 선택자 추가
const lastPage = document.querySelectorAll("section").length;
const headerHeight = header.offsetHeight; // 헤더 높이 변수 추가

let page = 0; // 첫 페이지가 아닌 0으로 설정
let scrolling = false; // 스크롤 중 여부를 확인하기 위한 변수 추가

html.scrollTo({
    top: 0,
    behavior: 'smooth'
}); // 초기에 맨 위로 스크롤

function scrollToPosition(top) {
    scrolling = true; // 스크롤 중임을 표시

    html.scrollTo({
        top: top,
        behavior: 'smooth'
    });

    setTimeout(function() {
        scrolling = false; // 스크롤 종료 후 스크롤 중이 아님을 표시
    }, 300); // 스크롤이 완전히 끝나는 시간 (0.3초가 가장 적당)
}

window.addEventListener("wheel", function(e) {
    e.preventDefault();

    if (scrolling) return; // 스크롤 중인 경우 동작하지 않음

    if (e.deltaY > 0) {
        if (page === lastPage - 1) {
            e.preventDefault(); // 마지막 페이지 바로 아래로 스크롤 이벤트를 무효화
            return;
        }
        page++;
    } else if (e.deltaY < 0) {
        if (page === 0) {
            scrollToPosition(0);
            return;
        }
        page--;
    }

    let posTop = page * window.innerHeight; // 위치 계산
    scrollToPosition(posTop);

    // 페이지가 변경된 후 동그라미의 색깔 업데이트
    updateDotColors();
}, { passive: false });