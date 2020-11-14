var father=document.getElementById("father");
var x=0;//背景图片距离X轴的大小
var fly=true;//定义小鸟是否存活
var bird=document.getElementById("bird");
//获取遮罩层
var mask=document.getElementById("mask");
//获取失败后fail
var fail=document. getElementById("fail");
//计数
var result=document.getElementById("result");
var count=0;
//创建一个小鸟的对象
var birds={
    x:bird.offsetLeft,
    y:bird.offsetTop,
    step:0//小鸟加速度
};
var time=setInterval(function(){
    if(x<-1000){
      x=0;
    }
    x=x-2;
    birds.step+=1;
    birds.y=birds.y+birds.step;
    if(birds.step>=10){
       birds.step=-10;
       birds.y=birds.step+birds.y;
    }
    bird.style.top=birds.y+"px";
    father.style.backgroundPositionX=x+"px";
},30);
var now=document.getElementById("now");
now.onclick=function(){
    now.style.display="none";
    clearInterval(time);
    birds.step=0;
    var timer=setInterval(function(){
        if(fly){
            x-=5;
            father.style.backgroundPositionX=x+"px";
            birds.x=50;
            bird.style.left=birds.x+"px";
            birds.y=birds.step+birds.y;
            birds.step+=1;
            if(birds.y<=0){
                fly=false;
                mask.style.display="block";
                fail.style.display="block";
            }
            if(birds.y>=570){
                fly=false;
                mask.style.display="block";
                fail.style.display="block";
            }
            bird.style.top=birds.y+"px";
        }
       
    },30);
    //点击屏幕让小鸟持续上升
    father.onclick=function(){
        birds.step-=10;
    }
    //创建一个柱子对象
    var creatzz=function(x){
        var zz={
            x:0,
            sheight:0,
            xheight:0
        }
        zz.x=x;
        zz.sheight=50+Math.floor(Math.random()*200);
        zz.xheight=600-150-zz.sheight;
    //创建上边柱子
        var news=document.createElement("div");
        news.style.height=zz.sheight+"px";
        news.style.width="52px";
        news.style.top="0px";
        news.style.left=zz.x+"px";
        news.style.position="absolute";
        news.style.background="url(images/pipe2.png) no-repeat center bottom";
        father.appendChild(news);
        //创建下边柱子
        var newx=document.createElement("div");
        newx.style.height=zz.xheight+"px";
        newx.style.width="52px";
        newx.style.top=zz.sheight+150+"px";
        newx.style.left=zz.x+"px";
        newx.style.position="absolute";
        newx.style.background="url(images/pipe1.png)";
        father.appendChild(newx);
        //柱子计时器
        setInterval(function(){
            if(fly){
             zz.x-=5;
             news.style.left=zz.x+"px";
             newx.style.left=zz.x+"px";
             if(zz.x<=-52){
                 zz.x=1450;
            }
             //计算小鸟穿过柱子的数量
             if(zz.x>=0 && birds.x>=zz.x+50){
                count ++;
              }
           //判断小鸟是否碰见柱子
           var ucheck=birds.x+30>zz.x&&birds.x<zz.x+52&&birds.y<zz.sheight;
           var dcheck=birds.x+30>zz.x&&birds.x<zz.x+52&&birds.y+30>=zz.sheight+150;
           if(ucheck||dcheck){
               fly=false;
               mask.style.display="block";
               fail.style.display="block";
               result.innerHTML = count;
           }
        }
           
        },30);
    }
    creatzz(200);
    creatzz(500);
    creatzz(800);
    creatzz(1100);
    creatzz(1400);

}

