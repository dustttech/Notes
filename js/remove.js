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


        //     CLOSURE
                // var counter = function(value) {
        //     // BTN FOR ADD
        //     prevBtnAdd.style.opacity = '0';
        //     // BTN FOR EDIT
        //     prevBtnEdit.style.opacity = '0';

        //     var arr = [0,25,50,75];
        //     var dis = +value || 0;
        //     function changeBy(val) {
        //         dis += val;

        //         // BTN FOR ADD
        //         dis == 0 ? (prevBtnAdd.style.opacity = '0',prevBtnEdit.style.opacity = '0') 
        //         : (prevBtnAdd.style.opacity = '1',prevBtnEdit.style.opacity = '1');      
        //         // BTN FOR EDIT
        //         dis == 3 ? (nextBtnAdd.style.opacity = '0',nextBtnEdit.style.opacity = '0') 
        //         : (nextBtnAdd.style.opacity = '1',nextBtnEdit.style.opacity = '1');               


        //         if (dis > arr.length - 1) {
        //             dis = arr.length - 1;
        //         } else if (dis < 0) {
        //             dis = 0;
        //         }
        //     }
        //     return {
        //         next: function() {
        //         changeBy(1);
        //         },
        //         prev: function() {
        //         changeBy(-1);
        //         },
        //         value: function() {
        //         return arr[dis];
        //         }
        //     };
        // };

        // var counterAdd = counter();
        // var counterEdit = counter();