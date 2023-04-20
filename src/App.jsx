import { useState, useEffect, createContext } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Sidebar from "./components/sidebar"
import Monday from './components/Monday'
import Tuesday from './components/Tuesday'
import Wednesday from './components/Wednesday'
import Thursday from './components/Thursday'
import Friday from './components/Friday'
import Saturday from './components/Saturday'
import Sunday from './components/Sunday'

import './App.css'



  export const SelectionContext = createContext()
  

function App() {
  const [isMounted, setIsMounted] = useState(false)
  const [people, setPeople] = useState([])
  const [items, setItems] = useState([])
  const [locations, setLocations] = useState([])

  const [selections, setSelections] = useState({})

// why isnt this clearing local storage on page refresh? 

  // useEffect (() => {
  //   if (isMounted === false) {
  //     localStorage.clear()
  //       setIsMounted(true)
  //     }
  //     return 
      
  // }, [])




const [isMonCorrect ,setIsMonCorrect] = useState(false)
const [isWedsCorrect ,setIsWedsCorrect] = useState(false)

    const checkSubmit = () => {
       const monAnswers = JSON.parse(localStorage.getItem('monAnswers'))
       if (monAnswers === "Clem") {
            setIsMonCorrect(true)
    }
  }




  return (
    <SelectionContext.Provider value ={{selections, updateSelection}}>

    <div className='container'>
        <Sidebar
        people = {people}
        items = {items}
        locations ={locations}
        />
      
    <div className='calendar-container'>
      <Tabs  selectedTabClassName={"active"}>
    <TabList className={"tabs"}>
      <Tab className={isMonCorrect ? "correctTab" : null}>Monday</Tab>
      <Tab >Tuesday</Tab>
      <Tab className={isWedsCorrect ? "correctTab" : null}>Wednesday</Tab>
      <Tab >Thursday</Tab>
      <Tab >Friday</Tab>
      <Tab >Saturday</Tab>
      <Tab >Sunday</Tab>
      <button onClick={checkSubmit}>Submit</button>
    </TabList>


    
    <TabPanel>
    <Monday
        day = "Monday"
        setPeople = {setPeople}
        people = {people}
        setItems = {setItems}
        items = {items}
        setLocations = {setLocations}
        locations = {locations}
        

          />
    </TabPanel>
    
    <TabPanel>
    <Tuesday
        setPeople = {setPeople}
        people = {people}
        setLocations = {setLocations}
        locations = {locations}
          />
    </TabPanel>


    <TabPanel>
    <Wednesday 
          setPeople = {setPeople}
          people = {people}
          setLocations = {setLocations}
          locations = {locations}
          items = {items}
            />

    </TabPanel>

    <TabPanel>
    <Thursday 
          setPeople = {setPeople}
          people = {people}
          setItems = {setItems}
          items = {items}
          setLocations = {setLocations}
          locations = {locations}
            />

    </TabPanel>

    <TabPanel>
    <Friday
          setPeople = {setPeople}
          people = {people}
          setLocations = {setLocations}
          locations = {locations}
          items = {items}
            />

    </TabPanel>


    <TabPanel>
    <Saturday
          setPeople = {setPeople}
          people = {people}
          setLocations = {setLocations}
          locations = {locations}
          items = {items}
            />

    </TabPanel>



    <TabPanel>
    <Sunday
          setPeople = {setPeople}
          people = {people}
          setLocations = {setLocations}
          locations = {locations}
          items = {items}
            />

    </TabPanel>

  
  
  </Tabs>
  </div>
     
        </div>
 </SelectionContext.Provider>

    
  );
}

export default App;





  

