import React, { useState } from 'react';
import './DisplayDropdown.css';
import beforeSvg from '../assets/Display.svg'; // Replace with your actual SVG path
import afterSvg from '../assets/down.svg';  // Replace with your actual SVG path

function GroupingSelector({ setGrouping, setSortOption }) {
  const [selectedGrouping, setSelectedGrouping] = useState('status'); // Default grouping
  const [isOpen, setIsOpen] = useState(false);  // Manage dropdown visibility state
  const [selectedOrdering, setSelectedOrdering] = useState('priority');  // Default ordering

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleGroupingChange = (e) => {
    const value = e.target.value;
    setSelectedGrouping(value); 
    setGrouping(value);
  };

  const handleOrderingChange = (e) => {
    const value = e.target.value;
    setSelectedOrdering(value); 
    setSortOption(value);
  };

  return (
    <div className="dropdown-container">
      <button className="display-button" onClick={toggleDropdown}>
        <img src={beforeSvg} alt="before icon" className="svg-before" />
        Display
        <img src={afterSvg} alt="after icon" className="svg-after" />
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-section">
            <div className="dropdown-row">
              <label htmlFor="grouping">Grouping</label>
              <select
                id="grouping"
                value={selectedGrouping}
                onChange={handleGroupingChange}
              >
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
          <div className="dropdown-section">
            <div className="dropdown-row">
              <label htmlFor="ordering">Ordering</label>
              <select
                id="ordering"
                value={selectedOrdering}
                onChange={handleOrderingChange}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupingSelector;
