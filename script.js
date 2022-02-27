// merged js files!
var curPatientIndex = -1;

var patientsDB = [
    { name: "Select A patient name"},
    { name: "Smith, John J.",
        dob: "1/2/1993",
        vitals: { ecg: "4", spo2: "5", co2: "6",
                bloodPressure: "7",  pulse:"8"
            },
        curMeds : ["apple"]
    },
    { name: "Harold, Alice G.",
        dob: "9/10/2011",
        vitals: { ecg: "12", spo2: "13", co2: "14",
                bloodPressure: "15", pulse:"16"
            },
        curMeds : ["banana"]
    },
    { name: "Good, Markus H.",
        dob: "12/18/2019",
        vitals: { ecg: "20", spo2: "21", co2: "22",
                bloodPressure: "23", pulse:"24"
            },
        curMeds : ["carrot"]
    },
    { name: "Andrews, Carol H.",
        dob: "7/8/2009",
        vitals: { ecg: "20", spo2: "21", co2: "22",
                bloodPressure: "23", pulse:"24"
            },
        curMeds : ["carrot", "veggies"]
    },
    { name: "Groot, Groot G.",
        dob: "4/12/1969",
        vitals: { ecg: "20", spo2: "21", co2: "22",
                bloodPressure: "23", pulse:"24"
            },
        curMeds : ["water", "pruners"]
    }
];

function loadPatients() {
    var select = document.getElementById("patient_list");
    for (var i = 0; i < patientsDB.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = patientsDB[i].name;
        select.appendChild(option);
    }
};