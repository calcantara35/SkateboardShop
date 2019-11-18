// global vars

let deleteResData = null;

const removeRes = e => {
  let deleteRequest = new XMLHttpRequest();
  let userTexboxVal = document.querySelector("#usernameVal").value;

  deleteRequest.open("DELETE", `http://localhost:4500/reservation/delete/user/${userTexboxVal}`, true);

  // specific whats gonna happen once we get data back | This is a callback function, excutes once we have data
  deleteRequest.onload = function(e) {
    // use this to refer the api
    deleteResData = this.response; // contains data from current object | Payload is this.response | parse turns it into a js object
    console.log(deleteResData);

    if (this.status == 200) {
      if (deleteResData == "User does not exist.") {
        warningMessage("The Reservation for this user does not exist");
      } else {
        successMessage("The reservation has been deleted from our system");
        console.log("Success!");
      }
    } else {
      console.log("An error occured");
    }
  };

  // last step
  deleteRequest.send();
};

// function to remove alert message
function removeSuccessMessage() {
  document.querySelector("#alertmsg").innerHTML = "";
}

function removeBadMessage() {
  document.querySelector("#alertmsg").innerHTML = "";
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

// event listeners

document.querySelector("#submitBtn").addEventListener("click", removeRes);
