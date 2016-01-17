Design = React.createClass({
  mixins: [],
  PropTypes: {

  },
  getInitialState() {
    return {
      errors: {}
    }
  },
  getMeteorData() {
    return { }
  },
  render(){
    return (
      <div className="game">
        <div className="container game-meta">
          <ul>
            <li>Tid: </li>
          </ul>
        </div>
        
        <div className="game-navigation-container">
          <div className="game-navigation">
            <ul>
              <li>Start</li>
              <li>Räntor</li>
              <li>Avgifter</li>
              <li>Marknad</li>
              <li>Toplista</li>
            </ul>
          </div>
        </div>
        <section> Main section </section>
      </div>
    )
  }
});

// <div className="user">
//   <span className="name">Anton Ledström</span>
//   <span className="email"> antonledstrom@msn.com </span>
//   <span className="game"> 1 <a href>game</a></span><span className="bank"> 1 <a href>bank</a></span>
// </div>
