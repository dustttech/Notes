document.addEventListener('DOMContentLoaded',function(){
    // nav link
    const navShow = document.querySelectorAll('.nav-link');

    //adnote overlay , folder overlay , edit overlay, delete confirm overlay
    const addNoteOverLay = document.querySelector('.add-note-overlay');
    const editNoteOverLay = document.querySelector('.edit-note-overlay');
    const addFolderOverLay = document.querySelector('.add-folder-overlay');
    //delete confirm
    const confirmDelOverLay = document.querySelector('.confirm-delete-overlay');
    //show addnote, addfolder overlay , edit overlay
    const showAddNote = document.querySelector('.show-add-note');//note
    const showEdit = document.querySelector('.edit');//edit
    const showAddFolder = document.querySelector('.show-add-folder');//folder

    //close overlay
    const closeAddNote = document.querySelector('#close_add_note');//close add note overlay
    const closeEditNote = document.querySelector('#close_edit_note');//close edit note overlay
    const closeCreateFolder = document.querySelector('#close_create_folder');//close create folder
    const closeConfirmDel = document.querySelector('#close_confirm_delete');//close create folder
    // submit form btn
    const addNote = document.querySelector('#add_note');
    const editNote = document.querySelector('#add_edit');
    const createfolder = document.querySelector('#create_folder');
    //form 
    //add note
    const addNoteForm = document.querySelector('#add_note_form');
    const addNoteInput = document.querySelectorAll('#add_note_form .input-field');//input 

    //edit note
    const editNoteForm = document.querySelector('#edit_note_form');
    const editNoteInput = document.querySelectorAll('#edit_note_form .input-field');//input
    //folder
    const createFolderForm = document.querySelector('#create_folder_form');
    const createFolderInput = document.querySelector('#create_folder_form .input-field');//input
    //delete

    // NOTE 
    const noteList = document.querySelector('.note-list');//note list
    const notes = document.querySelectorAll('.note');//notes

    // FOLDER
    const folderList = document.querySelector('.folder-list');

    // FOLDER SECTION LIST
    const folderSectionList = document.querySelector('.folder-section__list');

    // MESSAGE DISPLAY
    const msg = document.querySelector('.list .message');//note
    const msgFolderSection = document.querySelector('.folder-section__list .message');//folder section

    // BTN 
    const showDel = document.querySelector('#show-delete');//confirm delete
    const del = document.querySelector('#delete'); // del
    const edit = document.querySelector('.edit'); // edit
    const loadNoteToFolderBtn = document.querySelector('#load_note_to_folder');//load note to folder (folder section)
    const AddNoteToFolderBtn = document.querySelector('#add_note_to_folder');//add note to folder (folder section)

    const returnToFolder = document.querySelector('.return_folder');

    // SHOW CONTENT 
    const contentShow = document.querySelector('.main-content');
    // LIST DISPLAY
    const contentListWrapper = document.querySelector('.list-wrapper');
    const contentList = document.querySelector('.list');

    //selected item
    // INTIAL
    window.addEventListener('load',function () {
        // CHECK IF THERE IS SUPPORT FOR LOCALSTORAGE
        var fragment = document.createDocumentFragment();
        if (window["localStorage"]) {
            var notesArray = getNotesArray();
            var foldersArray = getFoldersArray();

            var showWhat = contentShow.getAttribute('data-content');


            // UPDATE DOM FROM LOCALSTORAGE
            updateNoteDOM(notesArray, fragment);
            if (notesArray.length > 0) {
                msg.style.display = "none";
            }

            contentList.appendChild(fragment);

        
            // FORM
            // VALID MESSAGE 
            addNote.addEventListener('click', function () {
                addNoteInput.forEach(input => {
                    input.addEventListener('invalid', function (e) {
                        e.preventDefault();
                        input.setAttribute('placeholder', "Please enter this");
                    })
                });
            })
            editNote.addEventListener('click', function () {
                editNoteInput.forEach(input => {
                    input.addEventListener('invalid', function (e) {
                        e.preventDefault();
                        input.setAttribute('placeholder', "Please enter this");
                    })
                });
            })
            createfolder.addEventListener('click', function () {
                createFolderInput.addEventListener('invalid', function (e) {
                    e.preventDefault();
                    this.setAttribute('placeholder', "Please enter this");  
                })
            })
            //SUBMIT
            addNoteForm.addEventListener('submit', function () {
                createNote();
            })
            editNoteForm.addEventListener('submit', function () {
                updateEditNote();
            })
            createFolderForm.addEventListener('submit', function () {
                createFolder(foldersArray, fragment);
            })


            // DELETE
            del.addEventListener('click', function () {
                var showwhat = contentShow.getAttribute('data-content');
                if (showwhat == "note") {
                    var selects = document.querySelectorAll('li.selected');
                    removeAll(selects);
                } else if (showwhat == "folder") {
                    var selects = document.querySelectorAll('li.selected');
                    removeFolder(selects);
                } 
                else {
                    var selects = document.querySelectorAll('li.selected');
                    removeNoteFromFolder(selects);
                }

            })
            // END FORM
        } else {msgNote.innerHTML = "Sorry, your browser doesn't support LocalStorage :( ";}


        // NAV LINK 
        navShow.forEach(link => {
            link.addEventListener('click', function (e) {
                checkSelect("no");
                for (let i = 0; i < navShow.length; i++) {
                    navShow[i].classList.remove('active');
                }
                link.classList.add('active');
                var showWhat = e.target.getAttribute('data-show');

                
                if (showWhat == 'folder') {
                    // removeFolderFragment();
                    removeNoteFragment();
                    contentShow.setAttribute('data-content', 'folder');

                    msg.style.display = "";
                    msg.innerHTML = "You haven't create any folder yet !!!";
                    if (foldersArray.length > 0) {
                        msg.style.display = "none";
                        updateFolderDOM(foldersArray, fragment);
                        contentList.appendChild(fragment);

                    }  

                }  
                else  {
                    // removeNoteFragment();
                    removeFolderFragment();
                    contentShow.setAttribute('data-content', 'note');

                    msg.style.display = "";
                    msg.innerHTML = "There isn't any note yet !!!";
                    if (notesArray.length > 0) {
            
                        msg.style.display = "none";
                        updateNoteDOM(notesArray, fragment);

                        contentList.appendChild(fragment);

                    } 
                    
                }
            })
        });
        // END NAV LINK

        // RETURN TO FOLDER FROM FOLDER SECTION
        returnToFolder.onclick = function () {
            checkSelect('no');
            removeNoteFragment();
            loadNoteToFolderBtn.style.display = "";
            AddNoteToFolderBtn.classList.remove('show');
            AddNoteToFolderBtn.classList.remove('active');
            contentShow.setAttribute('data-content', 'folder');
            msg.style.display = "";
            msg.innerHTML = "You haven't create any folder yet !!!";
            if (foldersArray.length > 0) {
                msg.style.display = "none";
                updateFolderDOM(foldersArray, fragment);
                contentList.appendChild(fragment);

            } 
        };
        // END RETURN TO FOLDER
        //ADD NOTE TO FOLDER 
        AddNoteToFolderBtn.addEventListener('click', function() {
            
            AddNoteToFolder();
        })
        // OVERLAY

        // SHOW 
        showAddNote.onclick = function () {
            addNoteOverLay.classList.add('show_overlay');
        }
        showEdit.onclick = checkItemEdit;
        showAddFolder.onclick = function () {
            addFolderOverLay.classList.add('show_overlay');
        }
        showDel.onclick = function () {
            confirmDelOverLay.classList.add('show_overlay');
        }


        // PICK NOTE TO ADD IN FOLDER 
        loadNoteToFolderBtn.addEventListener('click', function () {
            checkSelect('no');
            if (notesArray.length == 0) {
                msg.innerHTML = "You haven't create any note yet !!!";
            } else {
                msg.style.display = "none";
            }
            removeNoteFragment();

            // FOLDER NAME
            var name = document.querySelector('.folder-section__title h2').innerHTML;
            var unique = uniqueNote(notesArray, name);
            if (unique.length > 0) {
                loadNoteToFolderBtn.style.display = "none";
                updateNoteDOM(unique, fragment);
                contentList.appendChild(fragment);
                AddNoteToFolderBtn.classList.add('show');
            } else {
                msg.style.display = "";
                msg.innerHTML = "You've added  all the note into this folder !!!";
                loadNoteToFolderBtn.style.display = "none";
            }

        })

 
        // CLOSE
        // CLOSE ADD NOTE
        closeAddNote.onclick = function () {
            addNoteOverLay.classList.remove('show_overlay');
            addNoteInput.forEach(input => {
                input.removeAttribute('placeholder');
            });
        }
        // CLOSE EDIT NOTE 
        closeEditNote.onclick = function () {
            editNoteOverLay.classList.remove('show_overlay');
            editNoteInput.forEach(input => {
                input.removeAttribute('placeholder');
            });
        }
        // CLOSE CREATE FOLDER
        closeCreateFolder.onclick = function () {
            addFolderOverLay.classList.remove('show_overlay');
            createFolderInput.setAttribute('placeholder', "Folder Name");  
        }
        //CLOSE CONFIRM DELETE
        closeConfirmDel.onclick = function () {
            confirmDelOverLay.classList.remove('show_overlay');
        }
        // END OVERLAY

    });
    // END INITIAL
    // REMOVE NOTE FRAGMENT FROM DOM
    function removeNoteFragment() {
        const noteItem = document.querySelectorAll('.list .note');
        // console.log(noteItem);
        noteItem.forEach(note => {
            note.parentNode.removeChild(note);  
        });
    }
    // REMOVE FOLDER FRAGMENT FROM DOM
    function removeFolderFragment() {
        const folderItem = document.querySelectorAll('.list .folder');
        // console.log(folderItem);
        folderItem.forEach(folder => {
            folder.parentNode.removeChild(folder);  
        });
    }
    function checkItemEdit() {
        var selected = document.querySelector('.selected');
        var key = selected.getAttribute('id');
        if (selected.classList.contains('note')) {
            editNoteOverLay.classList.add('show_overlay');
            addFormEdit(key);
        } else if (selected.classList.contains('folder')) {
            console.log('show edit folder');
        }
    }
    // CHECK SELECTED
    function checkSelect(no) {
        const selects = document.querySelectorAll('.list .selected');
        if (selects.length == 1 && !no) {

            edit.classList.add('btn-active');
            showDel.classList.add('btn-active'); 
            
            AddNoteToFolderBtn.classList.add('active');
        } else if (selects.length == 0 || no) {

            edit.classList.remove('btn-active');
            showDel.classList.remove('btn-active');

            AddNoteToFolderBtn.classList.remove('active');

        } else {
            showDel.classList.add('btn-active');
            edit.classList.remove('btn-active');
            
            AddNoteToFolderBtn.classList.add('active');
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
        var fragment = document.createDocumentFragment();
        addNoteToDOM(key, noteObj, fragment);

        localStorage.setItem(key, JSON.stringify(noteObj));
        
        notesArray.push(key);
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
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
        note.date = dateValue;
        note.tag = noteTag;

        localStorage.setItem(key, JSON.stringify(note));
    }

    function createFolder(foldersArray, fragment) {
        const folderTitle = document.querySelector('#folder-title');
        
        var title = folderTitle.value;
        var folderObj = {
            "title" : title,
            "list" : []
        };
        foldersArray.push(folderObj);
        localStorage.setItem('foldersArray', JSON.stringify(foldersArray));
        addFolderToDOM(folderObj, fragment);
    }


    // UNIQUE NOTE ARRAY
    function uniqueNote(notesArray, folderName) {

        var foldersArray = getFoldersArray();
        var folder = foldersArray.find(obj => obj.title == folderName);
        
        var difference = notesArray.filter(key => !folder.list.includes(key));
        
        return difference;
    }

    // NOTE
    function updateNoteDOM(notesArray, fragment) {

        for (let i = 0; i < notesArray.length; i++) {
            var key = notesArray[i];
            var value = JSON.parse(localStorage[key]);
            addNoteToDOM(key, value, fragment);
        }
    }
    function addNoteToDOM(key, noteobj, fragment) {


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
        fragment.appendChild(note);

        
        // noteList.insertBefore(note, noteList.childNodes[1]);
        addEventForNote(note);


    }
    function addEventForNote(note) {
        note.addEventListener('click',function () {
            if (!this.classList.contains('selected')) {
                note.classList.add('selected'); 
            } else {
                note.classList.remove('selected'); 
            }
            checkSelect();
        });
    }
    // FOLDER FUNCTION
    function updateFolderDOM(foldersArray, fragment) {
        for (let i = 0; i < foldersArray.length; i++) {
            var obj = foldersArray[i];
            addFolderToDOM(obj, fragment);
        }
    }
    function addFolderToDOM(folderObj, fragment) {

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
        fragment.appendChild(folder);


        function showFolderSection() {
            var folderName = this.getAttribute('id');

            // get the current show class 


            //change title text (with name of the clicked folder) in folder section
            var folderSectionTitle = document.querySelector('.folder-section__title h2');
            folderSectionTitle.innerHTML = folderName;


            //show folder section when click in any folder
            contentShow.setAttribute('data-content', 'folder-section');


            //remove folder fragment before
            removeFolderFragment();
            
            // load note to folder 
            loadNoteToFolder(folderName, fragment);
        }
        folder.addEventListener('click', showFolderSection, true)
        folder.addEventListener('mousedown', function () {
            setTimeout(() => {
                if (!this.classList.contains('selected')) {
                    folder.classList.add('selected');
                    folder.removeEventListener('click', showFolderSection, true );
                }   
                else {
                    folder.classList.remove('selected'); 
                    setTimeout(() => {
                        folder.addEventListener('click', showFolderSection, true );
                    }, 300);
                }
                checkSelect();
            },500);
        })
    }

    // ADD NOTE TO FOLDER 
    function AddNoteToFolder() {
        var selects = document.querySelectorAll('li.selected');
        var idFolder = document.querySelector('.folder-section__title h2').innerHTML;

        // GET FOLDER ARRAY
        var foldersArray = getFoldersArray();

        // FIND SELECTED FOLDER 
        var folder = foldersArray.find(obj => obj.title == idFolder);
       
        
        for (let i = 0; i < selects.length; i++) {
            const select = selects[i];

            // ID OF NOTE 
            var idNote = select.getAttribute('id');

            // PUSH NOTE ID INTO FOLDER LIST 
            folder.list.push(idNote);

        }
       
        // SAVE FOLDERS ARRAY BACK INTO LOCALSTORAGE
        localStorage.setItem('foldersArray', JSON.stringify(foldersArray));
        location.reload();

    }

    // LOAD NOTE TO FOLDER 
    function loadNoteToFolder(id, fragment) {
        // GET FOLDER ARRAY

        var foldersArray = getFoldersArray();

        // FIND SELECTED FOLDER 
        var folder = foldersArray.find(obj => obj.title == id);
        if (folder.list.length == 0) {
            msg.style.display = "";
            msg.innerHTML = "You haven't add any note into this folder yet";

        } else {
            msg.style.display = "none";
            updateNoteDOM(folder.list, fragment);
            contentList.appendChild(fragment);
        }


    }
    
    //REMOVE ALL 
    function removeAll(selects) {
        selects.forEach(select => {
            var key = select.getAttribute('id');
            localStorage.removeItem(key);

            // REMOVE FROM LOCALSTORAGE
            var notesArray = getNotesArray();

            for (let i = 0; i < notesArray.length; i++) {
                if (key == notesArray[i]) {
                    notesArray.splice(i,1);
                }
            }
            if (notesArray.length > 0) {
                msg.style.display = "none";
            } else {
                msg.style.display = "";
                msg.innerHTML = "There isn't any note yet !!!";
            }
            localStorage.setItem('notesArray', JSON.stringify(notesArray));


            var foldersArray = getFoldersArray();
            for (let i = 0; i < foldersArray.length; i++) {
                var folder = foldersArray[i];
                for (let j = 0; j < folder.list.length; j++) {
                    if (folder.list[j] == key) {
                        folder.list.splice(j,1);
                    }
                }
            }
            localStorage.setItem('foldersArray', JSON.stringify(foldersArray));  

            // REMOVE NOTE FROM DOM

            select.parentNode.removeChild(select);


            del.classList.remove('btn-active');
            confirmDelOverLay.classList.remove('show_overlay');
        });
    }
    function removeNoteFromDOM(selects) {

        selects.forEach(select => {
            var key = select.getAttribute('id');
            localStorage.removeItem(key);

            // REMOVE FROM LOCALSTORAGE
            var notesArray = getNotesArray();


            for (let i = 0; i < notesArray.length; i++) {
                if (key == notesArray[i]) {
                    notesArray.splice(i,1);
                }
            }
            localStorage.setItem('notesArray', JSON.stringify(notesArray));      
    

            // REMOVE NOTE FROM DOM

            select.parentNode.removeChild(select);


            del.classList.remove('btn-active');
            confirmDelOverLay.classList.remove('show_overlay');
            // location.reload();
            

        });



    }
    //REMOVE FOLDER 
    function removeFolder(selects) {
        var foldersArray = getFoldersArray();


        selects.forEach(select => {
            var folderName = select.getAttribute('id');
            for (let i = 0; i < foldersArray.length; i++) {
                const folder = foldersArray[i];
                if (folder.title == folderName) {
                    foldersArray.splice(i,1);
                    break;
                    //need break here after add uniquearray function
                }
            }

            if (foldersArray.length == 0) {
                msg.style.display = "";
                msg.innerHTML = "You haven't create any folder yet !!!";
    
            } else {
                msg.style.display = "none";
            }
            localStorage.setItem('foldersArray', JSON.stringify(foldersArray));

            // REMOVE FROM DOM
            select.parentNode.removeChild(select);
            del.classList.remove('btn-active');
            confirmDelOverLay.classList.remove('show_overlay');
        });
    }
    // REMOVE NOTE FROM FOLDER
    function removeNoteFromFolder(selects) {
        console.log(selects);
        if (selects) {
            selects.forEach(select => {
                var key = select.getAttribute('id');
                
                var folderName = document.querySelector('.folder-section__title h2').innerHTML;
        
                    // REMOVE FROM LOCALSTORAGE
        
                    var foldersArray = getFoldersArray();
                    var folder;
        
                    for (let i = 0; i < foldersArray.length; i++) {
                        if (foldersArray[i].title == folderName) {
                            folder = foldersArray[i];
                            break;
                        }  
                    }
        
                    for (let i = 0; i < folder.list.length; i++) {
                        if (folder.list[i] == key) {
                            folder.list.splice(i,1);
                            break;
                        }
                    }
        
        
                    if (folder.list.length == 0) {
                        msg.style.display = "";
                        msg.innerHTML = "You haven't add any note into this folder yet";
            
                    } else {
                        msg.style.display = "none";
                    }
        
              
                    localStorage.setItem('foldersArray', JSON.stringify(foldersArray));      
        
                    // REMOVE NOTE FROM DOM
        
                    select.parentNode.removeChild(select);
        
        
                    del.classList.remove('btn-active');
                    confirmDelOverLay.classList.remove('show_overlay');
        
                
                });
        }

    }
},false)
