const url = "/data"

function init() {
  // Grab a reference to the dropdown select elements
  var selector1 = d3.select("#selDatasetprovince");
  var selector2 = d3.select("#selDatasetcategory");

  selector1.on("change", optionChanged);
  selector2.on("change", optionChanged);
  
  // Use the list of unique values from app.json to populate the select options
  d3.json(url).then((data) => {
    var provinces = Array.from(new Set(data.map((d) => d.province))).sort();
    var categories = Array.from(new Set(data.map((d) => d.category))).sort();
    var ratings = Array.from(new Set(data.map((d) => d.rating))).sort();

    provinces.forEach((province) => {
      selector1.append("option").text(province).property("value", province);
    });

    categories.forEach((category) => {
      selector2.append("option").text(category).property("value", category);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = provinces[0];
    //console.log(firstSample)
    //buildCharts(firstSample);
    buildMetadata(data);
  });
}

// Initialize the dashboard
init();

function optionChanged() {
  var selectedProvince = d3.select("#selDatasetprovince").property("value");
  var selectedCategory = d3.select("#selDatasetcategory").property("value");

  // Pass the selected values to the filter function
  filterData(selectedProvince, selectedCategory);
}

function filterData(province, category) {
  d3.json(url).then((data) => {
    var filteredData = data;
    console.log(typeof data)
    
    // Apply filters only if a value is selected
    if (province) {
      filteredData = filteredData.filter((d) => d.province === province);
    }

    if (category) {
      filteredData = filteredData.filter((d) => d.category === category);
    }

    // Pass the filtered data to the visualization functions
    buildMetadata(filteredData);
    buildMarkers(filteredData);
  });
}

function buildMetadata(filteredData) {
  var PANEL = d3.select("#sample-metadata");
  PANEL.html("");

  if (filteredData.length === 0) {
    PANEL.append("h6").text("No information available for this selection");
    return; // Exit the function if no match is found
  }

  // Create a table element
  var table = PANEL.append("table");

  // Create the table header row
  var thead = table.append("thead");
  var headerRow = thead.append("tr");

  // Add the column name to the table header row
  headerRow.append("th").text("Restaurant Name");

  // Create the table body
  var tbody = table.append("tbody");

  // Add rows and cells to the table body
  filteredData.forEach(function (row) {
    var dataRow = tbody.append("tr");

    // Add the restaurant name to the cell
    dataRow.append("td").text(row.restaurant_name);
  });
}

function buildMarkers(filteredData) {
  // Clear existing markers from the map
  markerCluster.clearLayers();

  // Iterate over the filtered data and create markers for each restaurant
  filteredData.forEach((restaurant) => {
    var marker = L.marker([restaurant.latitude, restaurant.longitude]).bindPopup(
      "<strong>" +
        restaurant.restaurant_name +
        "</strong><br />" +
        "Category: " +
        restaurant.category +
        "<br />" +
        "Rating: " +
        restaurant.rating +
        "/5"
    );

    markerCluster.addLayer(marker); // Add the marker to the marker cluster group
  });
}

// Creating the map object
var myMap = L.map("map", {
  center: [48.30, -97.30], // Somewhere in Manitoba
  zoom: 5, // Adjust the zoom level as needed
});

// Adding the tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

// Cluster marker
var markerCluster = L.markerClusterGroup();

// Load the data from app.json
d3.json(url).then((data) => {
  // Process the retrieved data
  // Iterate over the data and create markers for each restaurant
  data.forEach((restaurant) => {
    var marker = L.marker([restaurant.latitude, restaurant.longitude]).bindPopup(
      "<strong>" +
        restaurant.restaurant_name +
        "</strong><br />" +
        "Category: " +
        restaurant.category +
        "<br />" +
        "Rating: " +
        restaurant.rating +
        "/5"
    );

    markerCluster.addLayer(marker); // Add the marker to the marker cluster group
  });

  myMap.addLayer(markerCluster); // Add the marker cluster group to the map
});

// fetch(url)
//     .then(response => response.json())
//     .then(jsonData => {
//         // Calculate average rate by cuisine
//         const cuisineRatings = {};
//         jsonData.forEach(item => {
//             const cuisine = item.label;
//             const rating = parseFloat(item.value);
//             if (!isNaN(rating)) {
//                 if (!cuisineRatings[cuisine]) {
//                     cuisineRatings[cuisine] = {
//                         totalRating: 0,
//                         count: 0
//                     };
//                 }
//                 cuisineRatings[cuisine].totalRating += rating;
//                 cuisineRatings[cuisine].count++;
//             }
//         });
// ​
//         const chartData = Object.keys(cuisineRatings).map(cuisine => {
//             const averageRating = cuisineRatings[cuisine].totalRating / cuisineRatings[cuisine].count;
//             return {
//                 "label": cuisine,
//                 "value": averageRating.toFixed(2),
//             };
//         });
// ​
//         //STEP 3 - Chart Configurations
//         const chartConfig = {
//             type: 'column2d',
//             renderAt: 'chart-container',
//             width: '100%',
//             height: '400',
//             dataFormat: 'json',
//             dataSource: {
//                 // Chart Configuration
//                 "chart": {
//                     "caption": "Average Ratings by Cuisine",
//                     "subCaption": "Based on User Reviews",
//                     "xAxisName": "Cuisine",
//                     "yAxisName": "Average Rating",
//                     "numberSuffix": "",
//                     "theme": "fusion",
//                 },
//                 // Chart Data
//                 "data": chartData
//             }
//         };
// ​
//         FusionCharts.ready(function(){
//             var fusioncharts = new FusionCharts(chartConfig);
//             fusioncharts.render();
//         });
//     })
//     .catch(error => {
//         console.error('Error loading chart data:', error);
//     });

d3.json(url).then((data) => {

  var keys_categs = Array.from(new Set(data.map((d) => d.category)));
  var values_categs = keys_categs.map(category => data.filter((d) => d.category === category).length);

  // console.log(keys_categs)
  // console.log(values_categs)

  var pie_chart = [{
    values: values_categs,
    labels: keys_categs,
    type: "pie",
    automargin: true,
    hole: 0.6,
    textposition: 'inside'
  }];

  var layout = {
    height: 325,
    width: 325,
    margin: {"t": 0, "b": 0, "l": 0, "r": 0},
    showlegend: false,
    autosize: false,
    title: {
      text: '<b>Category/<br>Cuisine type<br>across<br>Canada</b>',
      font: {
        family: 'Arial',
        size: 25,
        color: 'black'
      },
      x: 0.5, // Set the x position to center (0.5)
      y: 0.61, // Set the y position to center (0.5)
      xanchor: 'center',
      yanchor: 'middle'
    }
    // titlefont: {
    //   size: 18, 
    //   color: '#333'
    // }

  };

  Plotly.newPlot('donut', pie_chart, layout);
});

d3.json(url).then((data) => {

  var groupedCategory = d3.group(data, d => d.category);
  var avgRating = Array.from(groupedCategory, ([key, values]) => ({
    key: key,
    average: d3.mean(values, d => d.rating)
  }));
  
  // console.log(groupedCategory)
  console.log(avgRating)

  var x_axis = avgRating.map(d => d.key);
  var y_axis = avgRating.map(d => d.average);

  // console.log(x_axis)
  // console.log(y_axis)

  var bar_data = [{
    x: x_axis,
    y: y_axis,
    type: 'bar',
    text: x_axis,
    marker: {color: 'coral'}
  }]

  var layout = {
    title: {
      text: "<b>Average Rating of each Category/Cuisine type</b>",
      font: {
        family: 'Arial',
        size: 25,
        color: 'black'
      },
      x: 0.5, // Set the x position to center (0.5)
      y: 0.9, // Set the y position to center (0.5)
      xanchor: 'center',
      yanchor: 'middle'
    },
    width:1500,
    height: 400,
    margin: {
      l: 40,  // Increase the left margin to create more space for labels
      r: 10,
      t: 80
    },
    xaxis: {
      automargin: true,  // Enable automatic margin adjustment for the x-axis labels
      tickangle: 45
    }
  };

  Plotly.newPlot('bar', bar_data, layout)

});