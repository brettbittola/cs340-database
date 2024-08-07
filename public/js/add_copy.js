// Code adapted and modified from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addCopyForm = document.getElementById('add-copy-form');

// Modify the objects we need
addCopyForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMediaID = document.getElementById("input-mediaID-html");
    let inputCustomerID = document.getElementById("input-customerID-html");


    // Get the values from the form fields
    let mediaID = inputMediaID.value;
    let customerID = inputCustomerID.value;

    // Put our data we want to send in a javascript object
    let data = {
        mediaID: mediaID,
        customerID: customerID,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-copy-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMediaID.value = '';
            inputCustomerID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("copies-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("TR");
    let copyIDCell = document.createElement("TD");
    let mediaIDCell = document.createElement("TD");
    let mediaTitleCell = document.createElement("TD");
    let creatorNameCell = document.createElement("TD");
    let mediaTypeCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let customerFNameCell = document.createElement("TD");
    let customerLNameCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    copyIDCell.innerText = newRow.copyID;
    mediaIDCell.innerText = newRow.mediaID;
    mediaTitleCell.innerText = newRow.mediaTitle;
    creatorNameCell.innerText = newRow.creatorName;
    mediaTypeCell.innerText = newRow.mediaType;
    customerIDCell.innerText = newRow.customerID;
    customerFNameCell.innerText = newRow.customerFName;
    customerLNameCell.innerText = newRow.customerLName;
    
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCopy(newRow.copyID);
    };


    // Add the cells to the row 
    row.appendChild(copyIDCell);
    row.appendChild(mediaIDCell);
    row.appendChild(mediaTitleCell);
    row.appendChild(creatorNameCell);
    row.appendChild(mediaTypeCell);
    row.appendChild(customerIDCell);
    row.appendChild(customerFNameCell);
    row.appendChild(customerLNameCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.copyID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.mediaID;
    // option.text = `${newRow.mediaID} ${newRow.mediaTitle} checked out by ${newRow.customerID} ${newRow.customerFName} ${newRow.customerLName}`;

    option.value = newRow.copyID;
    selectMenu.add(option);
    // End of new step 8 code.
}