/**
 * Created by Administrator on 2017-08-14.
 */
$(document).ready(function(){
    $(".btn-week").click(function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $("#count_week").css("display","block");
        $("#count_week").siblings().css("display","none");
    });
    $(".btn-month").click(function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $("#count_month").css("display","block");
        $("#count_month").siblings().css("display","none");
    });
    $(".btn-year").click(function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $("#count_year").css("display","block");
        $("#count_year").siblings().css("display","none");
    });
});