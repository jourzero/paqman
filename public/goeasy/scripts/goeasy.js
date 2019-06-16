// Constants
const weeklyUnits = 14;

// Default values
let defaults = [
    [40, 25, "Scotch"],
    [12, 125, "WineByVolume"],
    [12, 175, "WineGlass"],
    [5, 330, "BeerBottle"],
    [5, 500, "BeerPint"],
    [3.5, 341, "Custom"]
];

// Reset drinking units and log every week
function resetUnits() {
    let unitsLeft = weeklyUnits;

    // Reset drink log
    localStorage.setItem("log", "");
    logger("Reset (" + unitsLeft + ")");

    // Reset units left
    $("#unitsLeft").val(unitsLeft);
    localStorage.setItem("unitsLeft", unitsLeft);

    return unitsLeft;
}

// Restore tweaked strength/volume drink values from local storage and update UI
function restoreDrinkParams() {
    for (let i = 0; i < defaults.length; i++) {
        // Get default values
        let defaultStrength = defaults[i][0];
        let defaultVolume = defaults[i][1];
        let defaultName = defaults[i][2];

        // Get saved values
        let strength = localStorage.getItem(defaultName + "Strength");
        let volume = localStorage.getItem(defaultName + "Volume");
        let name = localStorage.getItem(defaultName + "Name");

        // Use default values if nothing was saved before
        if (!strength) strength = defaultStrength;
        if (!volume) volume = defaultVolume;
        if (!name) name = defaultName;

        // Calculate Units
        let units = Number((strength * volume) / 1000).toFixed(1);

        // Update UI
        $("#" + defaultName + "Strength").val(strength);
        $("#" + defaultName + "Volume").val(volume);
        $("#" + defaultName + "Name").val(name);
        $("#" + defaultName + "Units").val(units);
    }
    saveDrinkParams();
}

// Save tweaked strength/volume drink values from UI
function saveDrinkParams() {
    for (let i = 0; i < defaults.length; i++) {
        let drink = defaults[i][2];

        // Get values from UI
        let strength = $("#" + drink + "Strength").val();
        let volume = $("#" + drink + "Volume").val();
        let name = $("#" + drink + "Name").val();

        // Calculate units and update UI
        let units = Number((strength * volume) / 1000).toFixed(1);
        $("#" + drink + "Units").val(units);

        // Save values
        localStorage.setItem(drink + "Strength", strength);
        localStorage.setItem(drink + "Volume", volume);
        localStorage.setItem(drink + "Name", name);
    }
}

function takeUnits(drinkType) {
    let unitsTaken = $("#" + drinkType + "Units").val();
    let unitsLeft = $("#unitsLeft").val();
    unitsLeft -= unitsTaken;
    unitsLeft = Number(unitsLeft).toFixed(1);
    $("#unitsLeft").val(unitsLeft);
    localStorage.setItem("unitsLeft", unitsLeft);
    saveCustoms();
    logger(unitsTaken + " " + drinkType + " un. (" + unitsLeft + ")");
    return unitsLeft;
}

function restoreUnits() {
    let unitsLeft = localStorage.getItem("unitsLeft");
    $("#unitsLeft").val(unitsLeft);
    return unitsLeft;
}

function saveCustoms() {
    localStorage.setItem("CustomVolume", $("#CustomVolume").val());
    localStorage.setItem("CustomStrength", $("#CustomStrength").val());
}

function restoreCustoms() {
    $("#CustomVolume").val(localStorage.getItem("CustomVolume"));
    $("#CustomStrength").val(localStorage.getItem("CustomStrength"));
    $("#customUnits").val(getCustomUnits());
}

function getCustomUnits() {
    let customStrength = $("#CustomStrength").val();
    let customVolume = $("#CustomVolume").val();
    let customUnits = Number((customStrength * customVolume) / 1000).toFixed(1);
    $("#customUnits").val(customUnits);
    saveCustoms();
    return customUnits;
}

function logger(input) {
    let ts = new Date();
    let msg = ts.toLocaleDateString() + ": " + input;
    let entries = localStorage.getItem("log");
    if (entries === null) localStorage.setItem("log", msg);
    else localStorage.setItem("log", entries + "\n" + msg);
    console.log(msg);
}

function showLog() {
    let entries = localStorage.getItem("log");
    alert("Log Entries:\n" + entries);
}
