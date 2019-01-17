//Declaring classes
class stopWatch{
    
    constructor(){
        this.sec=0;
        this.min=0;
        this.hr=0;
       //console.log(this.sec);
       this.interval=null;     
       this.Lap=0;
    }
   

     timeConversion()
    {
        this.sec++;
        //console.log(Number(this.sec));
    
        if(this.sec / 60 === 1){
            this.sec = 0;
            this.min++;
        }
        if(this.min / 60 === 1){
            this.min = 0;
            this.hr++;
        }
       
        let secId=document.getElementById("sec");
        let minId=document.getElementById("min");
        let hrId=document.getElementById("hr");
         if(this.sec<10){
            secId.innerHTML="0" + this.sec;
         } 
         else{
            secId.innerHTML=this.sec;
         }
         if(this.min<10){
            minId.innerHTML="0" + this.min.toString();
         }
         else{
            minId.innerHTML=this.min;
         }
         if(this.hr<10){
             hrId.innerHTML="0" + this.hr.toString();
         }
        else{
            hrId.innerHTML=this.hr;
        }
        
    } 
    startTimer()
    {
            
            this.Lap=new Date().getTime();
            this.interval=window.setInterval(() => {
                this.timeConversion();
            }, 1000);       
    }

    stopTimer()
    {
        window.clearInterval(this.interval);
        this.interval=null;
    }
    pauseTimer()
    {    
            clearInterval(this.interval);
    }
    resetTimer()
    {
        this.sec=0;
        this.min=0;
        this.hr=0;
        this.stopTimer();
        let secId=document.getElementById("sec").innerHTML="00";
        let minId=document.getElementById("min").innerHTML="00";
        let hrId=document.getElementById("hr").innerHTML="00";
    }
    

    

}

//Declaring Variables
let startBtn=document.getElementById('btnStart');
let stopBtn=document.getElementById('btnStop');
let resetBtn=document.getElementById('btnReset');
let lapBtn=document.getElementById('btnLap');
let lapDiv=document.getElementById('laps');
let historyDiv=document.getElementById('history');
let obj;
let isOn=false;
let isStop=false;
let lapCount=null;
let lapDisplay="00:00:00";
let lapTotal="00:00:00";
let lapSec;
let lapMin;
let lapHr;
let historyData=[];


obj=new stopWatch()
 startBtn.onclick=function(){
    if(isStop === true)
     {
         obj.sec=0;
         obj.min=0;
         obj.hr=0;
         isStop=false;
     }
     if(isOn === false){
         isOn=true;
         startBtn.innerHTML="Pause";
         obj.startTimer();
     }
     else
     {
         startBtn.innerHTML="Start"
         isOn=false;
         obj.pauseTimer();
     }   
 }
stopBtn.onclick=function(){
    obj.stopTimer();
    isStop=true;
    if(isOn === true){
        startBtn.innerHTML="Start";
    }
    localStorage.setItem('status',"notRun");
}
resetBtn.onclick=function(){
    isOn=false;
    obj.resetTimer();
    startBtn.innerHTML="Start";
     let ulID=document.getElementById('ulID');
     let pushHistoryData=ulID.lastChild.textContent.slice(17,25);
    // console.log(pushHistoryData);
    for (let i = ulID.childNodes.length - 1; i >= 0; i--) {
        ulID.removeChild(ulID.childNodes[i]);
     }
    lapCount=0;
    let localStorageData=localStorage.getItem('historyData');
    if(localStorageData === "null")
    {
        historyData=[];
    }
    else
    {
        historyData=JSON.parse(localStorageData);
    }
    if(!(pushHistoryData.indexOf(' ')>=0))
    {
        historyData.push(pushHistoryData);
    }
    
    //localStorage.setItem('historyData', JSON.stringify(historyData));
    if(historyData.length>10)
    {
        (historyData.shift());
        
    }
        localStorage.setItem('historyData', JSON.stringify(historyData));
  
        let olID=document.getElementById('olID');
        for (let i = olID.childNodes.length - 1; i >= 0; i--) {
            olID.removeChild(olID.childNodes[i]);
         }
        historyData.forEach(element => {
            let newLI=document.createElement('li');
            newLI.appendChild(document.createTextNode(element));
            olID.appendChild(newLI);
        });
        localStorage.removeItem('lapDetails');
        localStorage.setItem('status',"notRun");
}
lapBtn.onclick=function(){
    console.log("lapClicked");
    if(isOn === true){
        if(lapCount<10){
            if(isStop!==true){
                let timeDifference=new Date().getTime()-(obj.Lap);
                obj.Lap=new Date().getTime();
                
                let lapDisplay=convertMiliseconds(timeDifference);
                let newLI=document.createElement('li');
                lapTotal=document.getElementById("hr").textContent + ":" +
                document.getElementById("min").textContent + ":" +
                document.getElementById("sec").textContent;
                //console.log(lapTotal);
               
                lapCount++;
                newLI.textContent="Lap " + lapCount + ":  ";
                newLI.appendChild(document.createTextNode(lapDisplay +" "+lapTotal));
                lapDiv.children[0].appendChild(newLI);     
                }
        }
        else
        {   
            
                document.getElementById("lapHeader").innerHTML="Max 10 laps";
                setTimeout(function(){
                 document.getElementById("lapHeader").innerHTML="Laps";
                 }, 3000);
    
        }  
            
    }
       
}
function convertMiliseconds(timediff)
{
    let s=0;
    let m=0;
    let h=0;
    s=parseInt(timediff/1000);
    if(timediff%1000>500)
    {
        s++;
    }
    if(s>60)
    {
        m+=parseInt(s/60);
        s=parseInt(s%60);
    }
    if(m>60)
    {
        h+=parseInt(min/60);
        m=parseInt(m%60);
    }
    if(s<10)
    {
        s="0"+s;
    }
    if(m<10)
    {
        m="0"+m;
    }
    if(h<10)
    {
        h="0"+h;
    }
    return(h+":"+m+":"+s);
}
function countNewDisplayTime(diff,dispTime){
    
    
     diffSec=parseInt(diff.slice(6,8));
     diffMin=parseInt((diff.slice(3,6)));
     diffHr=parseInt(diff.slice(0,2));
     dispTimeSec=parseInt(dispTime.slice(6,8));
     dispTimeMin=parseInt(dispTime.slice(3,6));
     dispTimeHr=parseInt(dispTime.slice(0,2));
   
    dispTimeSec+=diffSec;   
    if(dispTimeSec>60)
    {
        dispTimeMin+=parseInt(dispTimeSec/60);
        dispTimeSec=dispTimeSec%60;
        
    }
    // if(dispTimeSec<10)
    //     {
    //         dispTimeSec="0"+dispTimeSec;
    //     }
    //     dispTimeMin+=diffMin;
    if(dispTimeMin>60)
    {
        dispTimeHr+=parseInt(dispTimeMin/60);
        dispTimeMin=dispTimeMin%60;
        
    }
    // if(dispTimeMin<10)
    //     {
    //         dispTimeMin="0"+dispTimeMin;
    //     }
        dispTimeHr+=diffHr;
    // if(dispTimeHr<10)
    //     {
    //         dispTimeHr="0"+dispTimeHr;
    //     }
        obj =new stopWatch();
        obj.sec=dispTimeSec;
        obj.min=dispTimeMin;
        obj.hr=dispTimeHr;
        obj.startTimer();
    
}
window.onload = function(e){ 
    if(localStorage.getItem('historyData') === null)
     localStorage.setItem('historyData',null);
    else
    {
        let historyData=[];
        historyData=JSON.parse(localStorage.getItem('historyData'));
        let olID=document.getElementById('olID');
            if(historyData !== null){
                historyData.forEach(element => {
                    let newLI=document.createElement('li');
                    newLI.appendChild(document.createTextNode(element));
                    olID.appendChild(newLI);
                });
            }
            
    }
    var status=localStorage.getItem('status')
    if(status === "running")
    {
        if(localStorage.getItem('lapDetails') === "null")
        {
          localStorage.setItem('lapDetails',"");
        }
        else
        {
            
                let lapHistory=[];
                lapHistory=JSON.parse(localStorage.getItem('lapDetails'));
                let ulID=document.getElementById('ulID');
                lapHistory.reverse();   
                lapCount=lapHistory.length;
                console.log(lapCount);
                lapHistory.forEach(element => {
                let newLI=document.createElement('li');
                newLI.appendChild(document.createTextNode(element));
                ulID.appendChild(newLI);
            });
            var ot=new Date();
            var ct=Date.parse(localStorage.getItem('closingTime'));
            var diff=ot-ct;
            var diff=convertMiliseconds(diff);
            var dispTime=localStorage.getItem('dispTime');
            countNewDisplayTime(diff,dispTime);
        }
    
   }

}
function closeBrowser()
{
    if(isOn === true)
    {
        localStorage.setItem('status',"running");
        let lapHistory=[];
    if(localStorage.getItem('lapDetails') !== null){
        localStorage.removeItem('lapDetails');
    }
    let ulID=document.getElementById('ulID');
    
        for (let i = ulID.childNodes.length - 1; i >= 0; i--) {
            if(!((ulID.childNodes[i].textContent).indexOf(' ')>=0))
            {
                lapHistory.push(ulID.childNodes[i].textContent);
            }
            
         }
         localStorage.setItem('lapDetails',JSON.stringify(lapHistory));
        var d=new Date();
        localStorage.setItem('closingTime',d);
        let sec=document.getElementById("sec").textContent;
        let min=document.getElementById("min").textContent;
        let hr=document.getElementById("hr").textContent;
        let disTime=hr+":"+min+":"+sec;
        localStorage.setItem('dispTime',disTime);
    }
    if(isStop === true)
    {
        localStorage.setItem('status',"Norunning");
    }
    
}   

 window.onbeforeunload = function (e) {
     // Your logic to prepare for 'Stay on this Page' goes here 
     
     
     return "Please click 'Stay on this Page' and we will give you candy";
     //e.preventDefault();
        
     }
     window.addEventListener("unload", function() {
        closeBrowser();
    });