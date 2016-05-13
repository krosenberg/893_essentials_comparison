var svg = d3.select('body').append('svg:svg')
	// .attr("width", "100%")
	// .attr("height", "100%")
	;

var width = $('body').width() - 200;
var row_height = 40;
var radius = 10;
var text_width = 200;
var v_offset = 15;

var scale = d3.scale.linear()
	.domain([0, 893])
	.range([0, width - radius]);

d3.csv('result.csv', function(error, rows) {
	

	svg.attr("height", rows.length * row_height);
	svg.attr("width", width + text_width);

	var row = svg.selectAll(".row")
		.data(rows)
		.enter()
		.append("g")
		.attr("class", "row")
		.attr("transform", function(d, i) {
			return 'translate(0,'+i*row_height+')'
		});

	var bg = row.append("rect")
		.attr("class", "bg")
		.attr("width", "100%")
		.attr("height", row_height)
		.attr("fill", function(d, i) {
			return i % 2 ? 'white' : '#EFEFEF';
		});


	// var album = row.append("text")
	// 	.attr("y", 30)
	// 	.attr("x", 5)
	// 	.style("font-weight", 600)
	// 	.text(function(d) {
	// 		return d.album
	// 	});

	var rank_893 = row.append("rect")
		.attr("class", "dot-893")
		.attr("width", radius)
		.attr("height", row_height-6)
		.attr("y", 3)
		.attr("x", function(d){
			return 5 + scale(d['893_rank']);
		});


	var rank_spotify = row.filter(function(d) {
		return d['spotify_rank'];
	}).append("circle")
		.attr("class", "dot-spotify")
		.attr("r", radius/2)
		// .attr("height", radius)
		.attr("cy", v_offset+radius/2)
		.attr("cx", function(d){
			return 5 + scale(d['spotify_rank']);
		});


	var rank_rs500 = row.filter(function(d) {
		return d['rs500_rank'];
	}).append("circle")
		.attr("class", "dot-rs500")
		.attr("r", radius/2)
		// .attr("height", radius)
		.attr("cy", v_offset+radius/2)
		.attr("cx", function(d){
			return 5 + scale(d['rs500_rank']);
		});


	var artist = row.append("text")
		.attr("y", 12)
		.attr("x", 5)
		.text(function(d) {
			return d['893_rank'] + ' ' +d.artist + ' – ' + d.album
		});

});


function update(sort_by) {
    svg.selectAll(".row")
        .sort(function(a, b) {
        	var val;
        	if (sort_by == "893_spotify") {
				val = Math.abs((a['893_rank'] || 1000) - (a['spotify_rank'] || 1000)) - Math.abs((b['893_rank'] || 1000) - (b['spotify_rank'] || 1000));
        	} else if (sort_by == "893_rs500") {
				val = Math.abs((a['893_rank'] || 1000) - (a['rs500_rank'] || 1000)) - Math.abs((b['893_rank'] || 1000) - (b['rs500_rank'] || 1000));
        	} else {
	        	val = (a[sort_by] || 1000) - (b[sort_by] || 1000);        		
        	}
        	console.log('val');
        	return val
        });


    svg.selectAll(".row")
    	// .transition().duration(500)
		.attr("transform", function(d, i) {
			return 'translate(0,'+i*row_height+')'
		});


	svg.selectAll(".bg")
		.attr("fill", function(d, i) {
			return i % 2 ? 'white' : '#EFEFEF';
		});

}