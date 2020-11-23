
//ADD YOUR FIREBASE LINKS HERE
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAtsFfz-y9RxZV5m6LC4zOVVvvCsUtPZR0",
  authDomain: "kwitter-88fff.firebaseapp.com",
  databaseURL: "https://kwitter-88fff.firebaseio.com",
  projectId: "kwitter-88fff",
  storageBucket: "kwitter-88fff.appspot.com",
  messagingSenderId: "944191884993",
  appId: "1:944191884993:web:1a509adc43e53040dd0e40"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("greeting").innerHTML = "Welcome " + user_name + " !";
function addRoom(){
  roomName = document.getElementById("roomName").value;
  localStorage.setItem("roomName", roomName);
  firebase.database().ref("/").child(roomName).update({
    purpose:"Room Name Added"
  });
  window.location = "";
}
function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      //Start code
      row = "<div id="+Room_names + " onclick='redirectToRoom(this.id);' class='room_name'>"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
    });
  });
}
getData();

function redirectToRoom (RoomName){
  window.location = "kwitter_page.html";
  localStorage.setItem("roomName" , RoomName);
  
}

function logOut(){
    localStorage.removeItem("roomName");
    localStorage.removeItem("user_name");
    window.location="index.html";
}