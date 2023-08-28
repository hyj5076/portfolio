//---------------------------------------------
// 페이지 색깔 변경
//---------------------------------------------

const colors = ["#555555", "#76abe0", "#fcc9d2", "#8bc183", "#fdd495"];

// li와 아이콘 생성 해주기
function createListItemWithIcon() {
    const li = document.createElement('li');
    const icon = document.createElement('i');
    icon.className = "bi bi-circle-fill"; 
    li.appendChild(icon);
    return li;
}

function initializePaginationItems() {
    const paginationContainer = document.querySelector("#pagination");
    
    colors.forEach(() => {
        const newLi = createListItemWithIcon();
        paginationContainer.appendChild(newLi);
    });
}

// 만약 #pagenation에서 li i를 하드코딩해주었다면 이 부분만 필요함
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

// 페이지 로드 시 pagination items 초기화
document.addEventListener("DOMContentLoaded", () => {
    initializePaginationItems();
    updateDotColors();
    bindPaginationClicks();
});


//---------------------------------------------
// 페이징 버튼 누름
//---------------------------------------------

function bindPaginationClicks() {
    const paginationItems = document.querySelectorAll("#pagination li");

    paginationItems.forEach((item, index) => {
        item.addEventListener("click", function() {
            if (scrolling) return; // 스크롤 중인 경우 동작하지 않음

            page = index; // 누른 버튼의 인덱스를 현재 페이지로 설정

            let posTop = page * window.innerHeight; // 위치 계산
            scrollToPosition(posTop);

            // 페이지가 변경된 후 동그라미의 색깔 업데이트
            updateDotColors();
        });
    });
}


//---------------------------------------------
// PC형 페이징 스크롤: 마우스
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


//---------------------------------------------
// PC형 페이징 스크롤: 키보드
//---------------------------------------------

window.addEventListener("keydown", function(e) {
    // 방향키 위: "ArrowUp", 방향키 아래: "ArrowDown"
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault(); // 키보드의 기본 스크롤 효과를 막음

        if (scrolling) return; // 스크롤 중인 경우 동작하지 않음

        // 방향키 아래를 눌렀을 때
        if (e.key === "ArrowDown") {
            if (page === lastPage - 1) {
                return;
            }
            page++;
        }
        // 방향키 위를 눌렀을 때
        else if (e.key === "ArrowUp") {
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
    }
});


//---------------------------------------------
// 화살표 사라짐
//---------------------------------------------

const scrollElement = document.querySelector('.scroll');

window.addEventListener('scroll', () => {
    // 페이지가 일정량 이상 스크롤 되었을 때 fade out 효과 적용
    if (window.scrollY > 50) {  // 50px 이상 스크롤 되었을 때. 원하는 값을 설정하십시오.
        scrollElement.classList.add('fade-out');
    } else {
        scrollElement.classList.remove('fade-out');
    }
});