import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import GroupingSelector from './components/GroupingSelector';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  
  // Retrieve saved grouping and sorting options from localStorage or use defaults
  const savedGrouping = localStorage.getItem('grouping') || 'status';
  const savedSortOption = localStorage.getItem('sortOption') || null;
  
  const [grouping, setGrouping] = useState(savedGrouping);
  const [sortOption, setSortOption] = useState(savedSortOption);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets || []);
        setUsers(data.users || []);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Save the grouping and sorting options whenever they change
  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  return (
    <div className="App">
      <GroupingSelector setGrouping={setGrouping} setSortOption={setSortOption} />
      <KanbanBoard tickets={tickets} users={users} grouping={grouping} sortOption={sortOption} />
    </div>
  );
}

export default App;
