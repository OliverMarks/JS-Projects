import React, { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  const handleAddToList = () => {
    if (value.length > 0) {
    setList([...list, value]);
    setValue("");
    }
  };

  const handleRemoveFromList = (item) => {
    const updatedList = list.filter((prevItem) => prevItem !== item);
    setList(updatedList);
  };

  const [hov, setHov] = useState(false)

  const handleHov = () => {
      setHov(!hov);
  }


  return (
    <div className="text-black flex flex-col justify-center items-center bg-slate-300 h-screen">
      <h1  onMouseEnter={() => {
    if (!hov) {
      handleHov();
    }
  }}
  onMouseLeave={() => {
    if (hov) {
      handleHov();
    }
  }} className="text-green-600">Test</h1>

      {hov ? <h1>hov working</h1> : null}

      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="button" onClick={handleAddToList}>
          Add to list
        </button>
        </div>

      {list.map((item, index) => (
        <div key={index} className="flex">
        <p>{item}</p> 
        <span className="ml-2 hover:cursor-pointer" onClick={() => handleRemoveFromList(item)}>x</span>
        </div>
      ))}
    </div>
  );
}

export default App;

