import { useState, useEffect, createContext } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { useAutoAnimate } from '@formkit/auto-animate/react'


import Sidebar from "./components/sidebar"
import Monday from './components/Monday'
import Tuesday from './components/Tuesday'
import Wednesday from './components/Wednesday'
import Thursday from './components/Thursday'
import Friday from './components/Friday'
import Saturday from './components/Saturday'
import Sunday from './components/Sunday'

import GameOver from './components/gameOver'


import './App.css'
import * as _ from 'lodash';



  export const SelectionContext = createContext()
  

function App() {

  
  const [inventory, setInventory] = useState({
    people: [],
    items: [],
    locations: [],
  })




  const [selections, setSelections] = useState({})

  function updateSelection(day, option, value) {
    setSelections(prevSelections => ({
      ...prevSelections,
      [day]: {
        ...prevSelections[day],
        [option]: value
      }
    }));
  }

  function addToInventory (object, category) {
    if (inventory[category].includes(object)) {
      return
    }
    setInventory(prevInventory => ({
      ...prevInventory,
      [category]: [...prevInventory[category], object]
    }))
  }



  const [answersSubmitted, setAnswersSubmitted] = useState(false)

  const [isDayCorrect, setIsDayCorrect] = useState({
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
    Sunday: null
  })





  const answers = {
    Monday: {
      option1: 'Clem'
    },
    Tuesday:{
      option1: 'Paul',
      option2: 'Black hat'
    },
    Wednesday: {
      option1:'Paul',
      option2:'Clem',
      option3: 'Town',
      option4: 'Black hat'
    }, 
    Thursday:{
      option1:'Paul'
    },
    Friday:{
      option1:'Canal Boat',
      option2:'Stinky Pete', 
      option3: 'Paul',
      option4: 'Clem'
    },
    Saturday:{
      option1: 'Velvet Trousers', 
      option2: 'Clem'
    },
    Sunday:{ 
      option1: 'Paul', 
      option2: 'Canal Boat',
      option3: 'Velvet Trousers',
      option4: 'Paul',
      option5: 'Stinky Pete', 
      option6: 'Clem' 
  }
}



  
  const checkSubmit = () => {
      setAnswersSubmitted(true)
      for (let day in selections) {
        if (_.isEqual(answers[day], selections[day])) {
         setIsDayCorrect(prevDays => ({
           ...prevDays,
           [day]: true
         }));
        } else {
         setIsDayCorrect(prevDays => ({
           ...prevDays,
           [day]: false
         }));
        }
       }
      
  };

      const tabStyling = (day) => {
        if (isDayCorrect[day] && answersSubmitted) {
          return "correct-tab"
        } else if (!isDayCorrect[day] && answersSubmitted) {
           return "incorrect-tab"
        } else { 
          return ""}
        }

        const [tabRef] = useAutoAnimate()


  return (
    <SelectionContext.Provider value ={{selections, updateSelection}}>

    <div className='container'>
        <Sidebar
        inventory = {inventory}
        />
      
    <div className="calendar-container">
      <Tabs  selectedTabClassName={"active"}  >

    <TabList className={"tabs"}>
      <Tab className = {tabStyling("Monday")}> Monday </Tab>
      <Tab className = {tabStyling("Tuesday")} >Tuesday</Tab>
      <Tab className = {tabStyling("Wednesday")}>Wednesday</Tab>
      <Tab className = {tabStyling("Thursday")} >Thursday</Tab>
      <Tab className = {tabStyling("Friday")} >Friday</Tab>
      <Tab className = {tabStyling("Saturday")} >Saturday</Tab>
      <Tab className = {tabStyling("Sunday")} >Sunday</Tab>
      <button onClick={checkSubmit}>Submit</button>
    </TabList>
    <TabPanel >
    <Monday
        day = "Monday"
        inventory = {inventory}
        addToInventory = {addToInventory}
          />
    </TabPanel>
    
    <TabPanel>
    <Tuesday
        day = "Tuesday" 
        inventory = {inventory}
        addToInventory = {addToInventory}
          />
    </TabPanel>


    <TabPanel>
    <Wednesday 
          day = "Wednesday"
          inventory = {inventory}
      />

    </TabPanel>

    <TabPanel>
    <Thursday 
          day = "Thursday"
          inventory = {inventory}
          addToInventory = {addToInventory}

            />

    </TabPanel>

    <TabPanel>
    <Friday
          day = "Friday" 
          inventory = {inventory}
          addToInventory = {addToInventory}
            />

    </TabPanel>


    <TabPanel>
    <Saturday
          day = "Saturday" 
          inventory = {inventory}
          addToInventory = {addToInventory}
            />

    </TabPanel>



    <TabPanel>
    <Sunday
          day = "Sunday" 
          inventory = {inventory}
          addToInventory = {addToInventory}
            />

    </TabPanel>

  </Tabs>

  </div>
     
  {Object.values(isDayCorrect).every(value => value) ? <GameOver /> : null}

        </div>
 </SelectionContext.Provider>

    
  );
}

export default App;




  

