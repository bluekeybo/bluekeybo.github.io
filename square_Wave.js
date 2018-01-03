var PHASOR = (function() {

    var canvasWidth = 150;
    var canvasHeight = 150;
    var MARGINS = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    var plotWidth = canvasWidth - MARGINS.left - MARGINS.right;
    var plotHeight = canvasHeight - MARGINS.top - MARGINS.bottom;

    var xRange = d3.scale.linear().range([MARGINS.left, plotWidth]);
    var yRange = d3.scale.linear().range([plotHeight, MARGINS.top]);

    xRange.domain([-1.25, 1.25]);
    yRange.domain([-1.25, 1.25]);

    var vis = d3.select('#phasor');

    var axisExtension = vis.append("line")
        .attr("x1", xRange(-1.25))
        .attr("y1", yRange(0))
        .attr("x2", 605)
        .attr("y2", yRange(0))
        .attr("stroke-width", 1.0)
        .attr("stroke", "black")
        .style("opacity", 0.4);

				
    var path = vis.append('svg:path')
        .attr("stroke-width", 2.0)
        .attr("stroke", "blue")
        .attr("fill", "none");

    var time = 0.0;
	var count=0;
	var valReturned = 0.0;
	var oddNum = 1;

    var sine = d3.svg.line()
        .x(function(d, i) {
            return xRange(d) - 100
        })
        .y(function(d, i) {
		valReturned = 0;
		
		for(count=0; count< GET_PHASOR_FREQUENCY(); count++)
		{			
			valReturned = valReturned+(1/oddNum)*Math.sin(2*oddNum*Math.PI*d * 0.5 ) * GET_PHASOR_AMPLITUDE();	
			oddNum = oddNum+2;
			}		            
			
			oddNum = 1;
			return yRange(0.9*(4/Math.PI)*valReturned);
        });

    var data = []
    for (i = 0; i < 500; i++) {
        data.push(i / 50);
    }

    var pauseCycles = 0;

    function draw() {

        path
            .attr('d', sine(data));

        time -= 0.0125 * GET_PHASOR_FREQUENCY();
        PHASOR_INTERPOLATION += 0.1;
        PHASOR_AMP_INTERPOLATION += 0.2;
    }

    d3.timer(draw, 50);
})();