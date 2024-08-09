//Code adapted and modified from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

function deleteCopy(copyID) {
  // Put our data we want to send in a javascript object
  let data = {
      id: copyID
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-copy-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {

          // Add the new data to the table
          deleteRow(copyID);

      }
      else if (xhttp.readyState == 4 && xhttp.status != 204) {
          console.log("There was an error with the input.")
      }
  }
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
}

function deleteRow(copyID){
  let table = document.getElementById("copies-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == copyID) {
          table.deleteRow(i);
          location.reload();
          break;
      }
  }
}