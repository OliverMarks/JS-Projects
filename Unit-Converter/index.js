




// DOM elements 

const convertBtn = document.getElementById("convert-btn")
let lengthConversionResult = document.getElementById("lengthConversion")
let volumeConversionResult = document.getElementById("volumeConversion")
let massConversionResult = document.getElementById("massConversion")
let input = document.getElementById("input")



// On click of convert button calls all conversion functions
convertBtn.addEventListener("click", function() {
    lengthConversion(input.value),
volumeConversion(input.value),
massConversion(input.value)

})
    // conversion(input.value)
    


// on use of up and down arrows in the input field also calls conversion functions w/o need to refresh
// Would like to bring this into the JS rather than HTML, unsure how to target these arrows

// Length function 
function lengthConversion (number) {
    let meterToFeet = number * 3.281
    let feetToMeter = number / 3.281

return lengthConversionResult.innerHTML = `${number}m = ${Number(meterToFeet).toFixed(3)} feet 
| ${number}feet = ${Number(feetToMeter).toFixed(3)}m`
}

// Volume function 
function volumeConversion (number) {
    let literToGallon = number / 3.785
    let gallonToLiter = number * 3.785

return volumeConversionResult.innerHTML = `${number}L = ${Number(literToGallon).toFixed(3)} gal 
| ${number}gal = ${Number(gallonToLiter).toFixed(3)}L`
}

// Mass Function 
function massConversion (number) {
    let kgToPound = number * 2.205
    let poundToKg = number / 2.205

return massConversionResult.innerHTML = `${number}kg = ${Number(kgToPound).toFixed(3)}lbs 
| ${number}lbs = ${Number(poundToKg).toFixed(3)}kg`
}


// function conversion (number) {
    //     let meterToFeet = number * 3.281
    //     let feetToMeter = number / 3.281
    //     let literToGallon = number / 3.785
    //     let gallonToLiter = number * 3.785
    //     let kgToPound = number * 2.205
    //     let poundToKg = number / 2.205
        
    //     return {
    //     [lengthConversionResult.innerHTML = `${number}m = ${Number(meterToFeet).toFixed(3)} feet 
    //     ${number}feet = ${Number(feetToMeter).toFixed(3)}m`]
    
    //     [volumeConversionResult.innerHTML = `${number}L = ${Number(literToGallon).toFixed(3)} gal 
    //     ${number}gal = ${Number(gallonToLiter).toFixed(3)}L`],
    
    //    [massConversionResult.innerHTML = `${number}kg = ${Number(kgToPound).toFixed(3)}lbs 
    //     ${number}lbs = ${Number(poundToKg).toFixed(3)}kg`]
    //     }
    // }