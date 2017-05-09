import React from 'react';
import FilterLink from './FilterLink';
import ClearButton from './ClearButton';

const Footer = () => {
  return (
    <p>
      <FilterLink 
        filter="all"
      >
        All
      </FilterLink>
      {' '}
      <FilterLink 
        filter="completed"
      >
        Completed
      </FilterLink>
      {' '}
      <FilterLink 
        filter="active"
      >
        Active
      </FilterLink>
      {' '}
      <ClearButton />
    </p>
  )
};

export default Footer;