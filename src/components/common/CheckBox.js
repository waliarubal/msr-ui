import React from "react";

export class CheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.isChecked,
    };
    this._onChecked = this._onChecked.bind(this);
  }

  _onChecked() {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    this.props.CheckChanged(this.state.isChecked);
  }

  render() {
    return (
      <React.Fragment>
        <div class="button r" id="button-1">
          <input
            type="checkbox"
            class="checkbox"
            checked={this.state.isChecked}
            onChange={this._onChecked}
          />
          <div class="knobs"></div>
          <div class="layer"></div>
        </div>
      </React.Fragment>
    );
  }
}
