import React from 'react';
import Ticket from './Ticket';
import './KanbanBoard.css';
import addIcon from '../assets/add.svg'; // Adjust the path based on your folder structure
import dotsIcon from '../assets/3dots.svg'; // Adjust the path based on your folder structure
import todoIcon from '../assets/To-do.svg';          
import backlogIcon from '../assets/Backlog.svg';      
import inProgressIcon from '../assets/in-progress.svg';
import urgentIcon from '../assets/urgent.svg';          
import highPriorityIcon from '../assets/high-priority.svg'; 
import mediumPriorityIcon from '../assets/medium-priority.svg'; 
import lowPriorityIcon from '../assets/low-priority.svg'; 
import noPriorityIcon from '../assets/no-priority.svg'; 

// Helper function to group tickets based on the selected grouping
function groupTickets(tickets, grouping) {
  const grouped = tickets.reduce((acc, ticket) => {
    const groupKey = ticket[grouping] || 'No group';
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(ticket);
    return acc;
  }, {});

  
  // Define the priority order to sort the keys
  const priorityOrder = ['No group', '4', '3', '2', '1'];

  // Sort the grouped keys based on the defined order
  const sortedGroups = Object.keys(grouped).sort((a, b) => {
    return priorityOrder.indexOf(a) - priorityOrder.indexOf(b);
  });
  
  // Create a new sorted object based on the priority order
  const sortedGroupedTickets = {};
  sortedGroups.forEach(group => {
    sortedGroupedTickets[group] = grouped[group];
  });
  return sortedGroupedTickets;
}

// Helper function to sort tickets based on the selected option
function sortTickets(tickets, sortOption) {
  if (sortOption === 'priority') {
    return tickets.sort((a, b) => b.priority - a.priority);
  } else if (sortOption === 'title') {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  }
  return tickets;
}

function KanbanBoard({ tickets, users, grouping, sortOption }) {
  const groupedTickets = groupTickets(tickets, grouping);
  const getIcon = (status) => {
    switch (status) {
      case 'Todo':
        return todoIcon;
      case 'Backlog':
        return backlogIcon;
      case 'In progress':
        return inProgressIcon;
      case '4':
        return urgentIcon;
      case '3':
        return highPriorityIcon;
      case '2':
        return mediumPriorityIcon;
      case '1':
        return lowPriorityIcon;
      case '1':
        return noPriorityIcon;
      case 'No group':
        return noPriorityIcon;
      default:
        console.log(status);
        return null; 
    }
  };


  // Function to get the group title and optionally user initials
  const getGroupTitle = (groupKey, ticketsInGroup) => {
    let groupTitleContent;
    if (grouping === 'userId') {
      const user = users.find(u => u.id === groupKey);
      const userInitials = user ? user.name.split(' ').map(n => n[0]).join('') : 'U';
      groupTitleContent = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {user?.dp ? (
            <img src={user.dp} alt={user.name} style={{ width: '30px', height: '30px', marginRight: '8px' }} />
          ) : (
            <span style={{ display: 'inline-block', width: '30px', height: '30px', borderRadius: '50%', background: '#ccc', textAlign: 'center', lineHeight: '30px' }}>
              {userInitials}
            </span>
          )}
          <span>{user ? user.name : 'Unknown User'}</span>
          <span style={{ marginLeft: '8px', fontWeight: 'normal', color: '#666' }}>{ticketsInGroup.length}</span>
        </div>
      );
    } else if (grouping === 'priority') {
      switch (parseInt(groupKey)) {
        case 0:
          groupTitleContent = <span>No priority</span>;
          break;
        case 1:
          groupTitleContent = <span>Low</span>;
          break;
        case 2:
          groupTitleContent = <span>Medium</span>;
          break;
        case 3:
          groupTitleContent = <span>High</span>;
          break;
        case 4:
          groupTitleContent = <span>Urgent</span>;
          break;
        default:
          groupTitleContent = <span>No priority</span>;
      }
      groupTitleContent = (
        <div>
          {groupTitleContent}
          <span style={{ marginLeft: '8px', fontWeight: 'normal', color: '#666' }}>{ticketsInGroup.length}</span>
        </div>
      );
    } else if (grouping === 'status') {
      groupTitleContent = (
        <div>
          <span>{groupKey}</span>
          <span style={{ marginLeft: '8px', fontWeight: 'normal', color: '#666' }}>{ticketsInGroup.length}</span>
        </div>
      );
    } else {
      groupTitleContent = <span>{groupKey} {ticketsInGroup.length}</span>;
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ flexGrow: 1 }}>{groupTitleContent}</div> {/* This will push the icons to the right */}
      </div>
    );
  };

  return (
    <div className="kanban-board">
  {Object.keys(groupedTickets).map((group, index) => (
    <div key={index} className="kanban-column">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
        {getIcon(group) !== null && (
          <img 
            src={getIcon(group)} 
            alt="Group Icon" 
            style={{ marginRight: '8px', width: '20px', height: '20px' }} 
          />
        )}
        <h3>{getGroupTitle(group, groupedTickets[group])}</h3>
        </div>
        <div style={{ display: 'flex' }}>
          <img src={addIcon} alt="Add" style={{ width: '20px', height: '20px', cursor: 'pointer', marginLeft: '8px' }} />
          <img src={dotsIcon} alt="More options" style={{ width: '20px', height: '20px', cursor: 'pointer', marginLeft: '8px' }} />
        </div>
      </div>
      {sortTickets(groupedTickets[group], sortOption).map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} users={users} grouping={grouping} />
      ))}
    </div>
  ))}
</div>

  );
}

export default KanbanBoard;
