$(document).ready(function(){
    $(".column").click(function(){
        $(this).toggleClass("expanded");
        $(".column").not(this).removeClass("expanded");
    });
});
