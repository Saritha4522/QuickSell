import React from 'react';
import todoIcon from '../assets/To-do.svg';          
import backlogIcon from '../assets/Backlog.svg';      
import inProgressIcon from '../assets/in-progress.svg';
import urgentIcon from '../assets/urgent.svg';          
import highPriorityIcon from '../assets/high-priority.svg'; 
import mediumPriorityIcon from '../assets/medium-priority.svg'; 
import lowPriorityIcon from '../assets/low-priority.svg'; 
import noPriorityIcon from '../assets/no-priority.svg'; 
import './Ticket.css'; 

function Ticket({ ticket, users, grouping }) {
  const user = users.find((u) => u.id === ticket.userId) || { name: 'Unknown User', dp: null }; 
  const userInitials = user.name.split(' ').map(n => n[0]).join('') || 'U'; 

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Todo':
        return todoIcon;
      case 'Backlog':
        return backlogIcon;
      case 'In progress':
        return inProgressIcon;
      default:
        return null; 
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return urgentIcon;
      case 3:
        return highPriorityIcon;
      case 2:
        return mediumPriorityIcon;
      case 1:
        return lowPriorityIcon;
      case 0:
        return noPriorityIcon;
      default:
        return null; 
    }
  };

  return (
    <div className="ticket">
      <span className="ticket-id">{ticket.id}</span>
      <br />
      <div className="ticket-header">
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {grouping !== 'status' && getStatusIcon(ticket.status) && (
            <img 
              src={getStatusIcon(ticket.status)} 
              alt={`${ticket.status} icon`} 
              style={{ marginRight: '8px', width: '20px', height: '20px' }} 
            />
          )}
          <h3>{ticket.title}</h3>
        </div>
        {grouping!=='userId'&& (
        <span className="profile-image">
          {grouping === 'userId' ? userInitials : (user.dp ? <img src={user.dp} alt={user.name} /> : userInitials)}
        </span>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {grouping !== 'priority' && getPriorityIcon(ticket.priority) && (
          <img 
            src={getPriorityIcon(ticket.priority)} 
            alt={`Priority level ${ticket.priority}`} 
            style={{ marginRight: '8px', width: '20px', height: '20px' }} 
          />
        )}
        <p className="ticket-tags">{ticket.tag.join(', ')}</p>
      </div>
    </div>
  );
}

export default Ticket;
