/** ACCEPTANCE CRITERIA
 * GIVEN I am using a daily planner to create a schedule
 * WHEN I open the planner
 * THEN the current day is displayed at the top of the calendar 
 * WHEN I scroll down
 * THEN I am presented with timeblocks for standard business hours 
 * WHEN I view the timeblocks for that day 
 * THEN I am presented with timeblocks for standard business hours 
 * WHEN I view the timeblocks for that day
 * THEN each timeblock is color coded to indicate whether it is in the past, present, or future
 * WHEN I click into a timeblock
 * THEN I can enter an event
 * WHEN I click the save button for that timeblock
 * THEN the text for that event is saved in local storage 
 * WHEN I refresh the page 
 * THEN the saved events persist
 */

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html

// this code interacts with the DOM in a call to jQuery 
$(document).ready(function () {

  // TODO: Add a listener for click events on the save button. This code should

  var saveBtn = $(".saveBtn");  

 // sets the localStorage so the schedule user puts in is there 

  saveBtn.on("click", function() {

    var time = $(this).siblings(".hour").text();
    var schedule = $(this).siblings(".description").val();
    
    localStorage.setItem(time, schedule, JSON.stringify(time, schedule));
    var retrieveSchedule = localStorage.getItem(time, schedule);

    console.log("retrieveSchedule: ", JSON.parse(retrieveSchedule));
  });
});

  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


  //
  // TODO: Add code to get any user input that was saved in localStorage and set


  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // this code will set the colors for the different times of day 

function timeColor() {
  var hour = dayjs().hour();

  $(".time-block").each(function() {
    var currentHour = parseInt($(this).attr("id").split("-")[1]);
    if ($(this).attr("id").split("-")[1].includes("pm"))currentHour += 12; 
    
    if (currentHour > hour) {
      $(this).addClass("future");
      $(this).removeClass("present");
      $(this).removeClass("past");
    } else if (currentHour === hour) {
      $(this).addClass("present");
      $(this).removeClass("future");
      $(this).removeClass("past");
    } else {
      $(this).addClass("past");
      $(this).removeClass("present");
      $(this).removeClass("future");
    }
  })
};

timeColor();

// 
function schedulePlanner() {
  $(".time-block").each(function() {
    var currentHour = $(this)[0].id.split("-")[1].toUpperCase();
    var currentPlan = localStorage.getItem(currentHour);

    if(currentPlan !== null) {
      $(this).children(1)[1].textContent = currentPlan;
    }
  });
}


schedulePlanner();

// TODO: Add code to display the current date in the header of the page.
// var dayJsObject = dayjs();
// console.log(dayjs())
$("#currentDay").text(dayjs().format("dddd MMMM D, YYYY"));
