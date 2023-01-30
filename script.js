const storageValue = document.querySelector("#storage_value");
const storageInput = document.querySelector("#storage");
const transferValue = document.querySelector("#transfer_value");
const transferInput = document.querySelector("#transfer");
const backblaze_chart = document.querySelector("#backblaze_chart");
const bunny_chart = document.querySelector("#bunny_chart");
const scaleway_chart = document.querySelector("#scaleway_chart");
const vultr_chart = document.querySelector("#vultr_chart");
const backblaze_value = document.querySelector("#backblaze_value");
const bunny_value = document.querySelector("#bunny_value");
const scaleway_value = document.querySelector("#scaleway_value");
const vultr_value = document.querySelector("#vultr_value");
const backblazeStorageCost = 0.005;
const backblazeTransferCost = 0.01;
const backblazeMin = 7;
const bunnyStorageHDDCost = 0.01;
const bunnyStorageSSDCost = 0.02;
const bunnyTransfer = 0.01;
const bunnyMax = 10;
const scalewayStorageMulti = 0.06;
const scalewayStorageSingle = 0.03;
const scalewayTransfer = 0.02;
const vultrStorage = 0.01;
const vultrTransfer = 0.01;
const scalewayMultiFree = 75;
const scalewaySingleFree = 75;

let STOR;
let TRANS;

storageInput.addEventListener("input", (event) => {
    storageValue.textContent = event.target.value;
    STOR = +storageValue.value;
});

transferInput.addEventListener("input", (event) => {
    transferValue.textContent = event.target.value;
    TRANS = +transferValue.value;
});
