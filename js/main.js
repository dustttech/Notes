document.addEventListener('DOMContentLoaded',function(){
    // nav link
    const navShow = document.querySelectorAll('.nav-link');
    const contentShow = document.querySelector('.main-content');
    //adnote overlay , folder overlay , edit overlay
    const addNoteOverLay = document.querySelector('.add-note-overlay');
    const editNoteOverLay = document.querySelector('.edit-note-overlay');
    const addFolderOverLay = document.querySelector('.add-folder-overlay');
    //show addnote, addfolder overlay , edit overlay
    const showAddNote = document.querySelector('.show-add-note');//note
    const showEdit = document.querySelector('.edit');//edit
    const showAddFolder = document.querySelector('.show-add-folder');//folder
    //close overlay
    const closeAddNote = document.querySelector('#close_add_note');//close add note overlay
    const closeEditNote = document.querySelector('#close_edit_note');//close edit note overlay
    const closeCreateFolder = document.querySelector('#close_create_folder');//close create folder
    // submit form 
    const addNote = document.querySelector('#add_note');
    const createFolder = document.querySelector('#create_folder');
    //form 
    const addNoteForm = document.querySelector('#add_note_form');
    const editNoteForm = document.querySelector('#edit_note_form');
    const createFolderForm = document.querySelector('#create_folder_form');

    // NOTE 
    const noteList = document.querySelector('.note-list');//note list
    const notes = document.querySelectorAll('.note');//notes
    // INTIAL
    window.addEventListener('load',function () {
        // CHECK IF THERE IS SUPPORT FOR LOCALSTORAGE

        if (window["localStorage"]) {
            // UPDATE DOM FROM LOCALSTORAGE
            updateNoteDOM();


            // ISOTOPE


            var notesArray = getNotesArray();
            const msgNote = document.querySelector('.note-list .message');

            if (notesArray.length > 0) {
                var isoNote = new Isotope( noteList, {
                    percentPosition: true,
                    itemSelector: ".note",
                    columnWidth: ".note",
                    masonry: {
                        gutter: '.gutter-sizer',
                        horizontalOrder: true
                    }
                });

            }

            // FORM
            //SUBMIT
            addNoteForm.addEventListener('submit', function () {
                createNote();
            })
            editNoteForm.addEventListener('submit', function () {
                editNote();
            })
            createFolderForm.addEventListener('submit', function () {
                createFolder();
            })
            // END FORM
        } else {displayMsg.innerHTML = "Sorry, your browser doesn't support LocalStorage :( ";}




        // NAV LINK 
        navShow.forEach(link => {
            link.addEventListener('click', function (e) {
                for (let i = 0; i < navShow.length; i++) {
                    navShow[i].classList.remove('active');
                }
                link.classList.add('active');
                var showWhat = e.target.getAttribute('data-show');
                if (showWhat == 'folder') {
                    contentShow.classList.remove('show-note');
                    contentShow.classList.add('show-folder');
    
                    showAddNote.classList.remove('show-add-active');
                    showAddFolder.classList.add('show-add-active');
                }   else {
                    contentShow.classList.remove('show-folder');
                    contentShow.classList.add('show-note');
    
                    showAddFolder.classList.remove('show-add-active');
                    showAddNote.classList.add('show-add-active');
                }
            })
        });
        // END NAV LINK

        // OVERLAY

        // SHOW 
        showAddNote.onclick = function () {
            addNoteOverLay.classList.add('show_overlay');
        }
        showAddFolder.onclick = function () {
            addFolderOverLay.classList.add('show_overlay');
        }
        // CLOSE
        closeAddNote.onclick = function () {
            addNoteOverLay.classList.remove('show_overlay');
        }
        closeCreateFolder.onclick = function () {
            addFolderOverLay.classList.remove('show_overlay');
        }
        // END OVERLAY


    });
    // END INITIAL


    function updateNoteDOM() {
        var notesArray = getNotesArray();
        for (let i = 0; i < notesArray.length; i++) {
            var key = notesArray[i];
            var value = JSON.parse(localStorage[key]);
            addNoteToDOM(key, value);
        }

    }
    
    function getNotesArray() {
        var notesArray = localStorage["notesArray"];

        if (!notesArray) {
            notesArray = [];
            localStorage.setItem("notesArray", JSON.stringify(notesArray));
        } else {
            notesArray = JSON.parse(notesArray);
        }
        return notesArray;
    }
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

        addNoteToDOM(key, noteObj);

        localStorage.setItem(key, JSON.stringify(noteObj));
        
        notesArray.push(key);
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
    }
    function addNoteToDOM(key, noteobj) {

        const noteList = document.querySelector('.note-list');

        var note = document.createElement('li');
        note.setAttribute("id", key);

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

        note.setAttribute('class', 'note');
        note_bottom.appendChild(note_date);
        note_bottom.appendChild(note_tag);
        note.appendChild(note_title);
        note.appendChild(note_content);
        note.appendChild(note_bottom);
        noteList.appendChild(note);
        // noteList.insertBefore(note, noteList.childNodes[1]);


        note.addEventListener('click',function () {
            const notes = document.querySelectorAll('.note');
            for (let i = 0; i < notes.length; i++) {
                notes[i].classList.remove('selected');
            }
            note.classList.toggle('selected');
            // edit.classList.add('active');
            // del.classList.add('active');
        });
    }
},false)
