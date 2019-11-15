// init xmlhttpreq
let request = new XMLHttpRequest();

let userResData = null;

let selectedUser = null;

// setting properties

function displayUserReservation() {
  selectedUser = document.querySelector("#wordBox").value;
  if (selectedUser == null || selectedUser == "") {
    document.querySelector("#userReservation").innerHTML = "Please enter a username!";
  } else {
    request.open("GET", `http://localhost:4500/reservation/user/${selectedUser}`, true);

    // specific whats gonna happen once we get data back | This is a callback function, excutes once we have data
    request.onload = function() {
      // use this to refer the api
      userResData = JSON.parse(this.response); // contains data from current object | Payload is this.response | parse turns it into a js object
      console.log(userResData);

      if (request.status == 200) {
        // looping through response data
        userResData.forEach(reservation => {
          const reslist = document.getElementById("userReservation");
        
          // Create tr element
          const row = document.createElement("p");
          // insert cols
          row.innerHTML = `
          <p>${reservation.name}</p>
          <p>${reservation.date}</p>
          <p>${reservation.time}</p>
          <p>${reservation.hours}</p>`;
          reslist.appendChild(row);
         
        });

        console.log("Success!");
      } else {
        console.log("An error occured");
      }
    };

    // last step
    request.send();
  }
}
