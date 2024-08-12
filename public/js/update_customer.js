// Code adapted from the full program at https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/
// Retrieved 8/01/24
// Variables, and specific code structures were adapted to fit this project, but the overall code and project structures belongs to the original source.

// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputPhoneNumber = document.getElementById("customer-update-phoneNumber");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let phoneNumberValue = inputPhoneNumber.value;

    // Phone numbers cannot be null, so abort if no number was entered
    if (phoneNumberValue == ""){
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        phoneNumber: phoneNumberValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customerID){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customerID) {

            // Get the location of the row where we found the matching customer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of phoneNumber value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign phone number to the new value
            td.innerHTML = parsedData[0].phoneNumber;
       }
    }
}