/*
    jquery.screenSlide.js    全屏滑动插件
    @author zhengchj
    @mail zhengchj@neusoft.com

    example    $(选择器).screenSlide({
            duration:      滑动效果持续时间（默认500ms）
            easing：    滑动效果（linear,ease,ease-in,ease-out,ease-in-out  默认ease）
            loop：      是否循环（默认true）
            keyboard ： 是否键盘触发滑动效果（默认true）
            index:      初始页面展示图片的索引（默认1）
            direction： 水平或者垂直滑动（默认vertical【垂直】   horizontal【水平】）
            afterSlide： 滑动之后的回调函数

    })



*/
(function($){


    $.fn.screenSlide=function(options){
        var defaults={
            duration:500,
            easing:"ease",
            loop:true,
            keyboard:true,
            index:1,
            direction:"vertical",//horinzontal
            afterSlide:""
        }
        var options= $.extend(defaults,options||{});
        $(this).data("currentIndex",options.index);
        $(this).data("totalPage",$(this).find(".section").length);
        $(this).data("canSlide",true);
        $(this).css("transition","all "+options.duration+"ms "+options.easing);
        var translate="";
        if(_ifVertical(options.direction)){
            translate="translateY(0px)";
        }else{
            translate="translateX(0px)";
            _initLayout($(this));
        }
        $(this).css("transform",translate);
        _initPage($(this).find(".section").length,options.direction,options.index);
        _initEvent($(this),options);

    }
    //若水平滑动重新布局
    function _initLayout(target){
        var _totalPage=target.data("totalPage");
        target.css({
            width:_totalPage*100+"%"
        });
        target.find(".section").css({
            float:"left",
            width:(100/_totalPage).toFixed(2)+"%"
        })
    }
    //初始化分页
    function _initPage(totalPage,direction,index){
        var ulClass="";
        if(_ifVertical(direction)){
            ulClass="screen-slide-vertical-page";
        }else{
            ulClass="screen-slide-horizontal-page";
        }
        var html="<ul class='"+ulClass+"'>";
        for(var i=0;i<totalPage;i++){
            html+="<li class></li>";
        }
        html+="</ul>";
        $("body").append(html);
        if(index>totalPage||index<1)
            index=1;
        $("."+ulClass).find("li").eq(index-1).addClass("active");
    }
    //向上滑动
    function _prev(target,options){
        var _currentIndex=target.data("currentIndex");
        var _totalPage=target.data("totalPage");
        if(_currentIndex==1){
            if(options.loop){
                target.data("currentIndex",_totalPage);
                _slide(target,options);
            }
        }else{
            target.data("currentIndex",_currentIndex-1);
            _slide(target,options);
        }
    }
    //向下滑动
    function _next(target,options){
        var _currentIndex=target.data("currentIndex");
        var _totalPage=target.data("totalPage");
        if(_currentIndex==_totalPage){
            if(options.loop){
                target.data("currentIndex",1);
                _slide(target,options);
            }
        }else{
            target.data("currentIndex",_currentIndex+1);
            _slide(target,options);
        }
    }
    //初始化绑定事件
    function _initEvent(target,options){
        if(options.keyboard){
            $(window).keydown(function(e){
                if(target.data("canSlide")){
                    if(e.keyCode=="37"|| e.keyCode=="38"){
                        _prev(target,options);
                    }else if(e.keyCode=="39"|| e.keyCode=="40"){
                        _next(target,options);
                    }
                }
            })
        }
        $(window).on("mousewheel DOMMouseScroll",function(e){
            if(target.data("canSlide")){
                var delta= e.originalEvent.wheelDelta|| -e.originalEvent.detail;
                if(delta>0){
                    _prev(target,options);
                }else{
                    _next(target,options);
                }
            }
        })
        target.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend",function(){
            target.data("canSlide",true);
            if(options.afterSlide&&typeof(options.afterSlide)=="function"){
                options.afterSlide();
            }
        })
    }
    //执行滑动效果
    function _slide(target,options){
        target.data("canSlide",false);
        var _index=target.data("currentIndex");
        var _position=target.find(".section").eq(_index-1).position();
        var translate=_ifVertical(options.direction)?"translateY(-"+_position.top+"px)":"translateX(-"+_position.left+"px)";
        target.css("transform",translate);
        $("[class^='screen-slide-']").find("li").eq(_index-1).addClass("active").siblings().removeClass("active");
    }
    //是否是垂直滑动
    function _ifVertical(direction){
        if(direction=="vertical")
            return true;
        else
            return false;
    }


})(jQuery);