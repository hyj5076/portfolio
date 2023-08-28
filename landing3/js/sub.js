document.addEventListener("DOMContentLoaded", function() {
  // 문서 준비 이벤트 시작

    //-----------------------------------------------
    // 창 높이 일정하게
    //-----------------------------------------------

    function setSectionHeight() {
        let windowHeight = window.innerHeight;
        let section = document.querySelector('#section00');
        section.style.height = windowHeight + 'px';
    }

    // 창 크기가 변경될 때 섹션 높이 업데이트
    window.addEventListener('resize', function() {
        setSectionHeight();
    });

    // 초기 로드 시 섹션 높이 설정
    setSectionHeight();
 

    //---------------------------------------------
    // input 입력칸 자동으로 넘김
    //---------------------------------------------

    let dongInput = document.getElementById('dongInput');
    let hoInput = document.getElementById('hoInput');
    let nameInput = document.getElementById('nameInput');

    // 동 -> 호
    if (dongInput) {
        dongInput.addEventListener('input', function() {
            if (this.value.length >= 4) {
                if (hoInput) {
                    hoInput.focus();
                }
            }
        });
    }

    // 호 -> 이름
    if (hoInput) {
        hoInput.addEventListener('input', function() {
            if (this.value.length >= 4) {
                if (nameInput) {
                    nameInput.focus();
                }
            }
        });
    }


    //---------------------------------------------
    // 휴대폰 하이픈 자동 넣기
    //---------------------------------------------
    let telInput = document.getElementById('telInput');

    if (telInput) {
        telInput.addEventListener("input", function() {
            // 숫자만 입력하기
            var val = this.value.replace(/[^0-9]/g, "");
    
            if (val.length > 3) {
                val = val.replace(/(\d{3})(\d{1,4})(\d{0,4})/, "$1-$2-$3");
            }
    
            this.value = val;
        });
    
        //하이픈 자동 넣기, backspace 사용하기
        telInput.addEventListener("keydown", function(event) {
            if (event.key === "Backspace") {
                var val = this.value.replace(/[^0-9]/g, "");
                var newVal = val.substring(0, val.length - 1);
    
                if (newVal.length > 3) {
                    newVal = newVal.replace(/(\d{3})(\d{1,4})(\d{0,4})/, "$1-$2-$3");
                }
    
                this.value = newVal;
                event.preventDefault();
            }
        });
    }
    


    //---------------------------------------------
    // 숫자만 입력 가능
    //---------------------------------------------

    if (dongInput) {
        dongInput.addEventListener("input", function() {
            this.value = this.value.replace(/[^0-9]/g, "");
        });
    }

    if (hoInput) {
        hoInput.addEventListener("input", function() {
            this.value = this.value.replace(/[^0-9]/g, "");
        });
    }


    //---------------------------------------------
    // .agree 클래스의 아이콘 클릭 이벤트 핸들러
    //---------------------------------------------

    let agreeIcon = document.querySelector('.agree i');
    let activePopup = document.querySelector('.active-popup');

    agreeIcon.addEventListener('click', function() {
      if (activePopup.style.maxHeight) {
          activePopup.style.maxHeight = null;
          activePopup.style.opacity = '0';
          agreeIcon.classList.remove('bi-caret-up-fill');
          agreeIcon.classList.add('bi-caret-down-fill');
      } else {
          activePopup.style.maxHeight = activePopup.scrollHeight + 'px';
          activePopup.style.opacity = '1';
          agreeIcon.classList.remove('bi-caret-down-fill');
          agreeIcon.classList.add('bi-caret-up-fill');
      }
    });

});


