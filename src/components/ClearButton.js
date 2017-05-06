import React from 'react';
import { connect } from 'react-redux';
import { clickClear } from '../action-creators';

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(clickClear());
    }
  };
}

let ClearButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>Clear</button>
  );
}

ClearButton = connect(mapStateToProps, mapDispatchToProps)(ClearButton);

export default ClearButton;