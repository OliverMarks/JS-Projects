import { useState, useEffect } from "react"


export default function Tuesday ({setPeople, people}) {

    const options = people.map(person => { 
    return (
    <option value = {person}>{person}</option>)
})


const addToList = (object, array, state) => {
    if (array.includes(object)) {
        return
    }
    state( prev => [...prev, object])
}


const [tuesAnswers, setTuesAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem('tuesAnswers'))
}) 

useEffect (() => {
    localStorage.removeItem('removeAnswers')
    localStorage.setItem('tuesAnswers', JSON.stringify(tuesAnswers));
 }), [tuesAnswers] 



        // const checkAnswers  = () => {
        //         if (answers.includes("Clem")) 
        //         return setIsDayCorrect(prev => [...prev, {Mon: true}])
        // }

        const handleSelectChange = (e) => {
            setTuesAnswers(e.target.value);
          };

    return (
        <div className="day-container">
            <h1>Tuesday</h1>
            <p>Another day with these clowns. <select className="name-selector" type="select" onChange={handleSelectChange} value={tuesAnswers}>
                <option value=""></option>
                {options}
            </select> had his fucking black hat on again, does he not own any other clothing? 
                <span className="clickable-span" onClick={() => addToList("Clem", people, setPeople)}>Clem</span> 
             didn't stay for long as per. Where is he always skipping off to and why the grin?</p>
            </div>
    )
    
}