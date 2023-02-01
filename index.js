//pricing
const backblazeStorageCost = 0.005;
const backblazeTransferCost = 0.01;
const backblazeMin = 7;
const bunnyTransferCost = 0.01;
const bunnyMax = 10;
const vultrStorageCost = 0.01;
const vultrTransferCost = 0.01;
const vultrMin = 5;
const scalewayMultiFreeValue = 75;
const scalewaySingleFreeValue = 75;
let bunnyStorageHDDCost = 0.01;
let bunnyStorageSSDCost = 0.02;
let scalewayStorageMultiCost = 0.06;
let scalewayStorageSingleCost = 0.03;
let scalewayTransferCost = 0.02;

//elements on the page
const storageValue = document.querySelector(".storage_value");
const transferValue = document.querySelector(".transfer_value");
const storageInput = document.querySelector(".storage");
const transferInput = document.querySelector(".transfer");
const backblaze_chart = document.querySelector(".backblaze_chart");
const bunny_chart = document.querySelector(".bunny_chart");
const scaleway_chart = document.querySelector(".scaleway_chart");
const vultr_chart = document.querySelector(".vultr_chart");
const hdd = document.querySelector(".hdd");
const ssd = document.querySelector(".ssd");
const single = document.querySelector(".scaleway_button.single");
const multi = document.querySelector(".scaleway_button.multi");
const chart_value = document.querySelector(".chart_value");
let backblaze_value = document.querySelector(".backblaze_value");
let bunny_value = document.querySelector(".bunny_value");
let scaleway_value = document.querySelector(".scaleway_value");
let vultr_value = document.querySelector(".vultr_value");

//variables for calculations
let storage = +storageInput.value;
let transfer = +transferInput.value;
let backblazeTotal = 0;
let bunnyTotal = 0;
let scalewayTotal = 0;
let vultrTotal = 0;

//buttons events

hdd.addEventListener("click", (event) => {
    ssd.style.backgroundColor = "white";
    hdd.style.backgroundColor = "#ff33cc";
    bunnyStorageHDDCost = 0.01;
    bunnyStorageSSDCost = 0;
    bunnyCalc();
});

ssd.addEventListener("click", (event) => {
    hdd.style.backgroundColor = "white";
    ssd.style.backgroundColor = "#ff33cc";
    bunnyStorageSSDCost = 0.02;
    bunnyStorageHDDCost = 0;
    bunnyCalc();
});

single.addEventListener("click", (event) => {
    multi.style.backgroundColor = "white";
    single.style.backgroundColor = "#ff33cc";
    scalewayStorageMultiCost = 0;
    scalewayStorageSingleCost = 0.03;
    scalewayCalc();
});

multi.addEventListener("click", (event) => {
    single.style.backgroundColor = "white";
    multi.style.backgroundColor = "#ff33cc";
    scalewayStorageSingleCost = 0;
    scalewayStorageMultiCost = 0.06;
    scalewayCalc();
});

//initial inputs events

storageInput.addEventListener("input", (event) => {
    storage = +event.target.value;
    storageValue.textContent = event.target.value;
    backblazeCalc();
    bunnyCalc();
    if (storage < 75) {
        scalewayStorageMultiCost = 0;
        scalewayStorageSingleCost = 0;
    } else {
        scalewayStorageMultiCost = 0.06;
        scalewayStorageSingleCost = 0.03;
    }
    scalewayCalc();
    vultrCalc();
    resetColor();
    paintingSmallest();
});

transferInput.addEventListener("input", (event) => {
    transfer = +event.target.value;
    transferValue.textContent = event.target.value;
    backblazeCalc();
    bunnyCalc();
    if (transfer < 75) {
        scalewayTransferCost = 0;
    } else {
        scalewayTransferCost = 0.02;
    }
    scalewayCalc();
    vultrCalc();
    resetColor();
    paintingSmallest();
});

//calculation

function backblazeCalc() {
    backblazeStorage = +storageInput.value * backblazeStorageCost;
    backblazeTransfer = +transferInput.value * backblazeTransferCost;
    backblazeTotal =
        Math.round((backblazeStorage + backblazeTransfer) * 100) / 100;
    if (backblazeTotal < backblazeMin) {
        backblazeTotal = backblazeMin;
    } else {
        backblazeTotal;
    }
    backblaze_value.textContent = backblazeTotal;
    backblaze_chart.style.width = `${backblazeTotal * 3}px`;
}

function bunnyCalc() {
    bunnyStorage =
        +storageInput.value * (bunnyStorageHDDCost || bunnyStorageSSDCost);
    bunnyTransfer = +transferInput.value * bunnyTransferCost;
    bunnyTotal = Math.round((bunnyStorage + bunnyTransfer) * 100) / 100;
    if (bunnyTotal >= 10) {
        bunnyTotal = bunnyMax;
    } else {
        bunnyTotal;
    }
    bunny_value.textContent = bunnyTotal;
    bunny_chart.style.width = `${bunnyTotal * 3}px`;
    Math.round(bunnyTotal * 100) / 100;
}

function scalewayCalc() {
    scalewayStorage =
        (+storageInput.value - 75) *
        (scalewayStorageMultiCost || scalewayStorageSingleCost);
    scalewayTransfer = (+transferInput.value - 75) * scalewayTransferCost;
    scalewayTotal =
        Math.round((scalewayStorage + scalewayTransfer) * 100) / 100;
    if (scalewayTotal < 0) {
        scalewayTotal = 0;
    } else {
        scalewayTotal;
    }
    scaleway_value.textContent = scalewayTotal;
    scaleway_chart.style.width = `${scalewayTotal * 3}px`;
    Math.round(scalewayTotal * 100) / 100;
}

function vultrCalc() {
    vultrStorage = +storageInput.value * vultrStorageCost;
    vultrTransfer = +transferInput.value * vultrTransferCost;
    vultrTotal = Math.round((vultrStorage + vultrTransfer) * 100) / 100;

    if (vultrTotal < vultrMin) {
        vultrTotal = vultrMin;
    } else {
        vultrTotal;
    }
    vultr_value.textContent = vultrTotal;
    vultr_chart.style.width = `${vultrTotal * 3}px`;
    Math.round(vultrTotal * 100) / 100;
}

// painting smallest chart value

function paintingSmallest() {
    const charts = {
        backblaze_chart: backblaze_chart.offsetWidth,
        bunny_chart: bunny_chart.offsetWidth,
        scaleway_chart: scaleway_chart.offsetWidth,
        vultr_chart: vultr_chart.offsetWidth,
    };
    let smallest = "";
    for (var key in charts) {
        if (smallest !== "" && charts[key] < charts[smallest]) {
            smallest = key;
        } else if (smallest === "") {
            smallest = key;
        }
    }
    eval(smallest).style.backgroundColor = "red";
}

function resetColor() {
    backblaze_chart.style.backgroundColor = "lightgray";
    bunny_chart.style.backgroundColor = "lightgray";
    scaleway_chart.style.backgroundColor = "lightgray";
    vultr_chart.style.backgroundColor = "lightgray";
}
