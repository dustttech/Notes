    // nav link
    const navShow = document.querySelectorAll('.nav-link');



    //show addnote, addfolder overlay , edit overlay
    const showAddNote = document.querySelector('.show-add-note');//note
    const showEdit = document.querySelector('.edit');//edit
    const showAddFolder = document.querySelector('.show-add-folder');//folder

    //close overlay
    const closeAddNote = document.querySelector('#close_add_note');//close add note overlay
    const closeEditNote = document.querySelector('#close_edit_note');//close edit note overlay
    const closesubmitFolderBtn = document.querySelector('#close_create_folder');//close create folder
    const closeConfirmDel = document.querySelector('#close_confirm_delete');//close create folder
    // submit form btn
    const addNote = document.querySelector('#add_note');
    const editNote = document.querySelector('#add_edit');
    const submitFolderBtn = document.querySelector('#submit_folder');
    //form 
    //add note
    const addNoteForm = document.querySelector('#add_note_form');
    

    //edit note
    const editNoteForm = document.querySelector('#edit_note_form');
    //folder
    const submitFolderForm = document.querySelector('#create_folder_form');

    //delete






    const showDel = document.querySelector('#show-delete');//confirm delete
    const del = document.querySelector('#delete'); // del
    const edit = document.querySelector('.edit'); // edit
    const loadNoteToFolderBtn = document.querySelector('#load_note_to_folder');//load note to folder (folder section)
    const AddNoteToFolderBtn = document.querySelector('#add_note_to_folder');//add note to folder (folder section)

    const returnToFolder = document.querySelector('.return_folder');
    //select folder
    const selectFolder = document.querySelector('.select-folder');

    // SHOW CONTENT 
    const contentShow = document.querySelector('.main-content');
    // LIST DISPLAY
    const contentListWrapper = document.querySelector('.list-wrapper');
    const contentList = document.querySelector('.list');

    //COLOR PICKER
    const colorList = document.querySelectorAll('.color-picker li');

    // INPUT FORM
    const inputForm = document.querySelectorAll('.input-field');
    const addNoteInput = document.querySelectorAll('#add_note_form .input-field');
    const editNoteInput = document.querySelectorAll('#edit_note_form .input-field');
    const folderInput = document.querySelector('#create_folder_form .input-field');


    //OVERLAY
    const addNoteOverLay = document.querySelector('.add-note-overlay');//add note
    const editNoteOverLay = document.querySelector('.edit-note-overlay');//edit note
    const folderOverLay = document.querySelector('.folder-overlay');//folder
    //delete confirm
    const confirmDelOverLay = document.querySelector('.confirm-delete-overlay');


document.addEventListener('DOMContentLoaded',function(){


    // INTIAL
    window.addEventListener('load',function () {

        // SET THEME
        var theme = localStorage.getItem('theme');

        document.body.classList.add(theme === null ? "dark" : theme);

        // CHECK IF THERE IS SUPPORT FOR LOCALSTORAGE
        if (window["localStorage"]) {



            // ISOTOPE

            // var iso = new Isotope( contentList, {
            //     percentPosition: true,
            //     itemSelector: "li",
            //     columnWidth: "li",
            //     masonry: {
            //         // gutter: 0,
            //         horizontalOrder: true
            //     }
            //   });
            //   window.addEventListener('resize', function () {
            //     iso.layout();
            //     })

            // UPDATE DOM FROM LOCALSTORAGE
            var notesArray = getNotesArray();

            updateNoteDOM(notesArray);
            if (notesArray.length > 0) {
                displayMsg('no');
            }

        
            // FORM
            // COLOR PICKER 
            colorList.forEach(color => {
                color.addEventListener('click', function () {
                    for (let i = 0; i < colorList.length; i++) {
                        const color = colorList[i];
                        color.classList.remove('active');
                    }
                    this.classList.add('active');
                })
            });


            // FORM INPUT INVALID MESSAGE
            inputForm.forEach(input => {
                input.addEventListener('invalid', function (e) {
                    e.preventDefault();
                    input.setAttribute('placeholder', "Please enter this");
                })
            });

            //SUBMIT
            addNoteForm.addEventListener('submit', function (e) {
                e.preventDefault();
                addNoteOverLay.classList.remove('show_overlay');
                processOverlay(addNoteOverLay, "no");

                addNoteInput.forEach(input => {
                    input.removeAttribute('placeholder');
                });
                createNote();
            })
            editNoteForm.addEventListener('submit', function (e) {
                e.preventDefault();
                processOverlay(editNoteOverLay, "no");
                updateEditNote();
            })
            submitFolderForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var isUnique = uniqueFolderName();
                if (!isUnique) {
                    submitFolderForm.reset();

                    folderInput.setAttribute('placeholder', "You have use this name . Please type another one !!!");

                } else {
                    displayMsg("no");

                    var submitWhat = this.getAttribute('data-submit');
                    if (submitWhat == "create") {
                        createFolder();
                    } else if (submitWhat == "edit") {
                        editFolder();
                    }
                    processOverlay(folderOverLay, 'no');
                }
            })


            // DELETE
            del.addEventListener('click', function (e) {
                e.preventDefault();
                var showwhat = contentShow.getAttribute('data-content');
                if (showwhat == "note") {
                    removeAll();
                } else if (showwhat == "folder") {
                    removeFolder();
                } 
                else {
                    removeNoteFromFolder();
                }

            })
            // END FORM
        } else {displayMsg('show', 'localstorage')}




        // NAV LINK 
        navShow.forEach(link => {
            link.addEventListener('click', function (e) {

        
                checkSelect("no");


                for (let i = 0; i < navShow.length; i++) {
                    navShow[i].classList.remove('active');
                }
                link.classList.add('active');

                //this showWhat get data-show of the btn in nav , difference than showWhat in del click handler function 
                var showWhat = e.target.getAttribute('data-show');


                
                if (showWhat == 'folder') {
                    var foldersArray = getFoldersArray();
                    removeFragmentChild();
                    contentShow.setAttribute('data-content', 'folder');
                    
                    displayMsg('show', 'folder');
                    if (foldersArray.length > 0) {
                        displayMsg('no')
                        updateFolderDOM();
                    }  
                } else {
                    var notesArray = getNotesArray();
                    removeFragmentChild();
                    contentShow.setAttribute('data-content', 'note');

                    displayMsg('show', 'note');

                    if (notesArray.length > 0) {
                        displayMsg('no')
                        updateNoteDOM(notesArray);
                    }
                }  
               
            })
        });
        // END NAV LINK

        // RETURN TO FOLDER FROM FOLDER SECTION
        returnToFolder.onclick = function () {
            var foldersArray = getFoldersArray();
            checkSelect('no');
            removeFragmentChild();

            loadNoteToFolderBtn.style.display = "";
            
            AddNoteToFolderBtn.classList.remove('show');
            AddNoteToFolderBtn.classList.remove('active');
            contentShow.setAttribute('data-content', 'folder');
            displayMsg('show', 'folder');
            if (foldersArray.length > 0) {
                displayMsg('no');
                updateFolderDOM();
            } 
        };
        // END RETURN TO FOLDER
        //ADD NOTE TO FOLDER 
        AddNoteToFolderBtn.addEventListener('click', function() {
            AddNoteToFolder();
            removeFragmentChild();
            AddNoteToFolderBtn.classList.remove('show');
            var id = document.querySelector('.folder-section__title h2').innerHTML;
            loadNoteToFolder(id);
            loadNoteToFolderBtn.style.display = "";
        })
        // OVERLAY

        // SHOW 
        showAddNote.onclick = function () {
            processOverlay(addNoteOverLay, 'yes');
            addNoteForm.reset();
        }
        showEdit.onclick = checkItemEdit;
        showAddFolder.onclick = function () {
            folderInput.setAttribute('placeholder', "Folder Name");
            const folderTitle = document.querySelector('#folder-title');
            folderTitle.value = "";


            submitFolderBtn.value = "Create";
            submitFolderForm.setAttribute('data-submit', 'create');


            processOverlay(folderOverLay, 'yes');

        }
        showDel.onclick = function () {
            processOverlay(confirmDelOverLay, 'yes');
        }


        // PICK NOTE TO ADD IN FOLDER 
        loadNoteToFolderBtn.addEventListener('click', function () {
            checkSelect('no');
            var notesArray = getNotesArray();
            if (notesArray.length == 0) {
                loadNoteToFolderBtn.style.display = "none";
                displayMsg('show', 'nonoteforfolder');
            } else {
                displayMsg('no');
                removeFragmentChild();

                // FOLDER NAME

                var unique = uniqueNote(notesArray);

                if (unique.length > 0) {
                    loadNoteToFolderBtn.style.display = "none";
                    updateNoteDOM(unique);
                    AddNoteToFolderBtn.classList.add('show');
                } else {
                    displayMsg('show', 'fullnoteforfolder');
                    loadNoteToFolderBtn.style.display = "none";
                }
            }


        })

 
        // CLOSE
        // CLOSE ADD NOTE
        closeAddNote.onclick = function () {
            processOverlay(addNoteOverLay, 'no');

            addNoteInput.forEach(input => {
                input.removeAttribute('placeholder');
            });
        }
        // CLOSE EDIT NOTE 
        closeEditNote.onclick = function () {
            processOverlay(editNoteOverLay, 'no');
            editNoteInput.forEach(input => {
                input.removeAttribute('placeholder');
            });
        }
        // CLOSE CREATE FOLDER
        closesubmitFolderBtn.onclick = function () {
            processOverlay(folderOverLay, 'no');
            folderInput.setAttribute('placeholder', "Folder Name");  
        }
        //CLOSE CONFIRM DELETE
        closeConfirmDel.onclick = function () {
            processOverlay(confirmDelOverLay, 'no');
        }
        // END OVERLAY
        // SELECT FOLDER 
        const selectMany = () => {
            let isSelect = true;
            return () => {

                const folders = document.querySelectorAll('.list .folder');
                if (isSelect) {
                    selectFolder.classList.add('active');

                    folders.forEach(folder => {
                        folder.removeEventListener('click', showFolderSection, true);

                        folder.addEventListener('click', processSelect, true);
                    });


                } else {
                    selectFolder.classList.remove('active');

                    folders.forEach(folder => {
                        folder.classList.remove('selected');
                        folder.addEventListener('click', showFolderSection, true );

                        folder.removeEventListener('click', processSelect, true);
                    });

                }
                isSelect = !isSelect;
            }
        }
        selectFolder.addEventListener('click', selectMany());
    });
    // END INITIAL

},false);


// REMOVE NOTE FRAGMENT FROM DOM
function removeFragmentChild() {
    const noteItem = document.querySelectorAll('.list .note');
    const folderItem = document.querySelectorAll('.list .folder');
    if (noteItem.length > 0) {
        noteItem.forEach(note => {
            note.parentNode.removeChild(note);  
        });
    } 
    else if(folderItem.length > 0){
        folderItem.forEach(folder => {
            folder.parentNode.removeChild(folder);  
        });
    } 
}
// GET CURRENT TIME
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
// GET ARRAY
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

// GET COLOR
function getColor(color) {
    switch (color) {
        case "white":
            return "white";
            // break;
        case "red":
            return "#ff7746";
            // break;
        case "yellow":
            return "#ffda47";
            // break;
        case "bluesky":
            return "#0aebaf";
            // break;
        case "green":
            return "#7bff2f";
            // break;
        // default:
        //     return " ";
        //     break;
    }
}
// DISPLAY MESSAGE
function displayMsg(display, type) {
    const msg = document.querySelector('.main-content .message');
    if (display == 'show') {
        msg.style.display = "";
        switch (type) {
            case "localstorage":
                msg.innerHTML = "Sorry, your browser doesn't support LocalStorage :(";
                break;
            case "folder":
                msg.innerHTML = "You haven't create any folder yet !!!";
                break;
            case "note":
                msg.innerHTML = "You haven't create any note yet !!!";
                break;
            case "notefolder":
                msg.innerHTML = "You haven't add any note into this folder yet";
                break;
            case "nonoteforfolder":
                msg.innerHTML = "You haven't create any note yet , PLease go back and create some note first :)";
                break;
            case "fullnoteforfolder":
                msg.innerHTML = "You've added  all the note into this folder !!!";
                break;
        
            // default:
            //     break;
        }
    } else if (display == 'no') {
        msg.style.display = "none";  
    }
}
    //CHECK UNIQUE NAME
    function uniqueFolderName() {
        var foldersArray = getFoldersArray();
        if (foldersArray.length == 0) {
            return true;
        }
        const folderTitle = document.querySelector('#folder-title').value;


        var isUnique ;
        for (let i = 0; i < foldersArray.length; i++) {
            const folder = foldersArray[i];
            if (folder.title == folderTitle) {
                isUnique = false;
                break; // stop the loop when similar name is found
            } else {
                isUnique = true;
            }
        }
        return isUnique;
    }
    // CHECK SELECTED
    function checkSelect(no) {
        folderInput.setAttribute('placeholder', "Folder Name");
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

    // NOTE

    // UPDATE NOTE LIST TO DOM
    function updateNoteDOM(array) {
        removeFragmentChild();
        for (let i = 0; i < array.length; i++) {
            var key = array[i];
            var noteobj = JSON.parse(localStorage[key]);
            addNoteToDOM(key, noteobj);
        }
    }



    // ADD NOTE TO DOM
    function addNoteToDOM(key, noteobj) {
        const contentList = document.querySelector('.list');
        var fragment = document.createDocumentFragment();

        

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

        var color = getColor(noteobj.color);
        var textcolor = getColor(noteobj.textcolor);
        

        note_title.innerHTML = noteobj.title;
        note_content.innerHTML = noteobj.content;
        note_date.innerHTML = noteobj.date;
        note_tag.innerHTML = noteobj.tag;


        note.style.color = textcolor;

        note.style.backgroundColor = color;

        note.setAttribute('class', 'note');
        note_bottom.appendChild(note_date);
        note_bottom.appendChild(note_tag);
        note.appendChild(note_title);
        note.appendChild(note_content);
        note.appendChild(note_bottom);
        fragment.appendChild(note);

        displayMsg('no');
        contentList.appendChild(fragment);
        
        
        // noteList.insertBefore(note, noteList.childNodes[1]);
        addEventForNote(note);
    }
    // ADD EVENT LISTENER FOR NOTE
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
        // LOAD NOTE TO FOLDER 
        function loadNoteToFolder(id) {
            // GET FOLDER ARRAY
    
            var foldersArray = getFoldersArray();
            // FIND SELECTED FOLDER 
            var folder = foldersArray.find(obj => obj.title == id);

            if (folder.list.length == 0) {
                setTimeout(() => {
                    displayMsg('show', 'notefolder');
                }, 500);
            } else {
                displayMsg('no');
                updateNoteDOM(folder.list);
            }
    
    
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

    
        }
    // CREATE NOTE
    function createNote() {
        var notesArray = getNotesArray();
        // NOTE OBJ
        const noteTitle = document.querySelector('#note-title');
        const noteContent = document.querySelector('#note-content');
        const noteTag = document.querySelector('#note-tag');
        const colorPick = document.querySelector('.color-picker .active');

        var titleValue = noteTitle.value;
        var contentValue = noteContent.value;
        var tagValue = noteTag.value;
        var color = colorPick.getAttribute('data-color');
        var textcolor;
        if (color == "black") {
            textcolor = "#f6f6f6";
        } else {textcolor = "#222"};

        
        var dateValue = getCurrentTime();
        var noteObj = {
            "title": titleValue,
            "content": contentValue,
            "date": dateValue,
            "tag": tagValue,
            "color": color,
            "textcolor": textcolor
        };


        // KEY
        var d = new Date();
        var key = "note_" + d.getTime();

        addNoteToDOM(key, noteObj);

        localStorage.setItem(key, JSON.stringify(noteObj));
        
        notesArray.push(key);
        localStorage.setItem("notesArray", JSON.stringify(notesArray));
    }


    // EDIT 
    // ADD FORM EDIT
    function addFormEdit(key) {
        var note = JSON.parse(localStorage[key]);

        const noteTitle = document.querySelector('#edit-note-title');
        const noteContent = document.querySelector('#edit-note-content');
        const noteTag = document.querySelector('#edit-note-tag');
        
        addActiveColor(note.color);

        noteTitle.value = note.title;
        noteContent.value = note.content;
        noteTag.value = note.tag;
    }
// ADD ACTIVE COLOR
    function addActiveColor(color) {
        const list = document.querySelectorAll('#edit_note_form .color-picker li');
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            item.classList.remove('active');
        }
        list.forEach(item => {

            var noteColor = item.getAttribute('data-color');

            if (noteColor == color) {
                item.classList.add('active');
            }
        });
    }
    // UPDATE EDIT NOTE
    function updateEditNote() {

        var key = document.querySelector('li.selected').getAttribute('id');
        var note = JSON.parse(localStorage[key]);

        const noteTitle = document.querySelector('#edit-note-title').value;
        const noteContent = document.querySelector('#edit-note-content').value;
        const noteTag = document.querySelector('#edit-note-tag').value;
        var dateValue = getCurrentTime();
        const colorPick = document.querySelector('.color-picker .active');
        var color = colorPick.getAttribute('data-color');

        var textcolor;
        if (color == "black") {
            textcolor = "#f6f6f6";
        } else {textcolor = "#222"};


        note.title = noteTitle;
        note.content = noteContent;
        note.date = dateValue;
        note.tag = noteTag;
        note.color = color;
        note.textcolor = textcolor;

        localStorage.setItem(key, JSON.stringify(note));
        // addNoteToDOM(key, note)
        var notearray = getNotesArray();
        updateNoteDOM(notearray);
    }
    //REMOVE ALL 
    function removeAll() {
        var selects = document.querySelectorAll('li.selected');
        selects.forEach(select => {
            var key = select.getAttribute('id');
            // REMOVE FROM LOCALSTORAGE
            localStorage.removeItem(key); //remove item

            //remove key push in the array
            var notesArray = getNotesArray();

            for (let i = 0; i < notesArray.length; i++) {
                if (key == notesArray[i]) {
                    notesArray.splice(i,1);
                }
            }
            if (notesArray.length > 0) {
                displayMsg('no');
            } else {
                displayMsg('show', 'note');
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
            processOverlay(confirmDelOverLay, 'no');
        });
    }
    //REMOVE FOLDER ????
    function removeFolder() {
        var selects = document.querySelectorAll('li.selected');

        var foldersArray = getFoldersArray();


        selects.forEach(select => {
            var folderName = select.getAttribute('id');
            for (let i = 0; i < foldersArray.length; i++) {
                const folder = foldersArray[i];
                if (folder.title == folderName) {
                    foldersArray.splice(i,1);
                    break;
                    //need break here after add uniquearray function ?????
                }
            }

            if (foldersArray.length == 0) {
                displayMsg('show', 'folder');

            } else {
                displayMsg('no');
            }
            localStorage.setItem('foldersArray', JSON.stringify(foldersArray));

            // REMOVE FROM DOM
            select.parentNode.removeChild(select);
            del.classList.remove('btn-active');
            processOverlay(confirmDelOverLay, 'no');

        });
    }




    // UNIQUE NOTE ARRAY
    function uniqueNote(notesArray) {
        var folderName = document.querySelector('.folder-section__title h2').innerHTML;
        var foldersArray = getFoldersArray();
        var folder = foldersArray.find(obj => obj.title == folderName);
        
        var difference = notesArray.filter(key => !folder.list.includes(key));
        
        return difference;
    }


    // FOLDER FUNCTION
    function updateFolderDOM() {
        var foldersArray = getFoldersArray();

        for (let i = 0; i < foldersArray.length; i++) {
            var folderObj = foldersArray[i];
            addFolderToDOM(folderObj);
        }
    }
    // ADD FOLDER TO DOM
    function addFolderToDOM(folderObj) {
        var fragment = document.createDocumentFragment();
        const contentList = document.querySelector('.list');

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
        contentList.appendChild(fragment);

        folder.addEventListener('click', showFolderSection, true);
    }
    //EDIT FOLDER 
    function editFolder() {


        var foldersArray = getFoldersArray();

        const folderTitle = document.querySelector('#folder-title');
        var selected = document.querySelector('.selected');
        var key = selected.getAttribute('id');

        for (let i = 0; i < foldersArray.length; i++) {
            var folder = foldersArray[i];
            if (folder.title == key) {
                folder.title = folderTitle.value;
            }
        }
        localStorage.setItem('foldersArray', JSON.stringify(foldersArray));
        addFolderToDOM(folder);
    }
    // CREATE FOLDER
    function createFolder() {
        var foldersArray = getFoldersArray();

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



    // SHOW FOLDER SECTION
    function showFolderSection(e) {
        var folderName = e.target.id;
        if (e.target.tagName.toLowerCase() == "span") {
            folderName = e.target.parentNode.id;
        }
        // get the current show class 
    
    
        //change title text (with name of the clicked folder) in folder section
        var folderSectionTitle = document.querySelector('.folder-section__title h2');
        folderSectionTitle.innerHTML = folderName;
    
    
        //show folder section when click in any folder
        contentShow.setAttribute('data-content', 'folder-section');
    
    
        //remove folder fragment before
        removeFragmentChild();
        
        // load note to folder 
        loadNoteToFolder(folderName);
    }
    // REMOVE NOTE FROM FOLDER
    function removeNoteFromFolder() {
        var selects = document.querySelectorAll('li.selected');

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
                        displayMsg('show', 'notefolder');
            
                    } else {
                        displayMsg('no');
                    }
        
                
                    localStorage.setItem('foldersArray', JSON.stringify(foldersArray));      
        
                    // REMOVE NOTE FROM DOM
        
                    select.parentNode.removeChild(select);
        
        
                    del.classList.remove('btn-active');

                    processOverlay(confirmDelOverLay, 'no');
                
                });
        }

    }


    //CHECK ITEM EDIT
    function checkItemEdit() {
        var selected = document.querySelector('.selected');
        var key = selected.getAttribute('id');
        if (selected.classList.contains('note')) {
            processOverlay(editNoteOverLay, 'yes');
            addFormEdit(key);
        } else if (selected.classList.contains('folder')) {
            processOverlay(folderOverLay, 'yes');


            const folderTitle = document.querySelector('#folder-title');
            folderTitle.value = key;
            submitFolderBtn.value = "Rename";
            submitFolderForm.setAttribute('data-submit', 'edit');
        }
    }







    // PROCESS OVERLAY
    function processOverlay(whichone, display) {
        if (display == 'no') {
            whichone.classList.remove('show_overlay');
        } else if (display == 'yes') {
            whichone.classList.add('show_overlay');
        }
    }
    // PROCESS SELECT
    function processSelect(e) {
        var folder = e.target;
        if (e.target.tagName.toLowerCase() == "span") {
            folder = e.target.parentNode;
        }
        if (!folder.classList.contains('selected')) {
            folder.classList.add('selected');
        }      
        else {
            folder.classList.remove('selected'); 
        }
        checkSelect();
    }
    // THEME
function switchTheme() {
    if (document.body.classList.contains('dark')) {
        document.body.classList.replace('dark', 'light');
        saveTheme();
    } else if (document.body.classList.contains('light')) {
        document.body.classList.replace('light', 'dark');
        saveTheme();
    }
}
function saveTheme() {
    var theme = document.body.classList.value;
    localStorage.setItem('theme', theme);
}

