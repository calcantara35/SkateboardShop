// init xmlhttpreq
let request = new XMLHttpRequest();

let resData = null;

// setting properties
request.open("GET", "http://localhost:4500/reservations/all", true);

// specific whats gonna happen once we get data back | This is a callback function, excutes once we have data
request.onload = function() {
  // use this to refer the api
  resData = JSON.parse(this.response); // contains data from current object | Payload is this.response | parse turns it into a js object
  console.log(resData);

  if (request.status == 200) {
    // looping through response data
    // how do you show that there are no reservations in the client

    if (!Array.isArray(resData) || !resData.length) {
      let table = document.querySelector("#table");
      table.innerHTML = "";
      let noResAvail = document.querySelector("#noResAvail");
      noResAvail.innerHTML = "<h1>No Reservations Available</h1>";
    } else {
      resData.forEach(reservation => {
        const reslist = document.getElementById("reservation-data");
        // Create tr element
        const row = document.createElement("tr");
        // insert cols
        row.innerHTML = `
            <td>${reservation.name}</td>
            <td>${reservation.date}</td>
            <td>${reservation.time}</td>
            <td>${reservation.hours}</td>`;
        reslist.appendChild(row);
      });

      console.log("Success!");
    }
  } else {
    console.log("Server Error");
  }
};

// last step
request.send();
