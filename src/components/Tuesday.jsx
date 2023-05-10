import { useState, useEffect, useContext } from "react"
import { SelectionContext } from "../App"



export default function Tuesday ({day, inventory, addToInventory}) {

    const peopleOptions = inventory.people.map((person, idx) => { 
        return (
        <option value = {person} key={idx}>{person}</option>)
    })

    const itemOptions = inventory.items.map(item => { 
        return (
        <option value = {item}>{item}</option>)
    })

    

const { selections, updateSelection } = useContext(SelectionContext);

  // Handle the select element change and update the context state
        function handleSelectChange(event) {
                const { name, value } = event.target;
                 updateSelection(day, name, value);
                }

        

    return (
        <div className="day-container">
            <h1>Tuesday</h1>
            <p>Another day, another dollar. I met up with the lads again for our usual post work pint. <select className="name-selector" type="select" name="option1" value={selections[day]?.option1} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select> seemed anxious and kept taking his <select className="name-selector" type="select" name="option2" value={selections[day]?.option2} onChange={handleSelectChange}>
                <option value=""></option>
                {itemOptions}
            </select> off to stroke his hair. What was he so worried about? 
                <span className="clickable-span" onClick={() => addToInventory("Clem", "people")}>Clem</span> 
             didn't stay for long as per. Where is he always skipping off to and why is he always winking at people? Is it something from his police days?</p>
            </div> 
    )
    
}