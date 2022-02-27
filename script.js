// CMSC 437 Project Group 10 [Judy David, Sriniti Jayaram, James Weber]
// Description: Javascript Functions and variables

var curPatientIndex = 0;
//external device level, simulating a changeable value for increasing or decreasing levels for patient
var extDev = 43; 

// Used to simulate patients that would be stored in a database
var patientsDB = [
    { name: "Select A patient name"},
    { name: "Smith, John J.",
        dob: "1/2/1993",
        vitals: { ecg: "78", spo2: "90", co2: "24",
                bloodPressure: "94",  pulse:"45"
            },
        curMeds : ["apple"],
        xraySrc: "brainXray.jpg"
    },
    { name: "Harold, Alice G.",
        dob: "9/10/2011",
        vitals: { ecg: "92", spo2: "91", co2: "28",
                bloodPressure: "114", pulse:"67"
            },
        curMeds : ["banana"],
        xraySrc: "lungXray.jpg"
    },
    { name: "Good, Markus H.",
        dob: "12/18/2019",
        vitals: { ecg: "68", spo2: "92", co2: "26",
                bloodPressure: "73", pulse:"78"
            },
        curMeds : ["carrot"],
        xraySrc: "handXray.jpeg"
    },
    { name: "Andrews, Carol H.",
        dob: "7/8/2009",
        vitals: { ecg: "81", spo2: "93", co2: "25",
                bloodPressure: "101", pulse:"83"
            },
        curMeds : ["carrot", "veggies"],
        xraySrc: "brainXray.jpg"
    },
    { name: "Groot, Groot G.",
        dob: "4/12/1969",
        vitals: { ecg: "74", spo2: "94", co2: "29",
                bloodPressure: "98", pulse:"91"
            },
        curMeds : ["water", "pruners"],
        xraySrc: "lungXray.jpg"
    }
];

//checks whether user has logged in already, displays accordingly
function checkLoggedIn() {
    var userLoggedIn = sessionStorage.getItem("userLoggedIn");
    if(userLoggedIn != null) {
        hideLogin();
        document.getElementById("user-profile").style.visibility = "visible";
        document.getElementById("patient_page").style.visibility = "visible";
        document.getElementById("devices_page").style.visibility = "visible";
        var currUser = sessionStorage.getItem("currentUser");
        document.getElementById("shift-user").innerHTML = "User ID: " + currUser;
        document.getElementById("shift-user").style.fontWeight = "bold";
        var time = sessionStorage.getItem("loginTime").split(',');
        document.getElementById("shift-date").value = time[0];
        document.getElementById("shift-start").value = time[1];
        var notes = sessionStorage.getItem("shift-notes");
        if (notes) {
            document.getElementById("shift-notes").value = notes;
        }
    }
    else {
        document.getElementById("user-profile").style.visibility = "hidden";
        document.getElementById("patient_page").style.visibility = "hidden";
        document.getElementById("devices_page").style.visibility = "hidden";
        showLogin();
    }
}

function hideLogin() {
    var logIn = document.getElementById("login");
    if (logIn) {
        logIn.remove();
    }
}

function showLogin() {
    var logIn = $("#appendLogin").html();
    $("#loginContainer").append(logIn);
}

function login() {
    // user must enter username & pass 
    if (document.getElementById("textUser").value == "" || document.getElementById("textPass").value == "") {
        alert("Please enter username and password.");
    }
    else {
        // log-in allows viewing of user profile and webpage tabs
        var currUser = document.getElementById("textUser").value;
        sessionStorage.setItem("currentUser", currUser);
        sessionStorage.setItem("userLoggedIn", true);
        var dt = new Date();
        sessionStorage.setItem("loginTime", dt.toLocaleString());
        checkLoggedIn();
    }
}
// Saves the shift text box information 
function saveShift() {
    var notes = document.getElementById("shift-notes").value;
    sessionStorage.setItem("shift-notes", notes);
}

function viewShift() {
  alert("This feature would be implemented with a database storage capability.")
}
// Clears the session
function logout() {
    alert("Thank you for using the ICU Patient eHealth and eMonitoring System!");
    endSession();
    location.reload();
}

//used for patients page
// Loads the patient drop down on page load
function firstLoad() {
    loadPatients();
    if(sessionStorage.getItem("loaded") != null) {
        var index = sessionStorage.getItem("index");
        updatePatient(index);
    }
}
// Loads the patients to the drop down menu
function loadPatients() {
    var select = document.getElementById("patient_list");
    for (var i = 0; i < patientsDB.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = patientsDB[i].name;
        select.appendChild(option);
    }
    sessionStorage.setItem("loaded", true);
}
// Updates the information on the Patients page when a patient is selected
function updatePatient(index) {    
    if (index == 0 || index == null) return;
    else {
        document.getElementById("name_area").value = patientsDB[index].name;
        var base_notes = "Current Meds:";
        for (i = 0; i < patientsDB[index].curMeds.length; i++) {
            if (i < patientsDB[index].curMeds.length - 1) {
                base_notes = base_notes + " " + patientsDB[index].curMeds[i] + ", ";
            }
            else {
                base_notes = base_notes + " " + patientsDB[index].curMeds[i];
            }
        };
        document.getElementById("info_area").value = "DOB: " + patientsDB[index].dob +
            "\n" + base_notes;
        var vitals = "";
        for (var key in patientsDB[index].vitals) {
            vitals = vitals + key + ": " + patientsDB[index].vitals[key] + "\n";
        }
        document.getElementById("vitals_area").value = vitals;
        var patient_notes = sessionStorage.getItem("patient_notes_" + index);
        if (patient_notes) { 
            document.getElementById("patient_notes_area").value = patient_notes;
        }
        else {
            document.getElementById("patient_notes_area").value = "";
        }
        // saves the index of the selected patient so the information can be reloaded when needed
        curPatientIndex = index;

        sessionStorage.setItem("index", curPatientIndex);        
    }
    
};
// Saves the entered notes to the session
function save_notes() {
    var index = sessionStorage.getItem("index");
    var notes = document.getElementById("patient_notes_area").value;
    sessionStorage.setItem("patient_notes_" + index, notes);
}

//fetches patient index from session storage, updates page to display patient name
function loadDev()
{
    var index = sessionStorage.getItem("index");
    curPatientIndex = index;
    document.getElementById("patientNameDEV").innerHTML = patientsDB[index].name;

    //updates the vitals portion of the devices page
    displayUser();
}

//updates the xray section of the page to display the patient's xrays on file
function displayXRays()
{
    //ensures a patient is selected
    if(curPatientIndex == 0 || curPatientIndex == null)
        alert("Patient must be selected first.");
    
    //updates the xray source to the file corresponding to the current selected patient
    else
    {
        console.log(curPatientIndex);
        document.getElementById("xrayIMG").src = patientsDB[curPatientIndex].xraySrc;
        document.getElementById("xray").style.visibility = "visible";
    }   
}

//updates the user's vital signs and unique information
function displayUser()
{
    //will not display information if no user selected
    if(curPatientIndex == null || curPatientIndex == 0) return;

    var curPatient = patientsDB[curPatientIndex];
    
    //updates the demographics section to reflect patient date of birth, current time
    var dt = new Date();    
    document.getElementById("basicDemographics").innerHTML = "DOB: " + patientsDB[curPatientIndex].dob + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + dt.toLocaleString();
    updateTime();

    //simulates changes in vitals as a typical monitor would
    changingLevels();

    document.getElementById("extDevice").innerHTML = "<button id=\"extDevButton\" onclick=updateExtDev(1)>&#8593;</button>&nbsp;" + extDev + "&nbsp;<button id=\"extDevButton\"onclick=updateExtDev(-1)>&#8595;</button>" ;
    document.getElementById("patientDevices").style.visibility = "visible";
}

//updates the current time shown on devices page
function updateTime()
{
    setInterval(function(){    
        var dt = new Date();     
        document.getElementById("basicDemographics").innerHTML = "DOB: " + patientsDB[curPatientIndex].dob + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + dt.toLocaleString();
}, 100);
}

//to simulate changes in ECG levels of the patient, updates the number on display
function changeECG()
{
    var curPatient = patientsDB[curPatientIndex];
    var modifier = Math.floor(Math.random() * 4) - 2;
    modifier = Math.abs(parseInt(curPatient.vitals.ecg) + modifier);
    
    //added to reflect more realistic changes, within the range of the average adult ecg levels 
    if(modifier < 100 && modifier > 60)
    {
        curPatient.vitals.ecg = modifier;
    }    
    else
    {
        if(modifier > 100)   
            curPatient.vitals.ecg = parseInt(curPatient.vitals.ecg) - 1;
        else
            curPatient.vitals.ecg = parseInt(curPatient.vitals.ecg) + 1;
    }
    
    document.getElementById("ecgLvl").innerHTML = curPatient.vitals.ecg;
}

//to simulate changes in SPO2 levels of the patient, updates the number on display
function changeSPO2()
{
    var curPatient = patientsDB[curPatientIndex];
    var modifier = Math.floor(Math.random() * 4) - 2;
    modifier = Math.abs(parseInt(curPatient.vitals.spo2) + modifier);
 
    //added to reflect more realistic changes, within the range of the average adult ecg levels 
    if(modifier < 100 && modifier > 90)
    {
        curPatient.vitals.spo2 = modifier;
    }    
    else
    {
        if(modifier > 100)   
            curPatient.vitals.spo2 = parseInt(curPatient.vitals.spo2) - 1;
        else
            curPatient.vitals.spo2 = parseInt(curPatient.vitals.spo2) + 1;
    }

    document.getElementById("spo2Lvl").innerHTML = curPatient.vitals.spo2;
}

//to simulate changes in Heart Rate level of the patient, updates the number on display
function changeHR()
{
    var curPatient = patientsDB[curPatientIndex];
    var modifier = Math.floor(Math.random() * 4) - 2;
    modifier = Math.abs(parseInt(curPatient.vitals.pulse) + modifier);
    
    //added to reflect more realistic changes, within the range of the average adult ecg levels 
    if(modifier < 100 && modifier > 40)
    {
        curPatient.vitals.pulse = modifier;
    }    
    else
    {
        if(modifier > 100)   
            curPatient.vitals.pulse = parseInt(curPatient.vitals.pulse) - 1;
        else
            curPatient.vitals.pulse = parseInt(curPatient.vitals.pulse) + 1;
    }

    document.getElementById("pulseLvl").innerHTML = curPatient.vitals.pulse + "<span style=\"font-size: 20px;\">&nbspBPM</span>";
}

//to simulate changes in CO2 level of the patient, updates the number on display
function changeCO2(){
    
    var curPatient = patientsDB[curPatientIndex];
    var modifier = Math.floor(Math.random() * 4) - 2;
    modifier = Math.abs(parseInt(curPatient.vitals.co2) + modifier);

    //added to reflect more realistic changes, within the range of the average adult ecg levels    
    if(modifier < 30 && modifier > 20)
    {
        curPatient.vitals.co2 = modifier;
    }    
    else
    {
        if(modifier > 30)   
            curPatient.vitals.co2 = parseInt(curPatient.vitals.co2) - 1;
        else
            curPatient.vitals.co2 = parseInt(curPatient.vitals.co2) + 1;
    }

    document.getElementById("co2Lvl").innerHTML = curPatient.vitals.co2 + "<span style=\"font-size: 20px;\">&nbspmEq/L</span>";
}

//to simulate changes in Blood Pressure level of the patient, updates the number on display
function changeBP(){
    
    var curPatient = patientsDB[curPatientIndex];
    var modifier = Math.floor(Math.random() * 4) - 2;
    modifier = Math.abs(parseInt(curPatient.vitals.bloodPressure) + modifier);

    //added to reflect more realistic changes, within the range of the average adult ecg levels    
    if(modifier < 120 && modifier > 80)
    {
        curPatient.vitals.bloodPressure = modifier;
    }    
    else
    {
        if(modifier > 80)   
            curPatient.vitals.bloodPressure = parseInt(curPatient.vitals.bloodPressure) - 1;
        else
            curPatient.vitals.bloodPressure = parseInt(curPatient.vitals.bloodPressure) + 1;
    }

    document.getElementById("bPressureLvl").innerHTML = curPatient.vitals.bloodPressure + "<span style=\"font-size: 20px;\">&nbspmmHg</span>";
}

//repeatedly calls the changeFunctions, to simulate the rapid changes occuring in levels of a patient
function changingLevels()
{
    var curPatient = patientsDB[curPatientIndex];

    //set initial values before the periodic changing
    document.getElementById("ecgLvl").innerHTML = curPatient.vitals.ecg;
    document.getElementById("spo2Lvl").innerHTML = curPatient.vitals.spo2;
    document.getElementById("pulseLvl").innerHTML = curPatient.vitals.pulse + "<span style=\"font-size: 20px;\">&nbspBPM</span>";
    document.getElementById("co2Lvl").innerHTML = curPatient.vitals.co2 + "<span style=\"font-size: 20px;\">&nbspmEq/L</span>";
    document.getElementById("bPressureLvl").innerHTML = curPatient.vitals.bloodPressure + "<span style=\"font-size: 20px;\">&nbspmmHg</span>";

    //changes the levels of vitals to reflect the dynamic changes of a real patient's changing rates
    setInterval(changeECG, 800);
    setInterval(changeSPO2, 760);
    setInterval(changeHR, 780);
    setInterval(changeCO2, 770);
    setInterval(changeBP, 790);
}

//based on value passed in (-1 or 1), the function will update the number/level, a simulation for an external device used 
function updateExtDev(modifier)
{
    console.log("MOD:" + modifier);
    extDev += parseInt(modifier);
    console.log("EXT:" + extDev);
    document.getElementById("extDevice").innerHTML = "<button id=\"extDevButton\" onclick=updateExtDev(1)>&#8593;</button>&nbsp;" + extDev + "&nbsp;<button id=\"extDevButton\"onclick=updateExtDev(-1)>&#8595;</button>" ;
}

//clears the session's stored data so the website acts like it was freshly laoded (used when user logs out)
function endSession() {
    sessionStorage.clear();
}
