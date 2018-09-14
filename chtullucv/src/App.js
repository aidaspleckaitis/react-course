import React from 'react';
import 'reset-css';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      language: "en",
    };
  }

  onClick = language => {
    this.setState({ language });
  };

  render() {

    const { language } = this.state;

    return (
      <div className="App">
        <div className="App-container">
          <Header language={language} onClick={this.onClick} />
          <Main language={language} />
        </div>
        <Footer />
      </div>
    );
  }

}


export default App;
