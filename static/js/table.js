
dburl = "../static/data/data.json";


d3.json(dburl).then(function (loving_data) {

    // console.log(loving_data);
    var tableBody = d3.select("tbody");

    loving_data.forEach(function (dataObject) {
        var row = tableBody.append("tr");
        Object.entries(dataObject).forEach(function ([key, value]) {
            // console.log(value);
            row.append("td").text(value);
        });
        // console.log(dataObject);
    });
}
);

// Full filter - multi fields
function myInputFilter() {
    // define filter
    var fullFilter = [];
    // Structure
    // // Select the input element and get the raw HTML node
    // var inputElement = d3.select("#dateInput");
    // // Get the value property of the input element
    // var inputValue = inputElement.property("value");

    fullFilter['operatorFilter'] = d3.select("#operatorFilter").property("value");
    fullFilter['apiFilter'] = d3.select("#apiFilter").property("value");
    fullFilter['dailyoilFilter'] = d3.select("#dailyoilFilter").property("value");
    fullFilter['dailygasFilter'] = d3.select("#dailygasFilter").property("value");

    console.log(fullFilter);

    var filterKeys = Object.keys(fullFilter);
    var table, tr, i, j, input, filter, td, txtValue;

    // read the tableBody from the html -> is singular value in this case
    table = document.getElementById("tableBody");
    // read all the table rows defined
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        // table row is displayed by default
        tr[i].style.display = "";
        // initialize
        j = 0;
        for (var filterKey of filterKeys) {
            td = tr[i].getElementsByTagName("td")[j];
            input = document.getElementById(filterKey);
            filter = input.value.toUpperCase();
            j++;
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                    // row should not be displayed if any cell if filtered out
                    break;
                }
            }
        }
    }
}


// show data
showData();