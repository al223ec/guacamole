MainLayout = React.createClass({
  render(){
    return (
      <div>
        <div className="container">
          { this.props.header }
        </div>

        { this.props.content }
        { this.props.footer }
      </div>
    )
  }
});
