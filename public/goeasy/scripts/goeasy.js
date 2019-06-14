let weeklyUnits = 14;

function resetUnits() {
    let ts = new Date();
    let unitsLeft = weeklyUnits;
    $("#unitsLeft").val(unitsLeft);
    localStorage.setItem("unitsLeft", unitsLeft);
    $("#inVolume").val(localStorage.getItem("inVolume"));
    $("#inStrength").val(localStorage.getItem("inStrength"));
    $("#customUnits").val(getCustomUnits());
    localStorage.setItem("log", "");
    logger(ts.toLocaleString() + ": Reset unit(s)");
    return unitsLeft;
}

function takeUnits(unitsTaken, drinkType) {
    let ts = new Date();
    logger(ts.toLocaleString() + ": Took " + unitsTaken + " " + drinkType + " un.");
    let unitsLeft = $("#unitsLeft").val();
    unitsLeft -= Number(unitsTaken).toPrecision(2);
    $("#unitsLeft").val(unitsLeft);
    localStorage.setItem("unitsLeft", unitsLeft);
    saveCustoms();
    return unitsLeft;
}

function restoreUnits() {
    let unitsLeft = localStorage.getItem("unitsLeft");
    $("#unitsLeft").val(unitsLeft);
    return unitsLeft;
}

function saveCustoms() {
    localStorage.setItem("inVolume", $("#inVolume").val());
    localStorage.setItem("inStrength", $("#inStrength").val());
}

function restoreCustoms() {
    $("#inVolume").val(localStorage.getItem("inVolume"));
    $("#inStrength").val(localStorage.getItem("inStrength"));
    $("#customUnits").val(getCustomUnits());
}

function getCustomUnits() {
    let inStrength = $("#inStrength").val();
    let inVolume = $("#inVolume").val();
    let customUnits = Number((inStrength * inVolume) / 1000).toPrecision(2);
    $("#customUnits").val(customUnits);
    saveCustoms();
    return customUnits;
}

function logger(input) {
    let entries = localStorage.getItem("log");
    if (entries === null) localStorage.setItem("log", input);
    else localStorage.setItem("log", entries + "\n" + input);
    console.log(input);
}

function showLog() {
    let entries = localStorage.getItem("log");
    alert("Log Entries:\n" + entries);
}
