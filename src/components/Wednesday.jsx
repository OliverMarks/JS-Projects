import { useState, useEffect } from "react"

export default function Wednesday ({setPeople, people, locations, items}) {

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



    const [wedAnswers, setWedAnswers] = useState(() => {
            const localStorageValue = JSON.parse(localStorage.getItem('wedAnswers'));
            return localStorageValue !== null && localStorageValue !== undefined ? localStorageValue : [];
          });
    

    
    

    useEffect (() => {
        localStorage.setItem('wedAnswers', JSON.stringify(wedAnswers));
     }), [wedAnswers] 


     const handleSelectChange = (e) => {
        setWedAnswers(prev => [...prev, e.target.value]);
      };


    return (
        <div className="day-container">
            <h1>Wednesday</h1>
            <p>We haven't seen <select className="name-selector" type="select" onChange={handleSelectChange} value={wedAnswers[0]}>
                <option value=""></option>
                {options}
            </select> since Monday. He was last seen in <select className="name-selector" type="select" onChange={handleSelectChange} value={wedAnswers[1]}>
                <option value=""></option>
                {locationOptions}
            </select> and someone found his <select className="name-selector" type="select" onChange={handleSelectChange} value={wedAnswers[2]}>
                <option value=""></option>
                {itemOptions}
            </select> there. I'm sure he'll turn up at some point. </p>
            </div> 
    )
    
}