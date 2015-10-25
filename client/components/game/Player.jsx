Player = React.createClass({
  propTypes: {
    player: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user(),
    }
  },
  render() {
    // let { currentUser } = this.data;
    return (
      <div className="player">
        <span className="text"> { this.props.player.profile.name }  </span>
      </div>
    );
  }
});
