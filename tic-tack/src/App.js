import React from 'react';
import 'reset-css';
import './styles/index.css';

const WINNING_COMBOS = [
  // row combos
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],

  // columns combos
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],

  // diagonale
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

class App extends React.Component {

  constructor(props) {
    super(props);

    const initial = [...Array(3)].map(() => [...Array(3)]);

    this.state = {
      gameData: initial,
      turn: 0,
      players: { one: { winner: false, icon: "🤡" }, two: { winner: false, icon: "👺" } }
    }

  };

  isWinner = (newGameData, player) => {

    return WINNING_COMBOS.some(combo => combo.every(([row, box]) => newGameData[row][box] === player.icon));

  };

  onClick = ({ row, box }) => {

    const { gameData, turn, players } = this.state;

    const playerId = turn % 2 === 0 ? "one" : "two";

    const currentPlayer = players[playerId];

    if (!gameData[row][box]) {

      gameData[row][box] = currentPlayer.icon;
      this.setState({ gameData, turn: turn + 1 });
      console.log(this.isWinner(gameData, currentPlayer));

    }

    if (this.isWinner(gameData, currentPlayer)) {

      players[playerId].winner = true;
      this.setState({ players });

    }

  };

  findWinner = () => {

    const { players } = this.state;

    return Object.values(players).find(player => player.winner === true);

  };

  renderWinner = () => {

    const winner = this.findWinner();

    return (
      <div>
        <p>Winner is: {winner.icon}</p>
      </div>
    );

  }

  renderGame = () => {

    const { gameData } = this.state;

    return gameData.map((rowData, i) => (
      <div className="row" key={i}>
        {rowData.map((boxData, boxIndex) => (
          <div role="button" className="box" key={boxIndex} onClick={() => this.onClick({ row: i, box: boxIndex })}>
            {boxData}
          </div>
        ))
        }
      </div>
    ))

  };

  render() {

    const winner = this.findWinner();

    return winner ? this.renderWinner() : this.renderGame();

  }
}

export default App;
