//Declaring classes
class stopWatch{
    
    constructor(){
        this.sec=0;
        this.min=0;
        this.hr=0;
       //console.log(this.sec);
       this.interval=null;     
    }
   

     timeConversion()
    {
        this.sec++;
        console.log(Number(this.sec));
    
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
let obj;
let isOn=false;
let isStop=false;
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
}
resetBtn.onclick=function(){
    obj.resetTimer();
    startBtn.innerHTML="Start";   
}
lapBtn.onclick=function(){
    
}