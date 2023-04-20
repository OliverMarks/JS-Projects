export default function Saturday ({setPeople, people, locations, items}) {

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



    return (
        <div className="day-container">
            <h1>Saturday</h1>
            <p>We haven't seen <select className="name-selector" type="select">
                <option value=""></option>
                {options}
            </select> since Monday. He was last seen in <select className="name-selector" type="select">
                <option value=""></option>
                {locationOptions}
            </select> and someone found his <select className="name-selector" type="select">
                <option value=""></option>
                {itemOptions}
            </select> there. I'm sure he'll turn up at some point. </p>
            </div> 
    )
    
}