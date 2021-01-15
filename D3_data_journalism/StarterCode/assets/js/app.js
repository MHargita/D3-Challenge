// start with svg container
var svgWidth = 960;
var svgHeight = 500;

// margins
var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

// svg width and height minus margins
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create SVG wrapper, append an SVG group (container) that will hold our chart
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group (container)

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Retrieve data from CSV file and execute
d3.csv("data.csv").then(function(censusData) {
    console.log(censusData);
    // 1. Parse Data/Cast as numbers
    censusData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });

    // 2. Create Scale Functions- x scale
    var xLinearScale = d3.scaleLinear()
    .domain([8,d3.max(censusData, d => d.poverty)])
    .range([0, width]);

    // y scale

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d.obesity) - 1, d3.max(censusData, d => d.obesity) +2])
    .range([height, 0]);

    // 3. Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // 4. Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // 5. Create Circles
    var circlesGroup = chartGroup.append("g").selectAll("circle")
    .data(censusData)
    .enter()
    .append("circle")
    .classed("circle", true)
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    // State abbreviations

    chartGroup.selectAll("null").data(censusData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x",d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.obesity))
    .attr("text-anchor", "middle")
    .attr('font-size', 10);


    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br>Poverty: ${d.poverty}<br>Obesity: ${d.obesity}`);
        });

    // Step 7: Create tooltip in the chart
    // ==============================
      chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
      circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
    });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obesity Percentages");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Poverty Percentages");



    }).catch(function(error) {
    console.log(error);
});
