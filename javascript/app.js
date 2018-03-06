    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCs4HS_-ZCqSOJanzxavp0OEvh-dtC_-Yo",
    authDomain: "train-schedule-abac4.firebaseapp.com",
    databaseURL: "https://train-schedule-abac4.firebaseio.com",
    projectId: "train-schedule-abac4",
    storageBucket: "",
    messagingSenderId: "725847471499"
  };
  firebase.initializeApp(config);

    // Make variable for 'schedule' node
    var db = firebase.database();
    var scheduleRef = db.ref('/schedule');

    // jQuery Selectors
    var name = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = 0;
    var nextArrival = 0;
    var firstTime = 0;
    
    $("#submit").on("click", e => {
      // Prevent page reload
      e.preventDefault();


      //Get user input
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrain = $("#firsttrain-input").val().trim();
      frequency = $("#frequency-input").val().trim();


      
      // collect values
      var dbName = name;
      var dbDestination = destination;
      var dbFirsttrain = firstTrain;
      var dbFrequency = frequency;

      // Push new train object to firebase db
      db.ref().push({
        name: dbName,
        destination: dbDestination,
        firstTrain: dbFirsttrain,
        frequency: dbFrequency
      });


      console.log(dbName);
      console.log(dbDestination);
      console.log(dbFirsttrain);
      console.log(dbFrequency);

      // Empty input fields in browser
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#firsttrain-input").val("");
      $("#frequency-input").val("");

      });



      
      // Firebase event for adding trains to the database and a row in HTML when a user addds an entry 
      db.ref().on("child_added", function(childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());

        // store into a variable
        var trName = childSnapshot.val().name;
        var trDestination = childSnapshot.val().destination;
        var trFirsttrain = childSnapshot.val().firstTrain;
        var trFrequency = childSnapshot.val().frequency;

         //new arrival and minutes away
      var tFrequency = trFrequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  //   // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("LT");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
  
     

      $("#trainRow > tbody").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" +
  trFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");

       });
   