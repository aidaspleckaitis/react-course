import React from 'react';
import PropTypes from 'prop-types';

function Box(props) {
  const { boxData, boxClick, index, boxIndex } = props;

  return (
    <div
      role="button"
      className="box"
      key={boxIndex}
      onClick={() => boxClick({ row: index, box: boxIndex })}
    >
      {boxData}
    </div>
  );
}

Box.propTypes = {
  boxData: PropTypes.string,
  boxClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  boxIndex: PropTypes.number.isRequired,
};

Box.defaultProps = {
  boxData: undefined,
};

export default Box;
