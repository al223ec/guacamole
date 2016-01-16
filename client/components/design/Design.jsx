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
      <div className="design">
        <div className="user">
          <span className="name">Anton Ledström</span>
          <span className="email"> antonledstrom@msn.com </span>
          <span className="game"> 1 <a href>game</a></span><span className="bank"> 1 <a href>bank</a></span>
        </div>
      </div>
    )
  }
});
