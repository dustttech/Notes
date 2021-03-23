    // nav link
    const navShow = document.querySelectorAll('.nav-link');

    // SHOW CONTENT 
    const contentShow = document.querySelector('.main-content');
    // LIST DISPLAY
    const contentList = document.querySelector('.list');



    //OVERLAY
    const addNoteOverLay = document.querySelector('.add-note-overlay');//add note
    const editNoteOverLay = document.querySelector('.edit-note-overlay');//edit note
    const folderOverLay = document.querySelector('.folder-overlay');//folder
    const confirmDelOverLay = document.querySelector('.confirm-delete-overlay');//delete confirm

        //show overlay (BTN)
        const showAddNote = document.querySelector('.show-add-note');//note
        const showEdit = document.querySelector('.edit');//edit
        const showAddFolder = document.querySelector('.show-add-folder');//folder

        //close overlay (BTN)
        const closeAddNote = document.querySelector('#close_add_note');//close add note overlay
        const closeEditNote = document.querySelector('#close_edit_note');//close edit note overlay
        const closesubmitFolderBtn = document.querySelector('#close_create_folder');//close create folder
        const closeConfirmDel = document.querySelector('#close_confirm_delete');//close create folder

    // folder

    //select folder (BTN)
    const selectFolder = document.querySelector('.select-folder');

    //folder-section
    const loadNoteToFolderBtn = document.querySelector('#load_note_to_folder');//load note to folder (folder section)
    const AddNoteToFolderBtn = document.querySelector('#add_note_to_folder');//add note to folder (folder section)

    const returnBtn = document.querySelector('.return_folder-section');//return btn (folder-section)



    //form 
    
    const addNoteForm = document.querySelector('#add_note_form');//add note form
    const editNoteForm = document.querySelector('#edit_note_form');//edit note form
    const submitFolderForm = document.querySelector('#create_folder_form');//folder form

        // submit (BTN)
        const addNote = document.querySelector('#add_note');//add note
        const editNote = document.querySelector('#add_edit');//edit note
        const submitFolderBtn = document.querySelector('#submit_folder');//submit folder form btn

    //delete
    const showDel = document.querySelector('#show-delete');//show confirm delete
    const del = document.querySelector('#delete'); // delete btn


    //edit
    const edit = document.querySelector('.edit'); // show edit form  btn

    //COLOR PICKER
    const colorList = document.querySelectorAll('.color-picker li');

    // INPUT FORM
    const inputForm = document.querySelectorAll('.input-field');//all
    const addNoteInput = document.querySelectorAll('#add_note_form .input-field');//add note input (3)
    const editNoteInput = document.querySelectorAll('#edit_note_form .input-field');//edit input (3)
    const folderInput = document.querySelector('#create_folder_form .input-field');//folder input (1)


    // control BTN FOR ADD
    const nextBtnAdd = document.querySelector('.add-note-overlay .btn-group .next');
    const prevBtnAdd = document.querySelector('.add-note-overlay .btn-group .prev');
    // control BTN FOR EDIT
    const nextBtnEdit = document.querySelector('.edit-note-overlay .btn-group .next');
    const prevBtnEdit = document.querySelector('.edit-note-overlay .btn-group .prev');

    // var for FORM CONTROL (***)
    var dis = 0;


    // IMG BG WRAPPER
    const imgWrapper = document.querySelector('.img-wrapper');

//ADJUST WIDTH AND HEIGHT FOR IMG WRAPPER
function adjustImgWrapper() {
    imgWrapper.style.width = window.clientWidth + "px";
    imgWrapper.style.height = window.clientHeight + "px";
}
// MOVING IMG RANDOMlY 
function movingBg() {
    const imgBg = document.querySelectorAll('.bg-img');

    imgBg.forEach(img => {     
        // INITIAL POSITION
        img.style.top = Math.floor(Math.random() * (imgWrapper.offsetHeight - img.offsetHeight)) + "px";
        img.style.left = Math.floor(Math.random()* (imgWrapper.offsetWidth - img.offsetWidth)) + "px";

        function loop() {
        // WRAPPER WIDTH AND HEIGHT

        var wrapperWidth = imgWrapper.offsetWidth;
        var wrapperHeight = imgWrapper.offsetHeight;
        // SUBTRACT IMG WIDTH AND HEIGHT SO IMG DON'T GO OUTSIDE WRAPPER
        var w = wrapperWidth - img.offsetWidth;
        var h = wrapperHeight - img.offsetHeight;


            // GET A RANDOM LOCATION INSIDE WRAPPER (W,H FOR TOP AND LEFT IN CSS POSITION)
                var moveTop = Math.floor(Math.random()*h);
                var moveLeft = Math.floor(Math.random()*w);



                //moving img below header (to not casue distract)
                if (moveTop <= 150) {
                    moveTop = 150;
                }
                // SPEED (TRANSITION TIME)
                var speed = Math.floor(Math.random()*10) + 1;
                img.style.transition = speed + "s ease-in-out";

                img.style.top = moveTop + "px";
                img.style.left = moveLeft + "px";

            setTimeout(() => {
                loop(); //repeat loop 
            }, speed*1000); // after transition time 
        }
        loop(); //trigger loop once

    });
}

document.addEventListener('DOMContentLoaded',function(){//only run when dom is loaded
    //HIDE MAIN 
    document.querySelector('.main').style.opacity = '0';
    // INTIAL
    window.addEventListener('load',function () { //only run when the page has load all of it content
        //PRELOAD ANIMATION
        setTimeout(() => {
            document.querySelector('.preload-wrapper').style.opacity = "0";
            document.querySelector('.preload-wrapper').style.zIndex = "-1";
            setTimeout(() => {
                document.querySelector('.main').style.opacity = ''; 
            }, 500);
        }, 1000);
        // END PRELOAD
        // MOVING BG
        movingBg();
        // LOAD THEME
        var theme = localStorage.getItem('theme');

        document.body.classList.add(theme === null ? "dark" : theme);//if user has already pick a theme before then load it , if not load the dark theme as default

        // CHECK IF THERE IS SUPPORT FOR LOCALSTORAGE
        if (window["localStorage"]) {

            // UPDATE DOM FROM LOCALSTORAGE
            var notesArray = getNotesArray(); //get note array in localstorage

            updateNoteDOM(notesArray); // pass it to updateDOM to load note in
            isoLayout();// mansory layout
            
            // if there is no note in notesaaray then display msg for user
            if (notesArray.length > 0) {
                displayMsg('no'); 
            }


            // Throtling for desktop resize event 
        var resize = window.requestAnimationFrame || function (callback) {
            setTimeout(callback, 1000/60);
            }

        function loop() {
            isoLayout();
            setTimeout(() => {
                adjustImgWrapper();//ADJUST WIDTH AND HEIGHT FOR IMG WRAPPER
            }, 3000);
            resize(loop);//REPEAT
        }
        resize(loop);
        //end throttling


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

            //FORM SUBMIT

            // ADD NOTE  FORM
            addNoteForm.addEventListener('submit', function (e) {
                e.preventDefault();
                addNoteOverLay.classList.remove('show_overlay');
                processOverlay(addNoteOverLay, "no");

                addNoteInput.forEach(input => {
                    input.removeAttribute('placeholder');
                });
                createNote();
            })
            //EDIT FORM
            editNoteForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var editWhere = contentShow.getAttribute('data-content');
                processOverlay(editNoteOverLay, "no");

                //edit at note section
                if (editWhere == 'note') {
                    var notearray = getNotesArray();
                    updateEditNote(notearray);
                } else if (editWhere == 'folder-section') { //edit at folder section
                    var id = document.querySelector('.folder-section__title h2').innerHTML;
                    var foldersArray = getFoldersArray();
                    // FIND SELECTED FOLDER 
                    var folder = foldersArray.find(obj => obj.title == id);
                    updateEditNote(folder.list);
                }
                checkSelect('no');
            })
            // FOLDER FORM
            submitFolderForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var submitWhat = this.getAttribute('data-submit'); //check to see what kind of folder form
                var isUnique = uniqueFolderName(); //check if user type valid name (not use before )
                if (!isUnique && submitWhat != "edit") { //if duplicate (edit is okay to duplicate)
                    submitFolderForm.reset(); //reset form 

                    folderInput.setAttribute('placeholder', "You have use this name . Please type another one !!!"); 

                } else { //if it's a new name
                    displayMsg("no");
 
                    if (submitWhat == "create") { //if it's create then create new folder
                        createFolder();
                    } else if (submitWhat == "edit") { //else edit form
                        editFolder();
                        selectFolder.classList.remove('active');
                    }
                    processOverlay(folderOverLay, 'no');
                    checkSelect('no');
                }
            })


            // DELETE ITEM
            del.addEventListener('click', function (e) {
                e.preventDefault();
                var showwhat = contentShow.getAttribute('data-content');
                if (showwhat == "note") { //if note then call removeALL (remove note and note in folder )
                    removeAll();
                } else if (showwhat == "folder") { // folder then remove only folder
                    removeFolder();
                } 
                else { //remove only note save in folder (folder section)
                    removeNoteFromFolder();
                }
                checkSelect('no');
            })
            // END FORM
        } else {displayMsg('show', 'localstorage')}




        // NAV LINK 
        navShow.forEach(link => {
            link.addEventListener('click', function (e) {

                selectFolder.classList.remove('active');
                checkSelect("no");


                for (let i = 0; i < navShow.length; i++) {
                    navShow[i].classList.remove('active');
                }
                link.classList.add('active');

                //this showWhat get data-show of the btn in nav , difference than showWhat in del click handler function 
                var showWhat = e.target.getAttribute('data-show'); //nav link btn (2)


                
                if (showWhat == 'folder') { // then laod folder 
                    var foldersArray = getFoldersArray();
                    removeFragmentChild();
                    contentShow.setAttribute('data-content', 'folder');
                    
                    displayMsg('show', 'folder');
                    if (foldersArray.length > 0) {
                        displayMsg('no')
                        updateFolderDOM();
                        isoLayout();
                    }  
                } else {
                    var notesArray = getNotesArray();
                    removeFragmentChild();
                    contentShow.setAttribute('data-content', 'note');

                    displayMsg('show', 'note');

                    if (notesArray.length > 0) {
                        displayMsg('no')
                        updateNoteDOM(notesArray);
                        isoLayout();
                    }
                }  
               
            })
        });
        // END NAV LINK

        // RETURN TO FOLDER FROM FOLDER SECTION
        returnBtn.onclick = function () {
            var state = returnBtn.getAttribute('data-return');
            if (state == 'folder') { //click when in view note in folder
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
                    isoLayout();
                }          
            } else { // click when view add note to folder
                removeFragmentChild();
                AddNoteToFolderBtn.classList.remove('show');
                var id = document.querySelector('.folder-section__title h2').innerHTML;
                loadNoteToFolder(id);
                loadNoteToFolderBtn.style.display = "";
                returnBtn.setAttribute('data-return', 'folder');
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

                // FORM CONTROL (***)
        function counter() {
            var arr = [0,25,50,75]; //distance value (check .form-input in CSS ) , because there are 4 input
            function changeBy(val) { //change func
                dis += val;//add val to dis

                // BTN FOR ADD 
                dis == 0 ? (prevBtnAdd.style.opacity = '0',prevBtnEdit.style.opacity = '0') 
                : (prevBtnAdd.style.opacity = '1',prevBtnEdit.style.opacity = '1');      //if dis = 0 , hide prev btn , if not show it 
                // BTN FOR EDIT
                dis == 3 ? (nextBtnAdd.style.opacity = '0',nextBtnEdit.style.opacity = '0') 
                : (nextBtnAdd.style.opacity = '1',nextBtnEdit.style.opacity = '1');      //if dis = 3 , hide next btn , if note show it 


                if (dis > arr.length - 1) {
                    dis = arr.length - 1; // if dis = 3 ,stop increase
                } else if (dis < 0) {
                    dis = 0; // if dis = 0 , stop decrease
                }
            }
            return { //return object 
                next: function() { //has next method (add dis with 1)
                changeBy(1);
                },
                prev: function() {//prev method (subtract dis with 1)
                changeBy(-1);
                },
                value: function() {//value return item in arr with dis index
                return arr[dis];
                }
            };
        }

        function movingForm(direction, value) {
            var overlayShowed = document.querySelector('.show_overlay .form-input');
            if (direction == "next") {
                overlayShowed.style.transform = "translateX(" + -value + "%)"; // move form accordingly to value in arr of counter
            } else {
                overlayShowed.style.transform = "translateX(" + -value + "%)";
            }
        }

        var counterAdd = counter(); //add 2 reference to coutner function 
        var counterEdit = counter(); //add 2 reference to coutner function 
        // ADD
        nextBtnAdd.onclick = function() { 
            counterAdd.next(); //call next method of counter 
            movingForm('next', counterAdd.value()) // pass next (direction) and counter value to movingform function
        };
        prevBtnAdd.onclick = function() { 
            counterAdd.prev();//call prev method of counter 
            movingForm('prev', counterAdd.value())
        };

        // EDIT
        nextBtnEdit.onclick = function() { 
            counterEdit.next();
            movingForm('next', counterEdit.value())
        };

        prevBtnEdit.onclick = function() { 
            counterEdit.prev();
            movingForm('prev', counterEdit.value())
        }
        // END FORM CONTROL (***)
        // SHOW 
        // show add note overlay
        showAddNote.onclick = function () {
            processOverlay(addNoteOverLay, 'yes');


            dis = 0; //reset position FORM CONTROL (***)
            var overlayShowed = document.querySelector('.show_overlay .form-input');
            overlayShowed.style.transform = "translateX(0%)";//reset position FORM CONTROL (***)

            addNoteForm.reset();
            // reset state for  BTN control form of ADD note
            nextBtnAdd.style.opacity = '1';
            prevBtnAdd.style.opacity = '0';
        }
        //show edit note overlay
        showEdit.onclick = function () {

            checkItemEdit();
            var showwhat = contentShow.getAttribute('data-content');
            if (showwhat != 'folder') {
                dis = 0; //reset position FORM CONTROL (***)
                var overlayShowed = document.querySelector('.show_overlay .form-input');
                
                overlayShowed.style.transform = "translateX(0%)";//reset position FORM CONTROL (***)
            }
        }
        //show folder overlay
        showAddFolder.onclick = function () {
            folderInput.setAttribute('placeholder', "Folder Name");
            const folderTitle = document.querySelector('#folder-title');
            folderTitle.value = "";


            submitFolderBtn.value = "Create";
            submitFolderForm.setAttribute('data-submit', 'create');


            processOverlay(folderOverLay, 'yes');

        };
        //show confirm delete overlay
        showDel.onclick = function () {
            processOverlay(confirmDelOverLay, 'yes');
        };

        // PICK NOTE TO ADD IN FOLDER 
        loadNoteToFolderBtn.addEventListener('click', function () {
            returnBtn.setAttribute('data-return', 'folder-section');
            checkSelect('no');
            var notesArray = getNotesArray();
            if (notesArray.length == 0) { //if there is no note create yet
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
                    isoLayout();
                    AddNoteToFolderBtn.classList.add('show');
                } else {
                    displayMsg('show', 'fullnoteforfolder');
                    loadNoteToFolderBtn.style.display = "none";
                }
            }


        });

 
        // CLOSE
        // CLOSE ADD NOTE
        closeAddNote.onclick = function () {
            dis = 0; //reset position FORM CONTROL (***)
            var overlayShowed = document.querySelector('.show_overlay .form-input');
            overlayShowed.style.transform = "translateX(0%)";//reset position FORM CONTROL (***)
            processOverlay(addNoteOverLay, 'no');

            addNoteInput.forEach(input => {
                input.removeAttribute('placeholder');
            });
        };
        // CLOSE EDIT NOTE 
        closeEditNote.onclick = function () {
            dis = 0;//reset position FORM CONTROL (***)
            var overlayShowed = document.querySelector('.show_overlay .form-input');
            overlayShowed.style.transform = "translateX(0%)";//reset position FORM CONTROL (***)
            processOverlay(editNoteOverLay, 'no');
            editNoteInput.forEach(input => {
                input.removeAttribute('placeholder');
            });
        };
        // CLOSE FOLDER OVER LAY
        closesubmitFolderBtn.onclick = function () {
            processOverlay(folderOverLay, 'no');
            folderInput.setAttribute('placeholder', "Folder Name");  
        };
        //CLOSE CONFIRM DELETE
        closeConfirmDel.onclick = function () {
            processOverlay(confirmDelOverLay, 'no');
        };
        // END OVERLAY
        // SELECT FOLDER 
        const selectMany = () => {
            // let isSelect = true; 

            return () => {
                selectFolder.classList.toggle('active'); //toggle state 

                const folders = document.querySelectorAll('.list .folder');
                if (selectFolder.classList.contains('active')) {//if select folder is click 


                    folders.forEach(folder => {
                        folder.removeEventListener('click', showFolderSection, true); // remove  showFolderSection as click handler

                        folder.addEventListener('click', processSelect, true); // add process select as click handler
                    });


                } else { //reverse
                    // selectFolder.classList.remove('active');

                    folders.forEach(folder => {
                        folder.classList.remove('selected');
                        folder.addEventListener('click', showFolderSection, true );

                        folder.removeEventListener('click', processSelect, true);
                    });

                }
            //    isSelect = !isSelect; //toggle state
            }
        };
        selectFolder.addEventListener('click', selectMany());


    });
    // END INITIAL

},false);

// ISO 
function isoLayout() {

    var iso = new Isotope( contentList, {
        percentPosition: true,
        itemSelector: ".list-item",
        masonry: {
            columnWidth: '.list-item',
            gutter: '.gutter-sizer',
            horizontalOrder: true
        }
        });
        iso.layout();
}

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
// CHECK SELECTED (use for toggle state for btn when there is a select item (note, folder , note in folder , ....) , will disable all state if pass argument 'no')
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
//CHECK ITEM EDIT (to see if item select is note or folder to display the correct form)
function checkItemEdit() {
    var selected = document.querySelector('.selected');
    var key = selected.getAttribute('id');
    if (selected.classList.contains('note')) {
        processOverlay(editNoteOverLay, 'yes');
        addFormEdit(key);
        // BTN FOR EDIT
        nextBtnEdit.style.opacity = '1';
        prevBtnEdit.style.opacity = '0';
    } else if (selected.classList.contains('folder')) {
        processOverlay(folderOverLay, 'yes');
        const folderTitle = document.querySelector('#folder-title');
        folderTitle.value = key;
        submitFolderBtn.value = "Rename";
        submitFolderForm.setAttribute('data-submit', 'edit');
    }
}
    // NOTE
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
    // UPDATE ALL NOTE LIST TO DOM
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

        note.setAttribute('class', 'note list-item');
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
    // LOAD NOTE TO FOLDER (folder-section)
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
            isoLayout();
        }


    }
    // ADD NOTE TO FOLDER (folder-section)
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
    // ADD ACTIVE COLOR IN EDIT
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
    function updateEditNote(array) {

        var key = document.querySelector('li.selected').getAttribute('id');
        var note = JSON.parse(localStorage[key]);

        const noteTitle = document.querySelector('#edit-note-title').value;
        const noteContent = document.querySelector('#edit-note-content').value;
        const noteTag = document.querySelector('#edit-note-tag').value;
        var dateValue = getCurrentTime();
        var colorPick = document.querySelector('.edit-note-overlay .color-picker .active');
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

        
        updateNoteDOM(array);
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
    //REMOVE FOLDER 
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
    // REMOVE NOTE FROM FOLDER (folder-section)
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



    // UNIQUE NOTE ARRAY
    function uniqueNote(notesArray) {
        var folderName = document.querySelector('.folder-section__title h2').innerHTML;
        var foldersArray = getFoldersArray();
        var folder = foldersArray.find(obj => obj.title == folderName);
        
        var difference = notesArray.filter(key => !folder.list.includes(key));
        
        return difference;
    }

    // FOLDER
    // UPDATE ALL FOLDER TO DOM
    function updateFolderDOM() {
        removeFragmentChild();

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
        folder.setAttribute('class', 'folder list-item');
        var img = document.createElement('img');
        img.setAttribute('src' , "img/mobile/folder.png");
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

        updateFolderDOM();
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

    // FOLDER SECTION
    // SHOW FOLDER SECTION
    function showFolderSection(e) {
        var folderName = e.target.id;
        //if click in span get id of its parent
        if (e.target.tagName.toLowerCase() == "span") {
            folderName = e.target.parentNode.id;
        }

    
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


    // PROCESS OVERLAY (convention)
    function processOverlay(whichone, display) {
        if (display == 'no') {
            whichone.classList.remove('show_overlay');
        } else if (display == 'yes') {
            whichone.classList.add('show_overlay');
        }
    }
    // PROCESS SELECT (handler for click event in folder )
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
    // handler for click event of theme btn (html)
function switchTheme() {
    if (document.body.classList.contains('dark')) {
        document.body.classList.replace('dark', 'light');
        saveTheme();
    } else if (document.body.classList.contains('light')) {
        document.body.classList.replace('light', 'dark');
        saveTheme();
    }
}
// (use for save favorite theme of user )
function saveTheme() {
    var theme = document.body.classList.value;
    localStorage.setItem('theme', theme);
}

