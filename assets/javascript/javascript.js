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
  var train = $("#inputTrain")
    .val()
    .trim();
  var destination = $("#inputDestination")
    .val()
    .trim();
  var frequency = $("#inputFrequency")
    .val()
    .trim();
  var time = $("#inputTime")
    .val()
    .trim();

  // STORE INPUT VALUES TO FIREBASE
  database.ref().push({
    train: train,
    destination: destination,
    frequency: frequency,
    time: time
  });
});

// WRITE FROM FIREBASE TO HTML
database.ref().on("child_added", function(childSnapshot) {
  event.preventDefault();
 var nexTrain = minutesPending(childSnapshot.val().time, childSnapshot.val().frequency);
  console.log(childSnapshot);
  $("#schedule").append(`
    <tr> 
        <th> ${childSnapshot.val().train} </th> 
        <td> ${childSnapshot.val().destination} </td> 
        <td> ${childSnapshot.val().time} </td> 
        <td> ${childSnapshot.val().frequency} </td> 
        <td> ${nexTrain} </td>
    </tr> 
        `);
  $(".form-control").val("");
  console.log(nextTrain)
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
    console.log(timeRemainder);
    nextTrain = realTime.add(timeRemainder, "minutes");
    console.log(nextTrain);
  }
  console.log("Next Train Arrival Time:", nextTrain.format("mm"));
  return remainder;
}
// console.log(minutesPending);

 moment().format("hh:mm:ss a");
