document.addEventListener('DOMContentLoaded',function(){
    const edit = document.querySelector('.edit');
    const close_btn = document.querySelector('.close');
    const del = document.querySelector('.delete');

    // SEARCH
    const search = document.querySelector('.search');
    const search_overLay = document.querySelector('.search-overlay');
    search.addEventListener('click',function () {
        search_overLay.classList.add('show_overlay');
        setTimeout(() => {
            close_btn.classList.add('show_close');
        }, 500);
    })
    close_btn.addEventListener('click',function () {
        close_btn.classList.remove('show_close');
        close_btn.classList.add('hide_close');
        function close_search() {
            close_btn.classList.remove('hide_close');
            search_overLay.classList.remove('show_overlay'); 
            close_btn.removeEventListener('animationend', close_search, true); 
            close_btn.removeEventListener('webkitAnimationEnd', close_search, true);
        }
        close_btn.addEventListener('animationend', close_search, true);
        close_btn.addEventListener('webkitAnimationEnd', close_search, true);
    })
    // END SEARCH
    // NOTE 
    // notes.forEach(note => {

    // });
    // END NOTE




    const addNoteForm = document.querySelector('.add-note-overlay');

    // SHOW ADD NOTE SECTION
    const addNote = document.querySelector('#add-note');
    addNote.addEventListener('click', function () {
        addNoteForm.classList.add('show_overlay');
    })

    // CLOSE ADD NOTE
    const closeAddNote = document.querySelector('#close_add_form');

    closeAddNote.addEventListener('click',function() {
        addNoteForm.classList.remove('show_overlay');
    })

    //EDIT NOTE SECTION
    const editNoteForm = document.querySelector('.edit-note-overlay');
    // SHOW EDIT NOTE
    edit.addEventListener('click', function () {
        editNoteForm.classList.add('show_overlay');

        var key = document.querySelector('li.selected').getAttribute('id');
        addFormEdit(key);
    })
    const editNote = document.querySelector('#add_edit_form');
    editNote.addEventListener('click', function () {
        updateEditNote();
    })


    function addFormEdit(key) {
        // var selected = document.querySelector('li.selected');
        // var title = document.querySelector('li h1').innerHTML;
        // var content = document.querySelector('li p').innerHTML;
        // var time = document.querySelector('li span').innerHTML;
        // var tag = document.querySelector('li a').innerHTML;
        var note = JSON.parse(localStorage[key]);

        const noteTitle = document.querySelector('#edit-note-title');
        const noteContent = document.querySelector('#edit-note-content');
        const noteTag = document.querySelector('#edit-note-tag');
        
        noteTitle.value = note.title;
        noteContent.value = note.content;
        noteTag.value = note.tag;
    }
    function updateEditNote() {
        var key = document.querySelector('li.selected').getAttribute('id');
        var note = JSON.parse(localStorage[key]);

        const noteTitle = document.querySelector('#edit-note-title').value;
        const noteContent = document.querySelector('#edit-note-content').value;
        const noteTag = document.querySelector('#edit-note-tag').value;
        var dateValue = getCurrentTime();

        note.title = noteTitle;
        note.content = noteContent;
        note.date = dateValue + " (edited)";
        note.tag = noteTag;

        localStorage.setItem(key, JSON.stringify(note));
    }
    // CLOSE EDIT NOTE
    const closeEditNote = document.querySelector('#close_edit_form');
    closeEditNote.addEventListener('click',function() {
        editNoteForm.classList.remove('show_overlay');
    })
    // ADD NOTE LOGIC

    // INITIAL
    window.addEventListener('load',function () {
        var displayMsg = document.querySelector('.message > span');
        if (window["localStorage"]) {

            // BTN ADD NOTE FORM
            const addFormNote = document.querySelector('#add_form');

            addFormNote.onclick = createNote;
            // BTN DELETE NOTE
            del.onclick = removeNoteFromDOM;

            var notesArray = getNotesArray();
            for (let i = 0; i < notesArray.length; i++) {
                var key = notesArray[i];
                var value = JSON.parse(localStorage[key]);
                addNoteToDOM(key, value);
            }

            // ISOTOPE
            var elem = document.querySelector('.note-wrapper');
            var iso = new Isotope( elem, {
                percentPosition: true,
                itemSelector: ".note",
                masonry: {
                    gutter: '.gutter-sizer',
                    horizontalOrder: true
                }
            });


            if (localStorage.length > 0) {
                const noteList = document.querySelector('.note-wrapper');
                noteList.removeChild(displayMsg.parentNode);
            } else {
                displayMsg.style.display = " ";
            }
        } else {displayMsg.innerHTML = "Sorry, your browser doesn't support LocalStorage :( ";}
    })


    function getCurrentTime() {
        var d = new Date();
        var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
        var n = month[d.getMonth()];
        var s = n + " " + d.getDate() ;
        return s;
    }
    function addNoteToDOM(key, noteobj) {

        const noteList = document.querySelector('.note-wrapper');

        var note = document.createElement('li');
        note.setAttribute("id", key);
        note.setAttribute('class', 'note');

        var note_title = document.createElement('h1');
        note_title.setAttribute('class', 'note__title');


        var note_content = document.createElement('p');
        note_content.setAttribute('class', 'note__content');

        var note_bottom = document.createElement('div');
        note_bottom.setAttribute('class', 'note__bottom');


        var note_date = document.createElement('span');
        note_date.setAttribute('class', 'note__time');

        var note_tag = document.createElement('a');
        note_tag.setAttribute('class', 'note__tag');

        note_title.innerHTML = noteobj.title;
        note_content.innerHTML = noteobj.content;
        note_date.innerHTML = noteobj.date;
        note_tag.innerHTML = noteobj.tag;

        note_bottom.appendChild(note_date);
        note_bottom.appendChild(note_tag);
        note.appendChild(note_title);
        note.appendChild(note_content);
        note.appendChild(note_bottom);
        noteList.insertBefore(note, noteList.childNodes[1]);


        note.addEventListener('click',function () {
            const notes = document.querySelectorAll('.note');
            for (let i = 0; i < notes.length; i++) {
                notes[i].classList.remove('selected');
            }
            note.classList.toggle('selected');
            edit.classList.add('btn-active');
            del.classList.add('btn-active');
        });
    }



    function getNotesArray() {
        var notesArray = localStorage["notesArray"];

        if (!notesArray) {
            notesArray = [];
            localStorage.setItem('notesArray', JSON.stringify(notesArray));
        } else {
            notesArray = JSON.parse(notesArray);
        }
        return notesArray;
    }
    function createNote() {
        var notesArray = getNotesArray();
        // NOTE OBJ
        const noteTitle = document.querySelector('#note-title');
        const noteContent = document.querySelector('#note-content');
        const noteTag = document.querySelector('#note-tag');

        var titleValue = noteTitle.value;
        var contentValue = noteContent.value;
        var tagValue = noteTag.value;
        var dateValue = getCurrentTime();
        var noteObj = {
            "title": titleValue,
            "content": contentValue,
            "date": dateValue,
            "tag": tagValue
        };
        // KEY
        var d = new Date();
        var key = "note_" + d.getTime();
        localStorage.setItem(key, JSON.stringify(noteObj));
        
        notesArray.push(key);
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
        addNoteToDOM(key, noteObj);
    }
    function removeNoteFromDOM() {
        const noteList = document.querySelector('.note-wrapper');
        var selected = document.querySelector('li.selected');
        var key = selected.getAttribute('id');
        
        // REMOVE FROM LOCAL STORAGE
        var notesArray = getNotesArray();
        localStorage.removeItem(key);
        for (let i = 0; i < notesArray.length; i++) {
            if (key == notesArray[i]) {
                notesArray.splice(i,1);
            }
        }
        localStorage.setItem('notesArray', JSON.stringify(notesArray));

        // REMOVE NOTE FROM DOM
        noteList.removeChild(selected);
        edit.classList.toggle('btn-active');
        del.classList.toggle('btn-active');
    }




},false)