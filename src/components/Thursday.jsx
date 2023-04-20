import { useState } from "react"

export default function Thursday ({setPeople, people, locations, items, setItems, setLocations}) {

    const options = people.map(person => { 
    return (
    <option value = {person}>{person}</option>)
})

    const locationOptions = locations.map(location => { 
        return (
        <option value = {location}>{location}</option>)
    })

    const itemOptions = items.map(item => { 
        return (
        <option value = {item}>{item}</option>)
    })

    const addToList = (object, array, state) => {
        if (array.includes(object)) {
            return
        }
        state( prev => [...prev, object])
    }



    return (
        <div className="day-container">
            <h1>Thursday</h1>
            <p><span className="clickable-span" onClick={() => addToList("Stinky Pete", people, setPeople)}>Stinky Pete's</span> been on at me again. Something about wanting his <span className="clickable-span" onClick={() => addToList("Velvet Trousers", items, setItems)}>velvet trousers</span> back. 
                No chance pal, you leave them in my <span className="clickable-span" onClick={() => addToList("Canal Boat", locations, setLocations)}> canal boat </span> and they're legally mine, that's sea law. </p>
            </div> 
    )
    
}