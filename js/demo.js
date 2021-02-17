document.addEventListener('DOMContentLoaded',function(){
    const notes = document.querySelectorAll('.note');
    const search = document.querySelector('.search');
    const edit = document.querySelector('.edit');
    const del = document.querySelector('.delete');
    const close_btn = document.querySelector('.close');

    const search_overLay = document.querySelector('.search-overlay');
    search.addEventListener('click',function () {
        search_overLay.classList.add('show_search');
        setTimeout(() => {
            close_btn.classList.add('show_close');
        }, 500);
    })
    close_btn.addEventListener('click',function () {
        close_btn.classList.remove('show_close');
        close_btn.classList.add('hide_close');
        function close_search() {
            close_btn.classList.remove('hide_close');
            search_overLay.classList.remove('show_search'); 
            close_btn.removeEventListener('animationend', close_search, true); 
            close_btn.removeEventListener('webkitAnimationEnd', close_search, true);
        }
        close_btn.addEventListener('animationend', close_search, true);
        close_btn.addEventListener('webkitAnimationEnd', close_search, true);
    })

    notes.forEach(note => {

        note.addEventListener('click',function () {
                for (let i = 0; i < notes.length; i++) {
                    notes[i].classList.remove('selected');
                }
                note.classList.add('selected');
                edit.classList.add('btn-active');
                del.classList.add('btn-active');
        })
    });
},false)