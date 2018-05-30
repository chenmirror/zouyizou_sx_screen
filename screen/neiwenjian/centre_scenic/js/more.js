/**
 * Created by Administrator on 2017-07-28.
 */
window.onload= function () {
    $('.ui .checkbox').change(function(){
        if($(this).checkbox("is checked")){
            $(this).parent().css("background-color","#cce2ff");
            $(this).parent().siblings().css("background-color","#cce2ff");
        }else{
            $(this).parent().css("background-color","#ffffff");
            $(this).parent().siblings().css("background-color","#ffffff");
        }
    });
};