import React from 'react';

const Alert = ({ type, message }) => {
  let alertClasses = 'px-4 py-2 rounded-md';

  // Apply different classes based on the type of alert
  if (type === 'success') {
    alertClasses += ' bg-green-500 text-white';
  } else if (type === 'error') {
    alertClasses += ' bg-red-500 text-white';
  } else if (type === 'warning') {
    alertClasses += ' bg-yellow-500 text-black';
  } else {
    alertClasses += ' bg-blue-500 text-white';
  }

  return (
    <div className={alertClasses}>
      {message}
    </div>
  );
};

export default Alert;
