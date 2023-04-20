import { useEffect, useState } from "react"



export default function Monday ({setPeople, people, setItems, setLocations, items, locations, day}) {

    const options = people.map((person, idx) => { 
    return (
    <option value = {person} key={idx}>{person}</option>)
})

const [monAnswers, setMonAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem('monAnswers'))
}) 

useEffect (() => {
    localStorage.removeItem('monAnswers')
    localStorage.setItem('monAnswers', JSON.stringify(monAnswers));
 }, [monAnswers]) 



      

        const handleSelectChange = (e) => {
            setMonAnswers(e.target.value);
          };


        const addToList = (object, array, state) => {
            if (array.includes(object)) {
                return
            }
            state( prev => [...prev, object])
        }


    return (
        <div className="day-container">
            <h1>Monday</h1>
            <p> <span className="clickable-span" onClick={() => addToList("Paul", people, setPeople)}>Paul</span> 
             left his <span className="clickable-span" onClick={() => addToList("Black hat", items, setItems)}>black hat</span> 
             on the staircase and muddled his way to <span className="clickable-span" onClick={() => addToList("Town", locations, setLocations)}>town</span>. There we met 
            <select className="name-selector" type="select" value={monAnswers}  onChange={handleSelectChange} multiple={false}>
                <option id="name" value=""></option>
                {options}
            </select> who promptly left with a knowing wink and a spring in his step.</p>
            </div>
    )
    
        }