import Swal from 'sweetalert2';
class CustomSwal {
  //icon = success, error, warning, info, question | title : "알럿창에 띄울 멘트" | timer:안넣으면 1500이 기본 값
  //ex)this.showCommonToast(Success, "성공", 1300);
    showCommonToast = (icon, title, timer, position) => {
        const commonToast = Swal.mixin({
            toast: true,
            position: position ? position : 'center-center' ,
            showConfirmButton: false,
            timer: timer ? timer : 1000,
            timerProgressBar: true,
            // didOpen: (toast) => {
            //     toast.addEventListener('mouseenter', Swal.stopTimer);
            //     toast.addEventListener('mouseleave', Swal.resumeTimer);
            // }
        });

        commonToast.fire({
            icon: icon,
            title: title,
            timerProgressBar: false
        });
    }
    //icon = success, error, warning, info, question | title : "알럿창에 띄울 제목" | text:알럿창에 띄울 멘트
    showCommonSwal = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            color: '#716add',
            background: '#FCFCFC', // 원하는 배경색으로 설정
            customClass: {
                container: 'custom-swal-container',
                popup: 'custom-swal-popup',
            },
        });
    }

    showCommonSwalYn = (title, text, icon, yesButtonText, callback) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: yesButtonText,
            cancelButtonText: '취소', 
        }).then((result) => {
            if (result.isConfirmed) {
                callback(true); // 확인 버튼을 눌렀을 때 콜백 함수를 호출하고 true를 전달
            }
            else {
                callback(false); // 취소 버튼을 눌렀을 때 콜백 함수를 호출하고 false를 전달
            }
        });
    }
}
export default new CustomSwal();