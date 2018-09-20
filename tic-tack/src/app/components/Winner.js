import React from 'react';
import PropTypes from 'prop-types';

function Winner(props) {
  const { winner, onclick } = props;

  const message = winner ? `Winner is: ${winner.icon}` : 'Nobody won :(';

  return (
    <div>
      <p>{message}</p>
      <button type="button" onClick={onclick}>
        Reset
      </button>
    </div>
  );
}

Winner.propTypes = {
  winner: PropTypes.shape({}),
  onclick: PropTypes.func.isRequired,
};

Winner.defaultProps = {
  winner: undefined,
};

export default Winner;
