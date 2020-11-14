var canvas = document.getElementById("canvas");
var text=document.getElementById("text");
var cxt = canvas.getContext("2d");
//每个小方块之间的间距
var margin = 20;
//小方块的宽度
var rectwidth = (600 - margin * 5) / 4;
//创建数字二维数组
var textobj = [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
//判断游戏是否结束
var checkfull=function(){
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(textobj[i][j]==0){
                return false;
            }
        }
    }
    return true;
}
//获取最大值
function maxarr(){
    var num=0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(num<textobj[i][j]){
                num=textobj[i][j];
            }
        }
        return num;
    }
}
//刻画小方块
function rect() {
    
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (textobj[j][i] == 0) {
                cxt.beginPath();
                var x = margin * (i + 1) + rectwidth * i; //小方块X轴坐标
                var y = margin * (j + 1) + rectwidth * j; //小方块Y轴坐标
                cxt.fillStyle = "pink";
                cxt.fillRect(x, y, rectwidth, rectwidth);
                cxt.closePath();
            } else {
                cxt.beginPath();
                var x = margin * (i + 1) + rectwidth * i;
                var y = margin * (j + 1) + rectwidth * j;
                cxt.fillStyle = "skyblue";
                cxt.fillRect(x, y, rectwidth, rectwidth);
                cxt.closePath();
                //刻画文字
                cxt.font = "50px 华文楷体";
                var th = 20; //文字高度
                cxt.fillStyle = "pink";
                var textwidth = cxt.measureText(textobj[j][i]).width; //文字宽度
                var tx = (rectwidth - textwidth) / 2; //文字左下角X轴坐标
                var ty = (rectwidth - th) / 2 + th; //文字左下角Y轴坐标
                cxt.fillText(textobj[j][i], tx + x, ty + y);
            }
        }
    }
  var maxnum=maxarr();
  text.innerHTML="您的分数:"+maxnum;
    if(checkfull()){
        if(chevkcanmove()){

        }else{
            alert("游戏结束 ＧＡＭＥ　ＯＶＥＲ,您的分数为："+maxnum);
        }
    }
}
rect();
//键盘监听事件
document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 37:
            toleft();
            break;
        case 38:
            totop();
            break;
        case 39:
            toright();
            break;
        case 40:
            tobottom();
            break;
    }
})
//复制数组的方法
var copyarr = function () {
    var arrsave = [
        [],
        [],
        [],
        []
    ]
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            arrsave[i][j] = textobj[i][j];
        }
    }
    return arrsave;
}

function totop() {
    var arrsave = copyarr();
    //清零算法
    var clearzero = function () {
        var col = []; //保存不为0的数字
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (arrsave[j][i] != 0) {
                    col.push(arrsave[j][i]); //将不为0的数字添加到col数组里
                }
            }
            for (var k = 0; k < 4; k++) {
                if (k < col.length) {
                    arrsave[k][i] = col[k];
                } else {
                    arrsave[k][i] = 0;
                }
            }
            col = [];
        }
    }
    clearzero();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var nownum = arrsave[j][i]; //保存当前数字
            var nextnum; //保存下一个数字
            if (j < 3) {
                nextnum = arrsave[j + 1][i];
            } else {
                nextnum = 0;
            }
            if (nextnum == 0) {
                continue;
            }
            //叠加数字
            if (nownum == nextnum && nextnum != 0) {
                arrsave[j][i] *= 2;
                arrsave[j + 1][i] = 0;
            }
        }
    }
    clearzero();  
    var ismove=checkmove(arrsave);
    textobj=arrsave;
    if(ismove){
        addbox();
    }
    rect();  
    console.log(arrsave);
}

function tobottom() {
    var arrsave = copyarr();
    //清零算法
    var clearzero = function () {
        var col = []; //保存不为0的数字
        for (var i = 0; i < 4; i++) {
            for (var j = 3; j >-1; j--) {
                if (arrsave[j][i] != 0) {
                    col.push(arrsave[j][i]); //将不为0的数字添加到col数组里
                }
            }
            for (var k = 0; k < 4; k++) {
                if (k < col.length) {
                    arrsave[3-k][i] = col[k];
                } else {
                    arrsave[3-k][i] = 0;
                }
            }
            col = [];
        }
    }
    clearzero();
    //arrsave.reverse();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var nownum = arrsave[3-j][i]; //保存当前数字
            var nextnum; //保存下一个数字
            if (j < 3) {
                nextnum = arrsave[2-j][i];
            } else {
                nextnum = 0;
            }
            if (nextnum == 0) {
                continue;
            }
            //叠加数字
            if (nownum == nextnum && nextnum != 0) {
                arrsave[3-j][i] *= 2;
                arrsave[2-j][i] = 0;
            }
        }
    }
    clearzero();
    var ismove=checkmove(arrsave);
    textobj=arrsave;
    if(ismove){
        addbox();
    }
    rect();
    //arrsave.reverse();
    console.log(arrsave);
}

function toleft() {
    var arrsave = copyarr();
    //清零算法
    var clearzero = function () {
        var col = []; //保存不为0的数字
        for (var i = 0; i < 4; i++) {
            for (var j = 3; j >-1; j--) {
                if (arrsave[i][j] != 0) {
                    col.push(arrsave[i][j]); //将不为0的数字添加到col数组里
                }
            }
            for (var k = 0; k < 4; k++) {
                if (k < col.length) {
                    arrsave[i][k] = col[k];
                } else {
                    arrsave[i][k] = 0;
                }
            }
            col = [];
        }
    }
    clearzero();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var nownum = arrsave[i][3-j]; //保存当前数字
            var nextnum; //保存下一个数字
            if (j < 3) {
                nextnum = arrsave[i][2-j];
            } else {
                nextnum = 0;
            }
            if (nextnum == 0) {
                continue;
            }
            //叠加数字
            if (nownum == nextnum && nextnum != 0) {
                arrsave[i][3-j] *=2;
                arrsave[i][2-j] =0;
            }
        }

    }
    clearzero();
    var ismove=checkmove(arrsave);
    textobj=arrsave;
    if(ismove){
        addbox();
    }
    rect();
    console.log(arrsave);
}

function toright() {
    var arrsave = copyarr();
    //清零算法
    var clearzero = function () {
        var col = []; //保存不为0的数字
        for (var i = 0; i < 4; i++) {
            for (var j = 3; j >-1; j--) {
                if (arrsave[i][j] != 0) {
                    col.push(arrsave[i][j]); //将不为0的数字添加到col数组里
                }
            }
            for (var k = 0; k < 4; k++) {
                if (k < col.length) {
                    arrsave[i][3-k] = col[k];
                } else {
                    arrsave[i][3-k] = 0;
                }
            }
            col = [];
        }
    }
    clearzero();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var nownum = arrsave[i][3-j]; //保存当前数字
            var nextnum; //保存下一个数字
            if (j < 3) {
                nextnum = arrsave[i][2-j];
            } else {
                nextnum = 0;
            }
            if (nextnum == 0) {
                continue;
            }
            //叠加数字
            if (nownum == nextnum && nextnum != 0) {
                arrsave[i][3-j] *=2;
                arrsave[i][2-j] =0;
            }
        }

    }
    clearzero();
    var ismove=checkmove(arrsave);
    textobj=arrsave;
    if(ismove){
        addbox();
    }
    rect();
    console.log(arrsave);
}
//检查数组是否移动
var checkmove=function(testarr){
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(testarr[i][j]==textobj[i][j]){
              
            }else{
                return true;
            }
        }
    }
    return false;
}
//新增一个小方块
var addbox=function(){
    var count=[];
    var x,y,random;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
           if(textobj[i][j]==0){
            x=i;
            y=j;
            count.push(
                {
                    x:x,
                    y:y
                }
            )
           }
        }
    }
    random=parseInt(Math.random()*count.length) ;
    textobj[count[random].x][count[random].y]=2;
}

//判断小方块是否可以移动
var chevkcanmove=function(){
    var i=0;
    var j=0;
    var point=textobj[i][j];
    //var canmove=false;
    var lefter,righter,top,bottom;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            point=textobj[i][j];
            if(j-1>-1){
                lefter=textobj[i][j-1];
            }
            if(i-1>-1){
                top=textobj[i-1][j];
            }
            if(j+1<4){
                righter=textobj[i][j+1];
            }
            if(i+1<4){
                bottom=textobj[i+1][j];
            }
            if(lefter && lefter==point){
                return true;
            }
            if(top && top==point){
                return true;
            }
            if(righter && righter==point){
                return true;
            }
            if(bottom && bottom==point){
                return true;
            }
            lefter=false;
            righter=false;
            top=false;
            bottom=false;
        }
    }
    return false;
    
}