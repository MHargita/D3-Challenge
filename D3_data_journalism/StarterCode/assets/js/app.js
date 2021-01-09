// start with svg container
var svgWidth = 960;
var svgHeight = 500;

// margins
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

// svg width and height minus margins
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create SVG wrapper, append an SVG group (container) that will hold our chart
var svg = d3
    .select("scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group (container)

var ScatterGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);







    

// Retrieve data from CSV file and execute
d3.csv("data.csv").then(function(censusData) {
    console.log(censusData);
}