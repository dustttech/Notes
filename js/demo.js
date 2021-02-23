document.addEventListener('DOMContentLoaded',function(){
    const edit = document.querySelector('.edit');
    // const close_btn = document.querySelector('.close');
    const del = document.querySelector('.delete');

    // NAVLINK 
    const navLink = document.querySelectorAll('.nav-link');
    const content = document.querySelector('.main-content');

    const showAddNote = document.querySelector('.show-add-note');
    const showAddFolder = document.querySelector('.show-add-folder');


    navLink.forEach(element => {
        element.addEventListener('click', function (e) {
            for (let i = 0; i < navLink.length; i++) {
                navLink[i].classList.remove('active');
            }
            element.classList.add('active');
            var showWhat = e.target.getAttribute('data-show');
            if (showWhat == 'folder') {
                content.classList.remove('show-note');
                content.classList.add('show-folder');

                showAddNote.classList.remove('show-add-active');
                showAddFolder.classList.add('show-add-active');
            }   else {
                content.classList.remove('show-folder');
                content.classList.add('show-note');

                showAddFolder.classList.remove('show-add-active');
                showAddNote.classList.add('show-add-active');
            }
        })

    });



    // ADD NOTE LOGIC

    // INITIAL
    window.addEventListener('load',function () {
        if (window["localStorage"]) {


            // SHOW ADD NOTE SECTION

            const showAddOverLay = document.querySelector('.add-note-overlay');

            showAddNote.addEventListener('click', function () {
                showAddOverLay.classList.add('show_overlay');
            })
            // BTN ADD NOTE FORM
            const addNote = document.querySelector('#add_note');

            const closeAddNote = document.querySelector('#close_add_note');

            const inputField = document.querySelectorAll('.input-field');
            inputField.forEach(input => {
                input.addEventListener('invalid', function name(e) {
                    e.preventDefault();
                })
            });


            addNote.addEventListener('click', function () {
                inputField.forEach(input => {
                    input.setAttribute('placeholder', 'Please enter this')
                }); 
            });

            const addNoteForm = document.querySelector('#add-note-form');
            addNoteForm.addEventListener('submit', function () {
                createNote();    
            })
                // CLOSE ADD NOTE
            closeAddNote.addEventListener('click',function() {
                showAddOverLay.classList.remove('show_overlay');
                inputField.forEach(input => {
                    input.removeAttribute('placeholder')
                });
            })
  

            const editForm = document.querySelector('#edit-note');
            editForm.addEventListener('submit', function () {
                updateEditNote();
            })
            // END ADD NOTE

            //EDIT NOTE SECTION

            // SHOW EDIT NOTE SECTION
            const editOverLay = document.querySelector('.edit-note-overlay');
            // SHOW EDIT NOTE
            edit.addEventListener('click', function () {
                editOverLay.classList.add('show_overlay');
                var key = document.querySelector('li.selected').getAttribute('id');
                addFormEdit(key);
            })
            const editNote = document.querySelector('#add_edit');
            editNote.addEventListener('click', function () {
                inputField.forEach(input => {
                    input.setAttribute('placeholder', 'Please enter this')
                });
            })
            // CLOSE EDIT NOTE
            const closeEditNote = document.querySelector('#close_edit_note');
            closeEditNote.addEventListener('click',function() {
                editOverLay.classList.remove('show_overlay');
            })
            // END EDIT NOTE

            // ADD FOLDER SECTION
            // SHOW ADD FOLDER SECTION
            const folderOverLay = document.querySelector('.add-folder-overlay');
            showAddFolder.addEventListener('click', function () {
                folderOverLay.classList.add('show_overlay');
            })
            const closeFolder = document.querySelector('#close_create_folder');
            closeFolder.addEventListener('click', function () {
                folderOverLay.classList.remove('show_overlay');
            })


            //END ADD FOLDER 

            // BTN DELETE NOTE
            del.onclick = removeNoteFromDOM;



            // UPDATE DOM
            // updateDOM();
            const noteList = document.querySelector('.note-list');
            var displayMsg = document.querySelector('.message > span');

            if (localStorage.length > 0) {
                updateDOM();
                noteList.removeChild(displayMsg.parentNode);
            } else {
                displayMsg.style.display = " ";
            }


            // ISOTOPE

            var iso = new Isotope( noteList, {
                percentPosition: true,
                itemSelector: ".note",
                columnWidth: ".note",
                masonry: {
                    gutter: '.gutter-sizer',
                    horizontalOrder: true
                }
            });
            iso.reloadItems()   




        } else {displayMsg.innerHTML = "Sorry, your browser doesn't support LocalStorage :( ";}
    })

    function updateDOM() {
        var notesArray = getNotesArray();
        for (let i = 0; i < notesArray.length; i++) {
            var key = notesArray[i];
            var value = JSON.parse(localStorage[key]);
            addNoteToDOM(key, value);
        }
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

        note.setAttribute('class', 'note _' + noteobj.tag);
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
            edit.classList.add('active');
            del.classList.add('active');
        });
    }

    
    
    function getNotesArray(array) {
        var notesArray = localStorage["notesArray"];

        if (!notesArray) {
            notesArray = [];
            localStorage.setItem("notesArray", JSON.stringify(notesArray));
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
        const noteList = document.querySelector('.note-list');
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
        location.reload();
    }

    // EDIT NOTE  FORM 
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


},false)