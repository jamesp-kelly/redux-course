import React from 'react';
import FilterLink from './FilterLink';
import ClearButton from './ClearButton';

const Footer = () => {
  return (
    <p>
      <FilterLink 
        filter="SHOW_ALL"
      >
        All
      </FilterLink>
      {' '}
      <FilterLink 
        filter="SHOW_COMPLETED"
      >
        Completed
      </FilterLink>
      {' '}
      <FilterLink 
        filter="SHOW_ACTIVE"
      >
        Active
      </FilterLink>
      {' '}
      <ClearButton />
    </p>
  )
};

export default Footer;