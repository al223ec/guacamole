MainLayout = React.createClass({
  // propTypes: {},
  // mixins: [
  //   //ReactMeteorData
  // ],
  // getInitialState(){
  //   return null;
  // },
  // getMeteorData(){
  //
  // },
  render(){
    return (
      <div className="main-container">
        { this.props.header }

        <section className="page-content">
          { this.props.content }
        </section>

        { this.props.footer }
      </div>
    )
  }
});
