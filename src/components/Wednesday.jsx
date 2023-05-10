import { useState, useEffect, useContext } from "react"
import { SelectionContext } from "../App"

export default function Wednesday ({inventory, day}) {

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
            <h1>Wednesday</h1>
            <p>I tried to get hold of <select className="name-selector" type="select" name="option1" value={selections[day]?.option1} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select> but there was no answer when I called so I asked <select className="name-selector" type="select" name="option2" value={selections[day]?.option2} onChange={handleSelectChange}>
                <option value=""></option>
                {peopleOptions}
            </select> if he'd seen him today. He hadn't but said he was last seen in <select className="name-selector" type="select" name="option3" value={selections[day]?.option3} onChange={handleSelectChange}>
                <option value=""></option>
                {locationOptions}
            </select> and that someone had found his <select className="name-selector" type="select" name="option4" value={selections[day]?.option4} onChange={handleSelectChange}>
                <option value=""></option>
                {itemOptions}
            </select> there. He's never without that damn thing - I hope nothing's happened to him. </p>
            </div> 
    )
    
}