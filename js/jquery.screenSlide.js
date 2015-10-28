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
        _initPage();

    }
    function _initPage(){

    }
    function _prev(){

    }
    function _next(){

    }
    function _initEvent(){

    }


})(jQuery);