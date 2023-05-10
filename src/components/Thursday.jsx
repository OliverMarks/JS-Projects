import { useState, useContext } from "react"
import { SelectionContext } from "../App"


export default function Thursday ({day, inventory, addToInventory}) {

    const peopleOptions = inventory.people.map(person => { 
    return (
    <option value = {person}>{person}</option>)
})

//     const locationOptions = inventory.locations.map(location => { 
//         return (
//         <option value = {location}>{location}</option>)
//     })

//     const itemOptions = inventory.items.map(item => { 
//         return (
//         <option value = {item}>{item}</option>)
//     })


const { selections, updateSelection } = useContext(SelectionContext);

// Handle the select element change and update the context state
      function handleSelectChange(event) {
              const { name, value } = event.target;
               updateSelection(day, name, value);
              }


    return (
        <div className="day-container" >
            <h1>Thursday</h1>
            <p> Still no word about <select className="name-selector" type="select" name="option1" value={selections[day]?.option1} onChange={handleSelectChange} multiple={false}>
                <option id="name" value=""></option>
                {peopleOptions}
            </select>'s whereabouts. I am getting seriously concerned, this isn't like him at all. Meanwhile, 
                <span className="clickable-span" onClick={() => addToInventory("Stinky Pete", "people")}>Stinky Pete's</span> been on at me again. Something about wanting his <span className="clickable-span" onClick={() => addToInventory("Velvet Trousers", "items")}>velvet trousers</span> back. 
                No chance pal, you leave them in my <span className="clickable-span" onClick={() => addToInventory("Canal Boat", "locations")}> canal boat </span> and they're legally mine, that's sea law. </p>
            </div> 
    )
    
}