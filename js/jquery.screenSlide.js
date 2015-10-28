(function($){


    $.fn.screenSlide=function(options){
        var defaults={
            duration:500,
            easing:"ease",
            loop:true,
            keyboard:true,
            index:0,
            direction:"vertical",//horinzontal
            afterSlide:""
        }
        var options= $.extend(defaults,options||{});
        _initPage($(this).find(".section").length);
        _initEvent();

    }
    function _initPage(totalPage){
        var html="<ul class='screen-slide-page'>";
        for(var i=0;i<totalPage;i++){
            html+="<li class></li>";
        }
        html+="</ul>";
        $("body").append(html);
    }
    function _prev(){

    }
    function _next(){

    }
    function _initEvent(){

    }
    function _slide(){

    }


})(jQuery);