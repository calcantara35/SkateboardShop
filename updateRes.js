//submit
const updateReservation = e => {
  e.preventDefault();
  let userTexboxVal = document.querySelector("#usernameVal").value;
  let dateTexboxVal = document.querySelector("#dateVal").value;
  let timeTexboxVal = document.querySelector("#timeVal").value;
  let hoursTexboxVal = document.querySelector("#hoursVal").value;

  // init xmlhttpreq
  let request = new XMLHttpRequest();

  let resData = null;

  // setting properties
  request.open("PUT", `http://localhost:4500/reservation/update/user/${userTexboxVal}/date/${dateTexboxVal}/time/${timeTexboxVal}/hours/${hoursTexboxVal}`, true);

  // specific whats gonna happen once we get data back | This is a callback function, excutes once we have data
  request.onload = function() {
    // use this to refer the api
    resData = this.response; // contains data from current object | Payload is this.response | parse turns it into a js object
    console.log(resData);

    if (request.status == 200) {
      if (resData == "User does not exist.") {
        warningMessage("The Reservation cannot be updated as the user does not exist");
      } else {
        let alertContainer = document.querySelector("#alertContainer");
        let alert = document.createElement("h2");
        let alertContent = document.createTextNode("Thank you for updating your reservation with us!");

        alert.appendChild(alertContent);

        alertContainer.appendChild(alert);
      }
    } else {
      let alertContainer = document.querySelector("#alertContainer");
      let alert = document.createElement("h2");
      let alertContent = document.createTextNode("Opps! Sorry! Our system is currently down. Please come back later!");

      alert.appendChild(alertContent);

      alertContainer.appendChild(alert);

      console.log("An error occured");
    }
  };

  // last step
  request.send();
};

// function to remove alert message
function removeSuccessMessage() {
  document.querySelector("#alertmsg").innerHTML = "";
}

function removeBadMessage() {
  document.querySelector("#badalertmsg").innerHTML = "";
}

// funciton to show alert message
function successMessage(msg) {
  document.querySelector("#alertmsg").innerHTML = `<div class="alertmsg" style="padding:1rem" role="alert">
  <strong>Success!</strong> ${msg}!
</div>`;
  setTimeout(removeSuccessMessage, 3000);
}

// funciton to show alert message
function warningMessage(msg) {
  document.querySelector("#badalertmsg").innerHTML = `<div class="badalertmsg" style="padding:1rem" role="alert">
  <strong>Oh no!</strong> ${msg}!
</div>`;
  setTimeout(removeBadMessage, 3000);
}

document.querySelector("#submitBtn").addEventListener("click", updateReservation);
