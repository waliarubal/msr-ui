import React from "react";

export class CheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.isChecked || false,
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
        <div
          className={
            this.state.isChecked ? "on-off-switch yes" : "on-off-switch"
          }
        >
          <input
            type="checkbox"
            class="checkbox"
            checked={this.state.isChecked}
            onChange={this._onChecked}
          />
          <div class="handle"></div>
        </div>
      </React.Fragment>
    );
  }
}
