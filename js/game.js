 resize();
 window.onresize = resize;
 window.onload = function() {
     var imgList = document.getElementById("gameul");
     var imgListWidth = ($("#gameul li").width() + 20) / window.rem;
     //滑动处理  
     var startX, startY;
     imgList.addEventListener('touchstart', function(ev) {
         startX = ev.touches[0].pageX;
         startY = ev.touches[0].pageY;
     }, false);
     imgList.addEventListener('touchend', function(ev) {
         var endX, endY;
         endX = ev.changedTouches[0].pageX;
         endY = ev.changedTouches[0].pageY;
         var direction = GetSlideDirection(startX, startY, endX, endY);
         var left = parseInt($("#gameul").css("left")) / window.rem;

         switch (direction) {
             case 0:
                 //alert("没滑动");  
                 break;
             case 1:
                 //alert("向上");  
                 break;
             case 2:
                 //alert("向下");  
                 break;
             case 3:
                 left = left * 1 - imgListWidth;
                 $("#gameul").animate({ left: left + "rem" }, 600, function() {
                     $("#gameul").append($("#gameul li:first-child").first());
                     $("#gameul").css("left", "-25.234375rem");
                 });
                 break;
             case 4:
                 left = left * 1 + imgListWidth;
                 $("#gameul").animate({ "left": left + "rem" }, 600, function() {
                     $("#gameul").prepend($("#gameul li:last-child").first());
                     $("#gameul").css("left", "-25.234375rem");
                 });
                 break;
             default:
         }
     }, false);
 }

 function resize() {
     var dpr, rem, scale;
     var docEl = document.documentElement;
     var metaEl = document.querySelector('meta[name="viewport"]');
     var window_width = screen.width > 768 ? 768 : screen.width;

     dpr = window.devicePixelRatio || 1;
     scale = 1 / dpr;
     rem = window_width * dpr / 10;
     // 设置viewport，进行缩放，达到高清效果
     metaEl.setAttribute('content', 'width=' + dpr * window_width + ',initial-scale = ' + scale + ', maximum-scale = ' + scale + ',minimum-scale = ' + scale + ', user-scalable = no ');
     // 设置data-dpr属性，留作的css hack之用
     docEl.setAttribute('data-dpr', dpr);
     // 动态写入样式
     docEl.style.fontSize = rem + 'px';
     // 给js调用的，某一dpr下rem和px之间的转换函数
     window.rem2px = function(v) {
         v = parseFloat(v);
         return v * rem;
     };
     window.px2rem = function(v) {
         v = parseFloat(v);
         return v / rem;
     };
     window.dpr = dpr;
     window.rem = rem;
 }

 //返回角度  
 function GetSlideAngle(dx, dy) {
     return Math.atan2(dy, dx) * 180 / Math.PI;
 }
 //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动  
 function GetSlideDirection(startX, startY, endX, endY) {
     var dy = startY - endY;
     var dx = endX - startX;
     var result = 0;

     //如果滑动距离太短  
     if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
         return result;
     }

     var angle = GetSlideAngle(dx, dy);
     if (angle >= -45 && angle < 45) {
         result = 4;
     } else if (angle >= 45 && angle < 135) {
         result = 1;
     } else if (angle >= -135 && angle < -45) {
         result = 2;
     } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
         result = 3;
     }

     return result;
 }
