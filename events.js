/**
 * Created by galkremer on 02/11/2015.
 */

/*
 Create your data structure: 3-4 events containing: title, startDate (in timestamp), endDate, array of participant names,
 and millisDuration.
  Organize the events so that they are sorted by startDate

  Write the following functions:
 o addEvent(title, start, end) create a new event and put it in the right place in the array (may need to push the rest of the array)
 o findNextEvent() – returns the next event on my calendar (in the future, closest to now )
 o getEventsCountFor(userName) – returns how many events this userName is invited to
  Create an HTML interface that shows the events list and activate all the functions
 */

var event1 = {
    name: 'miluiim',
    start: 1446552000000,
    end: 1446573600000,
    guests: [{name:'david', email: 'dvid@walla.com'}, {name:'nunu', email: 'nunu@gmail.com'}] ,
    duration: (1446573600000-1446552000000)
}

var event2 = {
    name: 'wedding',
    start: 1446739200000,
    end: 1446750000000,
    guests: [{name:'gal', email:'gal@gal.com'}, {name: 'sali', email: 'sali@gmail.com'}] ,
    duration: (1446750000000-1446739200000)
}

var event3 = {
    name: 'brith',
    start: 1446804000000,
    end: 1446811200000,
    guests: [{name: 'gal', email:'galkremer1@walla.com'}, {name:'sali', email: 'sali@gmail.com'}] ,
    duration: (1446811200000-1446804000000)
}


var event4 = {
    name: 'work',
    start: 1447956000000,
    end: 1447963200000,
    guests: [{name:'lala', email: 'lala@walla.com'}, {name:'gal', email: 'gal@gal.com'}] ,
    duration: (1447963200000-1447956000000)
}

var events = [event1, event2, event3, event4];


function getGuests() {
    var guests = [];
    var email;
    var name = prompt('Please enter a guest name:');

    while (name !== 'quit') {
        email = prompt('Email:');
        guests.push({name:name, email:email});
        name = prompt('Please enter a guest name:');
    }
    return guests;
}


function getTimes() {
    var sTime = Date.parse(prompt('Staring date: YYYY-MM-DD:') + 'T' + prompt('Starting time: HH:MM') + ':00Z');
    var eTime = Date.parse(prompt('Ending date YYYY-MM-DD:') +'T' + prompt('Ending time: HH:MM') + ':00Z');
    times = {
        start: sTime,
        end: eTime,
        duration: eTime-sTime
    }
    return times;
}


function addEvent() {
    var isDateFound = false;
    var counter = events.length;
    var name = prompt('Please enter an event name:');
    var times = getTimes();
    var event = {name: name,
            guests: getGuests(),
            start: times.start,
            end: times.end,
            duration: times.duration};

    while (!isDateFound && counter>0) {
        if (event.start > events[counter-1].start) {
            isDateFound = true;
        }
        else {
            counter--;
        }
    }
    events.splice(counter, 0, event);
    console.log(events);
    return events;
}


function findNextEvent() {

        var nextEventIndex = 0;
        var nextEventFound = false;
        var date = new Date();
        var time = date.getTime();

        while (!nextEventFound && nextEventIndex < events.length) {
            var timeDiff = (events[nextEventIndex].start - time);
            if (timeDiff > 0) {
                nextEventFound = true;
            }
            else {
                nextEventIndex++;
            }
        }
        return events[nextEventIndex];
}

function getEventsCountFor(email) {
    var counter = 0;
    function countIfGoing (event, i) {
        for(var i=0; i<(event.guests).length; i++) {
            if (event.guests[i].email === email) {
                counter++
            }
        }
    }
    events.forEach(countIfGoing);
    return counter;
}

function sortEvents() {
    function compare(a,b) {
        if (a.start < b.start)
            return -1;
        if (a.start > b.start)
            return 1;
        return 0;
    }
    events.sort(compare);
    return events;
}

//addEvent(myEvents);

//console.log(events);
//console.log(getEventsCountFor('gal@gal.com'));

