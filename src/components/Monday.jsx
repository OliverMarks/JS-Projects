import { useEffect, useState, useContext} from "react"
import { SelectionContext } from "../App"



export default function Monday ({day, inventory, addToInventory}) {

    
    
    const peopleOptions = inventory.people.map((person, idx) => { 
        return (
        <option value = {person} key={idx}>{person}</option>)
    })
        

 const { selections, updateSelection } = useContext(SelectionContext);

  // Handle the select element change and update the context state
        function handleSelectChange(event) {
                const { name, value } = event.target;
                 updateSelection(day, name, value);
                }

        


    return (
        <div className="day-container">
            <h1>Monday</h1>
            <p> <span className="clickable-span" onClick={() => addToInventory("Paul", "people")}>Paul</span> 
             left his <span className="clickable-span" onClick={() => addToInventory("Black hat", "items")}>black hat</span> 
             on the staircase and muddled his way to <span className="clickable-span" onClick={() => addToInventory("Town", "locations")}>town</span>. There we met 
            <select className="name-selector" type="select" name="option1" value={selections[day]?.option1} onChange={handleSelectChange} multiple={false}>
                <option id="name" value=""></option>
                {peopleOptions}
            </select> who promptly left with a knowing wink and a spring in his step.</p>
            </div>
    )
    
        }





        // const [monAnswers, setMonAnswers] = useState(() => {
//     return JSON.parse(localStorage.getItem('monAnswers'))
// }) 

// useEffect (() => {
//     localStorage.removeItem('monAnswers')
//     localStorage.setItem('monAnswers', JSON.stringify(monAnswers));
//  }, [monAnswers]) 



      

        // const handleSelectChange = (e) => {
        //     setMonAnswers(e.target.value);
        //   };