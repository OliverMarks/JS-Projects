import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faObjectGroup, faMapLocationDot, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({ inventory }) {

  const [inventoryList] = useAutoAnimate()
  const [isExpanded, setIsExpanded] = useState(true)

  const handleToggleSidebar = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded)
  }

  return (
    <div className={`sidebar-container ${isExpanded ? 'expanded' : ''}`} >
      <div className="sidebar-header" onClick={handleToggleSidebar}>
     <FontAwesomeIcon icon={isExpanded ? faArrowLeft : faArrowRight}/>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section" ref={inventoryList}>
            <div className="section-title">
          <FontAwesomeIcon icon={faPerson} className={!isExpanded ? "unexpanded-icon" : ""} />
          {isExpanded ? <h2>People</h2>: null}
          </div>
          {isExpanded &&
            inventory.people.map((person, idx) => (
              <p key={idx}>{person}</p>
            ))}
        </div>

        <div className="sidebar-section" ref={inventoryList}>
        <div className="section-title">
          <FontAwesomeIcon icon={faObjectGroup} className={!isExpanded ? "unexpanded-icon" : ""} />
          {isExpanded ?  <h2>Items</h2> : null}
 
          </div>
          {isExpanded &&
            inventory.items.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
        </div>

        <div className="sidebar-section" ref={inventoryList}>
            <div className="section-title">
          <FontAwesomeIcon icon={faMapLocationDot} className={!isExpanded ? "unexpanded-icon" : ""} />
          {isExpanded ?  <h2>Locations</h2> : null}
          </div>
          {isExpanded &&
            inventory.locations.map((location, idx) => (
              <p key={idx}>{location}</p>
            ))}
        </div>
      </div>
    </div>
  );
}
