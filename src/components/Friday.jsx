import { useState, useContext } from "react"
import { SelectionContext } from "../App"


export default function Friday ({day, inventory, addToInventory}) {

    const peopleOptions = inventory.people.map(person => { 
        return (
        <option value = {person}>{person}</option>)
    })
    
        const locationOptions = inventory.locations.map(location => { 
            return (
            <option value = {location}>{location}</option>)
        })
    
        const itemOptions = inventory.items.map(item => { 
            return (
            <option value = {item}>{item}</option>)
        })

        // <span className="clickable-span" onClick={() => addToInventory("Clem", "people")}> </span>
        const { selections, updateSelection } = useContext(SelectionContext);

        // Handle the select element change and update the context state
              function handleSelectChange(event) {
                      const { name, value } = event.target;
                       updateSelection(day, name, value);
                      }

    return (
        <div className="day-container">
            <h1>Friday</h1>
            <p>The police called round to my  <select className="name-selector" type="select" name="option1" value={selections[day]?.option1} onChange={handleSelectChange}>
                <option value=""></option>
                {locationOptions}
            </select>  saying they'd found a body. At first because the officer said he wasn't wearing any trousers so I thought it might 
               be 
               <select className="name-selector" type="select" name="option2" value={selections[day]?.option2} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select>
            but that didnt seem right. Maybe it was <select className="name-selector" type="select" name="option3" value={selections[day]?.option3} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select>? Nobody's seen him still. And  where's 
            <select className="name-selector" type="select" name="option4" value={selections[day]?.option4} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select> anyway? </p>
            </div> 
    )
    
}