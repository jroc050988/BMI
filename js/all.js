
//宣告
var content = document.querySelector(".content");
var input_height = document.querySelector(".input_height");
var input_weight = document.querySelector(".input_weight");
var keika_bmi = document.querySelector(".keika_bmi");
var submit = document.querySelector(".submit");
var maru = document.querySelector(".maru");
var keika = document.querySelector(".keika");
var keikaBmi = document.querySelector(".keikaBmi");
var loop = document.querySelector(".loop");
var Bmi = 0;
var Sta ="";
var data = JSON.parse(localStorage.getItem("list")) || [
    // {
    //     Height:180,
    //     Weight:70,
    //     Bmi:20.90,    
    //     Date:"06-19-2017",
    //     Status:"理想",
    // }
]
var clear = document.querySelector(".clear");


//bmi計算 
function BMI(e){
    e.preventDefault();
    keika.innerHTML = "";
    var height = input_height.value/100;
    var weight = input_weight.value;
    Bmi = Math.round(weight/(height*height) * 100)/ 100;
    console.log(Bmi);
    if(Bmi<18.5){
        Sta="過輕";
        keikaCount("過輕",Bmi);
        keika.setAttribute("class","keika keikauw");
    }else if(18.5 <= Bmi && Bmi < 24){
        Sta="理想";
        keikaCount("理想",Bmi);
        keika.setAttribute("class","keika keikanw");
    }else if(24 <= Bmi && Bmi < 27){
        Sta="過重";
        keikaCount("過重",Bmi);
        keika.setAttribute("class","keika keikaow");
    }else if(27 <= Bmi && Bmi < 30){
        Sta="輕度肥胖";
        keikaCount("輕度肥胖",Bmi);
        keika.setAttribute("class","keika keikaso");
    }else if(30 <= Bmi && Bmi < 35){
        Sta="中度肥胖";
        keikaCount("中度肥胖",Bmi);
        keika.setAttribute("class","keika keikamo");
    }else if(Bmi >= 35){
        Sta="重度肥胖";
        keikaCount("重度肥胖",Bmi);
        keika.setAttribute("class","keika keikaeo");
    }else{
        alert("請輸入正確數字");
        input_height.value = "請輸入身高";
        input_weight.value = "請輸入體重";
        return;
    }
    submit.classList.add("none");
    keika.classList.remove("none");
    //重新計算
    var loop = document.querySelector(".loop");
    loop.addEventListener("click",display);
    local();
}

function keikaCount(i,z){
    keika.innerHTML = 
    '<div class="maru"><div class="keika_bmi">'
    + z +
    '</div><div class="keikaBmi" style="font-size: 14px;">BMI</div><div class="loop"></div></div><div class="monzi">'
    + i +
    '</div>';
}

function display(){
    input_height.value = "請輸入身高";
    input_weight.value = "請輸入體重";
    keika.classList.add("none");
    submit.classList.remove("none");
}
//清除value
function none(){
    this.value = "";
}
function block(e){
    if(this.value !== "" ){return};
    if(e.target.className == "input_height"){
        this.value = "請輸入身高"; 
    }else if(e.target.className == "input_weight"){
        this.value = "請輸入體重"; 
    }      
}


submit.addEventListener("click",BMI);
input_height.addEventListener("click",none);
input_height.addEventListener("blur",block);
input_weight.addEventListener("click",none);
input_weight.addEventListener("blur",block);



//localstorge
showlist();
function local(){
    
    var now = new Date();
    console.log(now.getDate());
    var Day = (now.getMonth()+1) +"-"+ now.getDate() +"-"+ now.getYear();
    data.push(
        {
            Height:input_height.value,
            Weight:input_weight.value,
            Bmi:Bmi,
            Date: Day,
            Status: Sta,
        }
    );
    localStorage.setItem("list",JSON.stringify(data));
    showlist();
    
}
//紀錄內容
function showlist(){
    content.innerHTML = "";
    for(var i=0;i<data.length;i++){
        switch(data[i].Status){
            case "過輕":
                show(i,"kiroku uw");
                break;
            case "理想":
                show(i,"kiroku nw");
                break;
            case "過重":
                show(i,"kiroku ow");
                break;
            case "輕度肥胖":
                show(i,"kiroku so");
                break;
            case "中度肥胖":
                show(i,"kiroku mo");
                break;
            case "重度肥胖":
                show(i,"kiroku eo");
                break;
        }
    }
}
function show(i,z){
    //建立DOM元素        
    var kiroku = document.createElement("ul");        
    var sta = document.createElement("li");
    var bmi = document.createElement("li");
    var weight = document.createElement("li");
    var height = document.createElement("li");
    var date = document.createElement("li");
    //加入屬性
    kiroku.setAttribute("class",z); //判斷體重是否正常賦予屬性
    sta.setAttribute("class","status");
    bmi.setAttribute("class","bmi");
    weight.setAttribute("class","weight");
    height.setAttribute("class","height");
    date.setAttribute("class","date");
    //加入文字內容
    sta.textContent = data[i].Status;
    bmi.textContent = data[i].Bmi;
    weight.textContent = data[i].Weight+"kg";
    height.textContent = data[i].Height+"cm";
    date.textContent = data[i].Date;
    //加入子節點
    content.appendChild(kiroku);
    kiroku.appendChild(sta);
    kiroku.appendChild(bmi);
    kiroku.appendChild(weight);
    kiroku.appendChild(height);
    kiroku.appendChild(date); 
}
function clearlocal(){
    data = [];
    localStorage.setItem("list",JSON.stringify(data));
    showlist();
}
clear.addEventListener("click",clearlocal)