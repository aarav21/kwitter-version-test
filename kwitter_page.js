//YOUR FIREBASE LINKS
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
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
room_name = localStorage.getItem("roomName");
user_name = localStorage.getItem("user_name");

function sendMessage() {
      message = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            user: user_name,
            msg: message,
            likes: 0
      });

      document.getElementById("message").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        name = message_data['user'];
                        messgae = message_data['msg'];
                        likes = message_data['likes'];

                        name_of_user = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>"
                        messgae_of_user = "<h4 class='message_h4'>" + messgae + "</h4>" 
                        likes_of_user = "<button class='btn btn-warning' id=" + firebase_message_id + " value= " + likes +  " onClick='updateLikes(this.id);'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + likes + "</span></button><hr>";
                        final = name_of_user + messgae_of_user + likes_of_user + span_with_tag;
                        document.getElementById("output").innerHTML += final;
                        //End code
                  }
            });
      });
}

function updateLikes(x){
      button_id = x;
      likes = document.getElementById(button_id).value;
      updatedLikes = Number(likes) + 1;
      console.log(updatedLikes);
      firebase.database().ref(room_name).child(x).update({
            likes: updatedLikes
      });
}
getData();

function logOut() {
      localStorage.removeItem("roomName");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}