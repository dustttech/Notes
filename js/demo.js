document.addEventListener('DOMContentLoaded',function(){
    const edit = document.querySelector('.edit');
    // const close_btn = document.querySelector('.close');
    const del = document.querySelector('.delete');

    // NAVLINK 
    const navLink = document.querySelectorAll('.nav-link');
    const content = document.querySelector('.main-content');

    const addNote = document.querySelector('.add-note');
    const addFolder = document.querySelector('.add-folder');


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

                addNote.classList.remove('add-active');
                addFolder.classList.add('add-active');
            }   else {
                content.classList.remove('show-folder');
                content.classList.add('show-note');

                addFolder.classList.remove('add-active');
                addNote.classList.add('add-active');
            }
        })

    });
    const linkAll = document.querySelector('#link-all');
    const linkFolder = document.querySelector('#link-folder');



    // ADD NOTE LOGIC

    // INITIAL
    window.addEventListener('load',function () {
        var displayMsg = document.querySelector('.message > span');
        if (window["localStorage"]) {


            // SHOW ADD NOTE SECTION

            const showAddOverLay = document.querySelector('.add-note-overlay');

            addNote.addEventListener('click', function () {
                showAddOverLay.classList.add('show_overlay');
            })
            // BTN ADD NOTE FORM
            const addFormNote = document.querySelector('#add_form');
            const closeAddNote = document.querySelector('#close_add_form');
            const inputField = document.querySelectorAll('.input-field');
            inputField.forEach(input => {
                input.addEventListener('invalid', function name(e) {
                    e.preventDefault();
                })
            });
            addFormNote.addEventListener('click', function () {
                inputField.forEach(input => {
                    input.setAttribute('placeholder', 'Please enter this')
                });
            });
                // CLOSE ADD NOTE
            closeAddNote.addEventListener('click',function() {
                showAddOverLay.classList.remove('show_overlay');
                inputField.forEach(input => {
                    input.removeAttribute('placeholder')
                });
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
            const editNote = document.querySelector('#add_edit_form');
            editNote.addEventListener('click', function () {
                inputField.forEach(input => {
                    input.setAttribute('placeholder', 'Please enter this')
                });
            })
            // CLOSE EDIT NOTE
            const closeEditNote = document.querySelector('#close_edit_form');
            closeEditNote.addEventListener('click',function() {
                editOverLay.classList.remove('show_overlay');
            })
            // END EDIT NOTE


            // BTN DELETE NOTE
            del.onclick = removeNoteFromDOM;

            // CHECK FORM VALID
            const addForm = document.querySelector('#add-form');
            addForm.addEventListener('submit', function () {
                createNote();    
            })
            const editForm = document.querySelector('#edit-note');
            editForm.addEventListener('submit', function () {
                updateEditNote();
            })

            // UPDATE DOM
            updateDOM();
        


            // ISOTOPE
            const noteList = document.querySelector('.note-list');
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

                // FILTER  
                 
            // const filterTag = document.querySelector("#filter-tag");
            // filterTag.addEventListener('change', function () {
            //     var filterValue = this.value;
            //     filterValue = "._" + filterValue;
            //     if (filterValue == "._all") {
            //         iso.arrange({ filter: "*" });     
            //     } else {
            //         iso.arrange({ filter: filterValue });
            //     }
            // })

            if (localStorage.length > 0) {
                noteList.removeChild(displayMsg.parentNode);
            } else {
                displayMsg.style.display = " ";
            }
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

            //add select option
    
    // var arrOpt = [];

    // function addSelect(value, arr) {
    //     const filterTag = document.querySelector("#filter-tag");
    //     function checkOpt() {
    //         if (arrOpt.indexOf(value) === -1) {
    //             arrOpt.push(value);
    //             createOpt(filterTag, value);
    //         } 
    //     }
    //     return checkOpt;
    // }

    // function createOpt(select, value) {
    //     var option = document.createElement('option');
    //     option.setAttribute('value', value);
    //     option.text = value;
    //     select.add(option);
    // }


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