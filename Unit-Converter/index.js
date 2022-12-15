
//variables 



// DOM elements 

const convertBtn = document.getElementById("convert-btn")
let lengthConversionResult = document.getElementById("lengthConversion")
let volumeConversionResult = document.getElementById("volumeConversion")
let massConversionResult = document.getElementById("massConversion")
let input = document.getElementById("input")


// input.value as parameter for all functions?




convertBtn.addEventListener("click", function(){
    lengthConversion(input.value)
    volumeConversion(input.value)
    massConversion(input.value)
})



// Length function 

function lengthConversion (number) {
    let meterToFeet = number * 3.281
    let feetToMeter = number / 3.281

return lengthConversionResult.innerHTML = `${input.value}m = ${Number(meterToFeet).toFixed(3)} feet 
| ${input.value}feet = ${Number(feetToMeter).toFixed(3)}m`
}

// Volume function 
function volumeConversion (number) {
    let literToGallon = number / 3.785
    let gallonToLiter = number * 3.785

return volumeConversionResult.innerHTML = `${input.value}L = ${Number(literToGallon).toFixed(3)} gal 
| ${input.value}gal = ${Number(gallonToLiter).toFixed(3)}L`
}

// Mass Function 
function massConversion (number) {
    let kgToPound = number * 2.205
    let poundToKg = number / 2.205


return massConversionResult.innerHTML = `${input.value}kg = ${Number(kgToPound).toFixed(3)}lbs 
| ${input.value}lbs = ${Number(poundToKg).toFixed(3)}kg`
}