MainLayout = React.createClass({
  render(){
    return (
      <div className="nav-mid">
        <div className="container body">
          <div className="main_container">
            { this.props.sideMenu }
            { this.props.header }

            <div className="right_col" role="main" style={{ minHeight: 734 + 'px' }}>
              { this.props.content }
              { this.props.footer }
            </div>
          </div>
        </div>
      </div>)
  }
});
