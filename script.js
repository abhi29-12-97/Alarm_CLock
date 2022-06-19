//setting up current time and based on current time adding the light and dark theme to the clock
let currentTime=document.querySelector("#current-time p");
let main=document.querySelector('main');

//define array
const arr=[];


//add 0 in front of elements which are less than 0 in minute and seconds
function check(i){
    if(i<10 && i!=00){
        i="0"+i;
    }
    return i;
}


//clock function which is used to show the current time in the div with id current-time and inside it we are calling check function so in order to append 0 in front of hour minute and seconds also setTimeout function to display the seconds.
function clock(){
    //getting the current date and differentiating them in hour,seconds,minutes format
    let today=new Date();
    let hour=today.getHours();
    let minute=today.getMinutes();
    let seconds=today.getSeconds();
    minute=check(minute);
    seconds=check(seconds);
    hour=check(hour);
    let text=hour +":"+minute+":"+seconds;
   //if the time is less than 11:59:59 appending am to the clock
    if(hour<=11 && minute<=59 && seconds<=59){
        currentTime.innerHTML=text+"am";
    }
    //else appending pm to the current time
    else{
        currentTime.innerHTML=text+"pm";
    }
    //applying dark theme between 6pm to 6 am
    if(hour<=6 || hour>=18){
        main.classList.add('dark');
    }
    //applying light theme between 6am to 6pm
    else{
        main.classList.add('light');
    }
    t = setTimeout(function() {
        clock();
        callAlarm(text);
    }, 1000);
}
//calling the clock and setValues function
clock();
setvalues();

//setting default value of the set alarms input field
function setvalues(){
    let h=document.querySelector("#hour");
    let m=document.querySelector("#minute");
    let s=document.querySelector("#seconds");
    let tz=document.querySelector("#timezone");
    h.value="00";
    m.value="00";
    s.value="00";
}

//call alarm function to create the window alert
function callAlarm(text){
    for( let i = 0; i < arr.length; i++){ 
        if ( arr[i] === text) {
            window.alert("ALARM")
        }
    }
}

//deleting element from the array when the tag is removed from the browser
function deleteElement(text){
    for( let i = 0; i < arr.length; i++){ 
        if ( arr[i] === text) { 
            arr.splice(i, 1);
        }
    }
}

//getting the innerhtml values from the set alarm div
let setAlarmButton=document.querySelector("#set-button");
setAlarmButton.addEventListener("click",function(e){
    e.preventDefault();
    //getting the inner html value of the input fields.
    let h=document.querySelector("#hour").value;
    let m=document.querySelector("#minute").value;
    let s=document.querySelector("#seconds").value;
    let tz;
    //appending 0 to the inner text
    h=check(h);
    m=check(m);
    s=check(s);
    //check if the input is correct or not
    if(h>=24 || m>=60 || s>=60){
        window.alert("Wrong Input");
        setvalues();
        return;
    }
    //check about the hours whether it's am or PM
    if(h>=12 || h<=00){
        tz="PM";
    }else{
        tz="Am";
    }
    //declaring the tag
    var tag=document.createElement("p");
    //adding text value
    let text=h+":"+m+":"+s;
    //creating node for the value to append in the dom
    let finalText=document.createTextNode(text+" "+tz);
    //appending text to the tag
    tag.appendChild(finalText);
    //adding button afer every alarm created
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'DELETE';
    button.className = 'btn-styled';
 
    button.onclick = function() {
        //if delete is called removing the element from the array
        deleteElement(text);
        element.removeChild(tag);
    };
    //appending button to the tag
    tag.appendChild(button);

    var element=document.querySelector("#alarm-list");
    //appending tag to the HTML DOM element
    element.appendChild(tag);
    //resetting the values
    setvalues();

    //adding the text tag in array
    arr.push(text);
});
