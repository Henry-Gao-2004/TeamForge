
const student = {
    id: 0,
    name: '',
    skills: {},
    interests: [],
    availability: [], // 8 am to 24 am - 16 hrs * 2 bits = 32 bits
}

// example: 
/*
{
    "id": 123,
    "name": "Henry",
    "skills": {
        "Java": 3,
        "Python": 2, 
        "C": 2, 
        "Communication": 2, 
    },
    "interests": [
        "shopping",
        "reading", 
        "video games"
    ]
    "availability": [
        11110000000000000000000000000000, 
        11110000000000000000000000000000, 
        11110000000000000000000000000000, 
        11110000000000000000000000000000, 
        11110000000000000000000000000000, 
        11110000000000000000000000000000, 
        11110000000000000000000000000000
    ]
}
*/

const interestWeight = 5;       // the weight for interests

// calculate the similarity score
// returns an int
function similarityScore(studentA, studentB) {
    if (studentA.id == studentB.id) {
        return 0;
    }

    var res = 0;    // the final score

    var slots = availabilityCheck(studentA.availability, studentB.availability);
    var slotCnt = timeCnt(slots);
    if (slotCnt == 0) return 0;

    var sharedInterests = sharedElements(studentA["interests"], studentB["interests"]);
    res += sharedInterests.length * interestWeight;

    return res;
}

// find the shared available time slots
// returns an arr of length 7
function availabilityCheck(timeA, timeB) {
    var res = [];
    for (var i = 0; i < 7; i++) {
        res[i] = timeA[i] & timeB[i];
    }
    return res;
}

// return the number of time slots
// return an int
function timeCnt(time) {
    var res = 0;
    for (var i = 0; i < 7; i++) {
        while (time[i] != 0) {
            res += time[i] & 1;
            time[i] = time[i] >>> 1;
        }
    }
    return res;
}

// return the shared elements in two lists
// return a list
function sharedElements(arrA, arrB) {
    var filteredArray = arrA.filter(function (n) {
        return arrB.indexOf(n) !== -1;
    });
    return filteredArray;
}

// test function for time slot
function testTimeSlot() {
    console.log("Test for test time slot. ")
    var timeA = [4, 4, 4, 4, 4, 4, 4];
    var timeB = [7, 6, 4, 3, 9, 20, 0];
    var res = availabilityCheck(timeA, timeB);
    console.log("time slot 1: " + timeA);
    console.log("time slot 2: " + timeB);
    console.log("The available time slots are: " + res);
    var cnt = timeCnt(res);
    console.log(cnt + " slots are available for both people. \n");
}

// test function for shared elements
function testSharedElements() {
    console.log("Test for shared elements: ")
    var list1 = ["piano", "reading", "basketball", "hiking"];
    var list2 = ["hiking", "violin", "piano", "video games", "shopping"];
    console.log("list 1: " + list1);
    console.log("list 2: " + list2);
    console.log(sharedElements(list1, list2) + "\n");
}

testTimeSlot();
testSharedElements();