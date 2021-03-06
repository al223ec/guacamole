FormInput = React.createClass({
    propTypes: {
        hasError: React.PropTypes.bool,
        label: React.PropTypes.string,
        type: React.PropTypes.string,
        name: React.PropTypes.string,
        value: React.PropTypes.string,
        step: React.PropTypes.string,
        onKeyUp: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },
    shouldComponentUpdate() {
        return true;
    },
    render() {
        const {type, label, name, value, onKeyUp, onBlur, step } = this.props;
        let inputType;

        var className = "form-group";
        if (this.props.hasError) {
            className += " has-error";
        }
        switch (type) {
            case "textarea":
                inputType = (
                  <textarea type={ type } className="form-control" name={ name.toLowerCase() } placeholder={ name } defaultValue={ value } onKeyUp={ onKeyUp } onBlur={ onBlur }></textarea>
                );
                break;
            default:
                inputType = (
                  <input type={ type } className="form-control" name={ name.toLowerCase() } placeholder={ name } defaultValue={ value } step={ step } onKeyUp={ onKeyUp } onBlur={ onBlur }/>
                );
                break;
        }
        return (
          <div className={ className }>
              { label === "none" ? "" : <label htmlFor={ name.toLowerCase() } className="control-label col-md-3 col-sm-3 col-xs-12">{ name }</label> }
              <div className="col-md-9 col-sm-9 col-xs-12">
              { inputType }
              </div>
          </div>
        )
    }
});
