import React from 'react';
import PropTypes from 'prop-types';
import Box from './Box';

function Row(props) {
  const { index, items, onclick } = props;

  return (
    <div className="row">
      {items.map((boxData, boxIndex) => (
        <Box
          key={boxIndex}
          boxData={boxData}
          boxClick={onclick}
          boxIndex={boxIndex}
          index={index}
        />
      ))}
    </div>
  );
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onclick: PropTypes.func.isRequired,
};

export default Row;
