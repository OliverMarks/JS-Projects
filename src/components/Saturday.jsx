import { useState, useContext } from "react"
import { SelectionContext } from "../App"


export default function Saturday ({day, inventory, addToInventory}) {

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

        const { selections, updateSelection } = useContext(SelectionContext);

        // Handle the select element change and update the context state
              function handleSelectChange(event) {
                      const { name, value } = event.target;
                       updateSelection(day, name, value);
                      }

    return (
        <div className="day-container">
            <h1>Saturday</h1>
            <p> The feds were back and for some reason they wanted to take the
            <select className="name-selector" type="select" name="option1" value={selections[day]?.option1} onChange={handleSelectChange}>
                <option value=""></option>
                {itemOptions}
            </select>
             as evidence. I tried to explain sea law but it fell on deaf ears. 
            why do they need them? They told me not to leave the area for the time being, Surely I can't be a suspect? I decided to head 
            into town for a drink to clear my head and to my surprise i saw <select className="name-selector" type="select" name="option2" value={selections[day]?.option2} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select> sat there grinning away as usual. I wonder what he was so happy about?
             </p>
            </div> 
    )
    
}