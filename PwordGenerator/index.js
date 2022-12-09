const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", 
"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
"~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
 

let passwordLength = 15

    
    // Grabbing dom elements for empty password boxes and generate password button

    let unPopOne = document.getElementById("unpop-one")
    let unPopTwo = document.getElementById("unpop-two")
    let genPW = document.getElementById("gen-pw")

   

   // Generates a random index of character array to be used in password generator function 

function charGenerator() {
    for (let i = 0; i < characters.length; i++) {
    let randomIndex = Math.floor( Math.random()* characters.length)
    return characters[randomIndex]
    }
}

    // Functions to generate password 

    function generatePword () {
    let randoPassword = "";
        for (let i = 0; i < passwordLength; i++) {
        randoPassword += charGenerator()
    }
        return randoPassword
    }

    /* set variable for the two passwords by envoking the generate pword 
    function and adds the pword to the text content of the unpopulated boxes */ 

    function renderPword() {
    let generatedPasswordOne = generatePword ()
    let generatedPasswordTwo = generatePword ()

    unPopOne.textContent = generatedPasswordOne;
    unPopTwo.textContent = generatedPasswordTwo;

    }
    
    // adds event listener to generate button to populate unpopulated boxes with the render pword function 

    genPW.addEventListener('click',() => { 
    renderPword(); 
    });




    // Adds functionality to copy the generated password to clipboard when box is clicked
    
    // Copy Password 1
    unPopOne.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const passwordToCopy = unPopOne.innerText;
  
    // Edge Case when Password is Empty
    if (!passwordToCopy) return;
  
    // Copy Functionality
    textarea.value = passwordToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password Copied to Clipboard');
  });
   


  // Copy Password 2
  unPopTwo.addEventListener('click', () => {
    const textareaTwo = document.createElement('textarea');
    const passwordToCopy2 = unPopTwo.innerText;
  
    // Edge Case when Password is Empty
    if (!passwordToCopy2) return;
  
    // Copy Functionality
    textareaTwo.value = passwordToCopy2;
    document.body.appendChild(textareaTwo);
    textareaTwo.select();                                 
    document.execCommand('copy');
    textareaTwo.remove();
    alert('Password Copied to Clipboard');
  });
   

