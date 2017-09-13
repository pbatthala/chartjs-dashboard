(function() {
    var t;

    function size(animate) {
        if (animate == undefined) {
            animate = false;
        }
        clearTimeout(t);
        t = setTimeout(function() {
            $("canvas").each(function(i, el) {
                $(el).attr({
                    "width": $(el).parent().width(),
                    "height": $(el).parent().outerHeight()
                });
            });
            redraw(animate);
            var m = 0;
            $(".widget").height("");
            $(".widget").each(function(i, el) { m = Math.max(m, $(el).height()); });
            $(".widget").height(m);
        }, 30);
    }

    // THIS WILL RE-RENDER ALL CHARTS WHEN WINDOW SIZE CHANGES
    // $(window).on('resize', function(){ size(false); });


    function redraw(animation) {
        var options = {};
        if (!animation) {
            options.animation = false;
        } else {
            options.animation = true;
        }

// ------------------------------------------------------------------------------
// BUTTONS ----------------------------------------------------------------------
// ------------------------------------------------------------------------------
        $('#addElement').click(function() {
            contracts.data.datasets[0].data[2] = 50;
            contracts.update();
        });

        $('#removeElement').click(function() {
            contracts.data.datasets[0].data[2] = 16;
            contracts.update();
        });

        $('#addNewData').click(function() {
            var color = random_rgba();
            addDataColor(hours, makeID(), Math.floor(Math.random() * 20), makeRGBA(color, 0.2), makeRGBA(color, 1));
        });

        $('#removeNewData').click(function() {
            removeData(hours);
        });


        $('#ajax').click(function(){
            $.ajax({
                method: "GET",
                // url: "http://titan.blue.com:7070/HelloWorld",
                url: "https://uinames.com/api/?amount=2&region=United%20States&ext",
                dataType: "jsonp",
                crossDomain: true,
                timeout: 5000,
                success: function(data){
                    // var data = JSON.parse(data);
                        $.each(data, function(index, el) {
                            var dataName = data[index].name;
                            var dataPoint = data[index].age;
                            var color = random_rgba();
                            addDataColor(hours, dataName, dataPoint, makeRGBA(color, 0.2), makeRGBA(color, 1));
                    });
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('error ' + textStatus + " " + errorThrown);
                }
            });
        });

// ------------------------------------------------------------------------------
// HELPER FUNCTIONS ----------------------------------------------------------------------
// ------------------------------------------------------------------------------

        function addData(chart, label, data) {
            chart.data.labels.push(label);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(data);
            });
            chart.update();
        }

        function addDataColor(chart, label, data, bgcolor, bordercolor) {
            chart.data.labels.push(label);
            chart.data.datasets.forEach((dataset) => {
                dataset.data.push(data);
            });
            chart.data.datasets.forEach((backgroundcolors) => {
                backgroundcolors.backgroundColor.push(bgcolor);
            });
            chart.data.datasets.forEach((bordercolors) => {
                bordercolors.borderColor.push(bordercolor);
            });
            chart.update();
        }

        function removeData(chart) {
            chart.data.labels.pop();
            chart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
            chart.update();
        }

        function makeID() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 4; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text.toUpperCase();
        }

        function random_rgba() {
            var o = Math.round, r = Math.random, s = 255;

            var first = o(r()*s);
            var second = o(r()*s);
            var third = o(r()*s);

            var rgbColor = [];
            rgbColor.push(first);
            rgbColor.push(second);
            rgbColor.push(third);

            return rgbColor
        }

        function makeRGBA(rgb,a) {
            var r = rgb[0];
            var g = rgb[1];
            var b = rgb[2];

            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }


// ------------------------------ DOUGHNUT GRAPH ------------------------------
// ------------------------------------------------------------

        data = {

            datasets: [{
                label: 'Breakdown: Appropriation Type',
                data: [46, 17, 24],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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

// ------------------------------------------------------------
// ------------------------------ BAR GRAPH ------------------------------
// ------------------------------------------------------------

        var barData = {
            labels: ["C-1", "A-1", "A-2", "B-1"],
            datasets: [{
                label: "Label",
                // xAxisID: "Contract",
                // yAxisID: "Millions",
                data: [17, 16, 30, 24],
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
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });

// ------------------------------------------------------------
// ------------------------------ RADAR GRAPH ------------------------------
// ------------------------------------------------------------

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
// ------------------------------------------------------------



    }
    size(true);

}());
