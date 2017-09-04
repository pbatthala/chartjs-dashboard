(function(){
var t;
function size(animate){
    if (animate == undefined){
        animate = false;
    }
    clearTimeout(t);
    t = setTimeout(function(){
        $("canvas").each(function(i,el){
            $(el).attr({
                "width":$(el).parent().width(),
                "height":$(el).parent().outerHeight()
            });
        });
        redraw(animate);
        var m = 0;
        $(".widget").height("");
        $(".widget").each(function(i,el){ m = Math.max(m,$(el).height()); });
        $(".widget").height(m);
    }, 30);
}
$(window).on('resize', function(){ size(false); });


function redraw(animation){
    var options = {};
    if (!animation){
        options.animation = false;
    } else {
        options.animation = true;
    }





}
size(true);

}());
