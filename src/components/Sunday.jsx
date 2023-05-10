import { useState, useContext } from "react"
import { SelectionContext } from "../App"

export default function Sunday ({day, inventory, addToInventory}) {

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
            <h1>Sunday</h1>
            <p> Well this has turned out be quite the week. The mystery of who had been found was solved when <select className="name-selector" type="select" name="option1" value={selections[day]?.option1} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select> showed up to my  <select className="name-selector" type="select" name="option2" value={selections[day]?.option2} onChange={handleSelectChange}>
                <option value=""></option>
                {locationOptions}
            </select> cap in hand but with my <select className="name-selector" type="select" name="option3" value={selections[day]?.option3} onChange={handleSelectChange}>
                <option value=""></option>
                {itemOptions}
            </select>on! How did he get those?! I was speechless but <select className="name-selector" type="select" name="option4" value={selections[day]?.option4} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select> was certainly not. He explained how he'd long admired <select className="name-selector" type="select" name="option5" value={selections[day]?.option5} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select>s wardrobe and these trousers had become something of an obsesssion. Them being left on the boat had complicated matters because of sea law
            so he had arranged to have him killed and the police seize the goods. Then it was just left to <select className="name-selector" type="select" name="option6" value={selections[day]?.option6} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select> to use his old police contacts to get them from the evidence room. I couldn't believe what I was hearing, all this for a pair of trousers!
            He asked me if I was planning on snitching to the police. Quite honestly it all seemed a bit too much work so we decided to leave it at that. 
             </p>
            </div> 
    )
    
}