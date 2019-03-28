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
  var database = firebase.database();

// GLOBAL VARIABLES
var train;
var destination;
var trainTime;
var frequency;
var scheduler = [];

// SELECTORS

 
 

 // SUBMIT BUTTON SELECTOR: CLICK EVENT/STORE INPUT VALUE WORK (03/27/19);
$(".btn").on("click", function() {
    event.preventDefault();
    var train = $("#inputTrain").val().trim();
    var destination = $("#inputDestination").val().trim();
    var frequency = $("#inputFrequency").val().trim();
    var nextTrain = $("#inputNext").val().trim();
    var time = $("#inputTime").val().trim();

// STORE INPUT VALUES IN ARRAY    
    scheduler.push(train);
    scheduler.push(destination);
    scheduler.push(frequency);
    scheduler.push(nextTrain);
    scheduler.push(time);
    console.log(scheduler);

// APPEND USER INPUT TO SCHEDULER
var newTrain = $("<th>");
newTrain.text(scheduler[0]);
// for (i = 0; i < scheduler.length; i++) {
$("#schedule").append(`
<tr> <th> ${scheduler[0]} </th> <td> ${scheduler[1]} </td> <td> ${scheduler[2]} </td> <td> ${scheduler[3]} </td> <td> ${scheduler[4]} </td>`);
   
$(".form-control").val("");  
});


// RESET FORM FUNCTION
