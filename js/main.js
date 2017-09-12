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

    // --------------- DOUGHNUT GRAPH

data = {

        datasets: [{
            label: 'Breakdown: Appropriation Type',
            data: [46, 17, 24],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }],
        labels: ["RDTE", "OMMC", "PMC"]
    };

var ctx = document.getElementById("hours");

var hours = new Chart(ctx, {
    type: 'doughnut',
    data: data
});

    // $('#ajax').click(function(){
    //     // alert('ajax');
    //      $.ajax({
    //        // type: "GET",
    //        url: "http://localhost:7070/GetAllProjects",
    //        dataType: "json",
    //        // data: data,
    //        success: function(data){
    //             var arraydata = JSON.parse(data);
    //                 $.each(arraydata, function(index, el) {
    //                 alert("element at " + index + ": " + el); // will alert each value
    //             });
    //        }
    //     });
    // });

//     // --------------- BAR GRAPH
    var barData = {
            labels: ["C-1", "A-1", "A-2", "B-1"],
            datasets: [{
                label: "Label",
                // xAxisID: "Contract",
                // yAxisID: "Millions",
                data: [17, 25, 30, 24],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
    }

    var cty = document.getElementById("contracts");
    var contracts = new Chart(cty, {
        type: 'bar',
        data: barData,
    });


//     // --------------- RADAR GRAPH

data = {
    datasets: [{
        data: [20, 40, 30, 60],
        backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
    }],

    labels: [
        'X',
        'Y',
        'Z',
        'B'

    ]
};

var ctz = document.getElementById("expenditure");
var expenditure = new Chart(ctz, {
    data: data,
    type: 'polarArea'
});



}
size(true);

}());
