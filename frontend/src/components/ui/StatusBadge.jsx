import React from 'react'

const StatusBadge = ({status}) => {

    let statusText = '';
    let statusClass = '';


    switch(status){
        case 1:
            statusText = 'Pending';
            statusClass = 'badge bg-warning text-dark';
            break;
        case 2:
            statusText = 'Confirmed';
            statusClass = 'badge bg-success';
            break;
        case 3:
            statusText = 'Cancelled';
            statusClass = 'badge bg-danger';
            break;
        default:
            statusText = 'unknown';
            statusClass = 'badge bg-secondary';
    }







  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass}`}
  >
      {statusText}
    </span>
  )
}

export default StatusBadge