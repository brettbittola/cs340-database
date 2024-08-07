// Code adapted and modified from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let updateCopyForm = document.getElementById('update-copy-form-ajax');

// Modify the objects we need
updateCopyForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCopyID = document.getElementById("mySelect");
    let inputMediaID = document.getElementById("input-mediaID-ajax");
    let inputCustomerID = document.getElementById("input-customerID-update");

    // Get the values from the form fields
    let copyID = inputCopyID.value;
    let mediaID = inputMediaID.value;
    let customerID = inputCustomerID.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(copyID)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        copyID: copyID,
        mediaID: mediaID,
        customerID: customerID,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-copy-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, copyID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, copyID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("copies-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == copyID) {

            // Get the location of the row where we found the matching copy ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let mediaIDCell = updateRowIndex.getElementsByTagName("td")[1];
            let customerIDCell = updateRowIndex.getElementsByTagName("td")[5];
            // let td = updateRowIndex.getElementsByTagName("td")[3]; 

            // Reassign homeworld to our value we updated to
            mediaIDCell.innerHTML = parsedData[0].mediaID;
            customerIDCell.innerHTML = parsedData[0].customerID; 
       }
    }
}