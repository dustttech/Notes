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
    // submit form btn
    const addNote = document.querySelector('#add_note');
    const createfolder = document.querySelector('#create_folder');
    //form 
    const addNoteForm = document.querySelector('#add_note_form');
    const editNoteForm = document.querySelector('#edit_note_form');
    const createFolderForm = document.querySelector('#create_folder_form');

    // NOTE 
    const noteList = document.querySelector('.note-list');//note list
    const notes = document.querySelectorAll('.note');//notes

    // FOLDER
    const folderList = document.querySelector('.folder-list');
    // MESSAGE DISPLAY
    const msgNote = document.querySelector('.note-list .message');//note
    const msgFolder = document.querySelector('.folder-list .message');//folder

    // BTN 
    const del = document.querySelector('.delete');//delete
    const edit = document.querySelector('.edit'); // edit


    // INTIAL
    window.addEventListener('load',function () {
        // CHECK IF THERE IS SUPPORT FOR LOCALSTORAGE

        if (window["localStorage"]) {
            var notesArray = getNotesArray();
            var foldersArray = getFoldersArray();

            // UPDATE DOM FROM LOCALSTORAGE
            updateNoteDOM(notesArray, foldersArray);


            // ISOTOPE

            // DISPLAY MSG IF THERE IS 0 NOTE OR FOLDER
            if (notesArray.length > 0) {
                // Remove msg
                msgNote.style.display = "none";

                var isoNote = new Isotope( noteList, {
                    percentPosition: true,
                    itemSelector: ".note",
                    columnWidth: ".note",
                    masonry: {
                        gutter: '.gutter-sizer',
                        horizontalOrder: true
                    }
                });

            } else {
                msgNote.style.display = "";
            }
            if (foldersArray.length > 0) {
                msgFolder.style.display = "none";

                var isoFolder = new Isotope( folderList, {
                    percentPosition: true,
                    itemSelector: ".folder",
                    columnWidth: ".folder",
                    masonry: {
                        gutter: '.gutter-sizer',
                        horizontalOrder: true
                    }
                });
            } else {
                msgNote.style.display = "";
            }
            // FORM
            //SUBMIT
            addNoteForm.addEventListener('submit', function () {
                createNote();
            })
            editNoteForm.addEventListener('submit', function () {
                updateEditNote();
            })
            createFolderForm.addEventListener('submit', function () {
                createFolder(foldersArray);
            })
            createfolder.addEventListener('click', function () {
                console.log('thi sao');
            })
            // END FORM
        } else {msgNote.innerHTML = "Sorry, your browser doesn't support LocalStorage :( ";}




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
                    if (foldersArray.length > 0) {
                        isoFolder.layout();
                    }
                }   else {
                    contentShow.classList.remove('show-folder');
                    contentShow.classList.add('show-note');
    
                    showAddFolder.classList.remove('show-add-active');
                    showAddNote.classList.add('show-add-active');
                    if (notesArray.length > 0) {
                        isoNote.layout();
                    }
                }
            })
        });
        // END NAV LINK

        // OVERLAY

        // SHOW 
        showAddNote.onclick = function () {
            addNoteOverLay.classList.add('show_overlay');
        }
        showEdit.onclick = checkItem;
        showAddFolder.onclick = function () {
            addFolderOverLay.classList.add('show_overlay');
        }
        // CLOSE
        // CLOSE ADD NOTE
        closeAddNote.onclick = function () {
            addNoteOverLay.classList.remove('show_overlay');
        }
        // CLOSE EDIT NOTE 
        closeEditNote.onclick = function () {
            editNoteOverLay.classList.remove('show_overlay');
        }
        // CLOSE CREATE FOLDER
        closeCreateFolder.onclick = function () {
            addFolderOverLay.classList.remove('show_overlay');
        }
        // END OVERLAY


    });
    // END INITIAL

    function checkItem() {
        var selected = document.querySelector('.selected');
        var key = selected.getAttribute('id');
        if (selected.classList.contains('note')) {
            editNoteOverLay.classList.add('show_overlay');
            addFormEdit(key);
        } else if (selected.classList.contains('folder')) {
            console.log('show edit folder');
        }
    }
    function updateNoteDOM(notesArray, foldersArray) {
        for (let i = 0; i < notesArray.length; i++) {
            var key = notesArray[i];
            var value = JSON.parse(localStorage[key]);
            addNoteToDOM(key, value);
        }
        for (let i = 0; i < foldersArray.length; i++) {
            var obj = foldersArray[i];
            addFolderToDOM(obj);
        }

    }
    
    function getFoldersArray() {
        var foldersArray = localStorage["foldersArray"];

        if (!foldersArray) {
            foldersArray = [];
            localStorage.setItem("foldersArray", JSON.stringify(foldersArray));
        } else {
            foldersArray = JSON.parse(foldersArray);
        }
        return foldersArray;
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
            edit.classList.add('btn-active');
            del.classList.add('btn-active');
        });
    }

    function addFormEdit(key) {
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

    function createFolder(foldersArray) {
        const folderTitle = document.querySelector('#folder-title');
        
        var title = folderTitle.value;
        var folderObj = {
            "title" : title,
            "list" : []
        };
        foldersArray.push(folderObj);
        localStorage.setItem('foldersArray', JSON.stringify(foldersArray));
        addFolderToDOM(folderObj);
    }
    function addFolderToDOM(folderObj) {
        const folderList = document.querySelector('.folder-list');

        var folder = document.createElement('li');
        folder.setAttribute('id', folderObj.title);
        folder.setAttribute('class', 'folder');
        var img = document.createElement('img');
        img.setAttribute('src' , "img/folder.png");
        img.setAttribute('alt' , "Folder");
        var title = document.createElement('span');
        title.setAttribute('class', 'folder__title');
        title.innerHTML = folderObj.title;


        folder.appendChild(img);
        folder.appendChild(title);
        folderList.appendChild(folder);

        folder.addEventListener('click', function () {
            var folderName = folder.getAttribute('id');
            console.log('open ' + folderName);
        })

    }
},false)
