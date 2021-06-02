//calling showtask function to show the values previously in loc strg
showTask();
//getting elements by id
let addtaskbtn = document.getElementById("addtaskbtn")
let addtaskinput = document.getElementById("addtaskinput")

//adding event listener to the add task button
addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value; //getting value entered by the user
    if(addtaskinputval.trim() != 0){

        let webTask = localStorage.getItem("localTask"); //getting values in localstorage
    
        //checking if localstoragge is empty or not
        //if empty then create empty array
        if(webTask == null){
            taskObj = [];
        }
        //if not empty take values in localstorage in the taskobj array
        else{
            taskObj = JSON.parse(webTask);
        }
        //push the value entered by user in the array
        taskObj.push(addtaskinputval);
    
        //set the localstorage and add the valued pushed 
        localStorage.setItem("localTask", JSON.stringify(taskObj));
        //clearing the input field after entering value
        addtaskinput.value = '';
    }
    //show the new value in the UI
    showTask();

})

//show new value function
function showTask(){
    let webTask = localStorage.getItem("localTask");
    if(webTask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webTask);
    }
    //we are taking a variable which will hold the object value to be shown
    let inp = '';
    //getting table by id
    let addedtasklist = document.getElementById("addedtasklist")
    //now we are applying foreach loop on taskobj array to get the values dynamically
    taskObj.forEach((item, index) => {
        inp += `<tr>
                    <th>${index+1}</th>
                    <td>${item}</td>
                    <td><button type = "button" class = "btn btn-edit" onclick = "edittask(${index})"><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type = "button" class = "btn btn-deleteone" onclick = "deletetask(${index})"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`
    });
    addedtasklist.innerHTML = inp;
}

//editask function
function edittask(index){
    let savetaskbtn = document.getElementById("savetaskbtn")
    let addtaskbtn = document.getElementById("addtaskbtn")
    let saveindex = document.getElementById("saveindex")
    saveindex.value = index;
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    //putting the value of corresponding index in the input text field
    addtaskinput.value = taskObj[index];
    //displaying save task button now and hiding add task button
    addtaskbtn.style.display = "none"
    savetaskbtn.style.display = "block"
}

//save task
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    //getting value of index from the hidden index value
    let saveindex = document.getElementById("saveindex").value;
    //updating value 
    taskObj[saveindex] = addtaskinput.value;
    savetaskbtn.style.display = 'none'
    addtaskbtn.style.display = 'block'
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    addtaskinput.value = ''
    showTask();
})

//delete task
function deletetask(index){
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    taskObj.splice(index,1);
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    showTask();
}

//delete all tasks
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    if(webTask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webTask);
        taskObj = [];
    }
    savetaskbtn.style.display = "none"
    addtaskbtn.style.display = "block"
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    showTask();


})

//search
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function(){
    //getting all the table rows
     let trlist = document.querySelectorAll('tr');
     //making trlist into array so that we can loop thru elements
     Array.from(trlist).forEach(function(item){
         let searchedtext = item.getElementsByTagName('td')[0].innerText;
         let searchtextboxval = searchtextbox.value;
         let re = new RegExp(searchtextboxval, 'gi');
         if(searchedtext.match(re)){
             item.style.display = "table-row"
         }
         else{
            item.style.display = "none"
         }
     })
})
