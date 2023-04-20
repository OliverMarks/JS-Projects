


export default function Sidebar ({people, items, locations}) {
    

    return (
        <div className="sidebar-container">
                <h2>People</h2>
               {people.map((person, idx) => <p key= {idx}> {person} </p>)} 

                <h2>Items</h2> 
                {items.map((item, idx) => <p key= {idx}> {item} </p>)}

                <h2>Locations</h2> 
                {locations.map((location, idx) => <p key= {idx}> {location} </p>)} 

        </div>


    )
}