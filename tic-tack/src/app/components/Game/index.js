import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

function Game(props) {
  const { data, onclick } = props;

  return data.map((rowData, i) => (
    <Row key={i} items={rowData} index={i} onclick={onclick} />
  ));
}

Game.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onclick: PropTypes.func.isRequired,
};

export default Game;
