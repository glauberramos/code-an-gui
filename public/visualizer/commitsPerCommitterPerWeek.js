define(function() {
    return function(tile) {
        an.data("co.torri.dod.analysis.CommitsPerCommitterPerWeekAnalyzer", function(data) {

            tile.title("Avg commits per unique commiter by week");

            var margin = {top: 10, right: 10, bottom: 30, left: 40},
                width = tile.width() - margin.left - margin.right,
                height = tile.height() - margin.top - margin.bottom;

            var formatPercent = d3.format("");

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], 0.1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(formatPercent);

            var svg = d3.select(tile.id).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            x.domain(data.map(function(d) { return d.week; }));
            y.domain([0, d3.max(data, function(d) { return d.avg_commits_by_comitter; })]);

            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Commiters");

            svg.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.week); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.avg_commits_by_comitter); })
              .attr("height", function(d) { return height - y(d.avg_commits_by_comitter); });
        });
    };
});