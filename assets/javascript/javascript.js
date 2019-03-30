// INITIALIZE FIREBASE
var config = {
    apiKey: "AIzaSyCxJUHxWOvmexZk1stnJS6xC7Cd6QvoOk0",
    authDomain: "train-scheduler-d4cb5.firebaseapp.com",
    databaseURL: "https://train-scheduler-d4cb5.firebaseio.com",
    projectId: "train-scheduler-d4cb5",
    storageBucket: "train-scheduler-d4cb5.appspot.com",
    messagingSenderId: "685361047223"
  };
  firebase.initializeApp(config);
  console.log(config);

// DECLARE VARIABLE TO CALL FIREBASE DATABASE
  var database = firebase.database();

// GLOBAL VARIABLES
var train = "";
var destination = "";
var trainTime;
var frequency;

// SELECTORS

 
 

 // SUBMIT BUTTON SELECTOR: CLICK EVENT/STORE INPUT VALUE WORK (03/27/19);
$(".btn").on("click", function(event) {
    event.preventDefault();
    var train = $("#inputTrain").val().trim();
    var destination = $("#inputDestination").val().trim();
    var frequency = $("#inputFrequency").val().trim();
    var time = $("#inputTime").val().trim();

// STORE INPUT VALUES TO FIREBASE
    database.ref().set({
        train: train,
        destination: destination,
        frequency: frequency,
        time: time
});
});

// WRITE FROM FIREBASE TO HTML
    database.ref().on("value", function(snapshot) {
        event.preventDefault();
        var nexTrain = minutesPending(snapshot.val().time, snapshot.val().frequency);
      //  $("#schedule").empty();
        $("#schedule").append(`
    <tr> 
        <th> ${snapshot.val().train} </th> 
        <td> ${snapshot.val().destination} </td> 
        <td> ${snapshot.val().time} </td> 
        <td> ${snapshot.val().frequency} </td> 
        <td> ${nexTrain} </td>
    </tr> 
        `);
        $(".form-control").val("");
    });

// STORE INPUT VALUES IN ARRAY    
/*  scheduler.push(train);
    scheduler.push(destination);
    scheduler.push(time);
    console.log(time);
    scheduler.push(frequency);
    console.log(scheduler); */

// APPEND USER INPUT TO TRAIN SCHEDULER
// for (i = 0; i < scheduler.length; i++) {
 /*   var newTrain = $("<th>");
    newTrain.text(scheduler[0]);
 $("#schedule").append(`
<tr> 
    <th> ${scheduler[0]} </th> 
    <td> ${scheduler[1]} </td> 
    <td> ${scheduler[2]} </td> 
    <td> ${scheduler[3]} </td> 
</tr> 
`); */

// RESET FORM/CLEAR ARRAY
$(".form-control").val("");
// scheduler.length = 0;


// MOMENT.JS
function minutesPending(firstTrain, frequency) {
    var realTime = moment();
    var openShift = moment(firstTrain, "HH:mm");

    var timeRemainder = 0;
console.log(realTime);

if (openShift > realTime) {
    timeRemainder = openShift.diff(realTime, "minutes");
} else {
    var minutesPast = realTime.diff(openShift, "minutes");
    var remainder = minutesPast % frequency;
    timeRemainder = frequency - remainder;
    console.log(minutesTilNextTrain);
    nextTrain = realTime.add(minutesTilNextTrain, "minutes");
    console.log(nextTrain);
}
console.log("Next Train Arrival Time:", nextTrain.format("hh:mm A"));
return minutesPending;

};
console.log(minutesPending);



moment().format("hh:mm:ss a");