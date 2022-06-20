import React, { Component } from "react";
import Dialog from "../home/dialog";

export default class CustomLinkCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogState: false,
    };
  }
  closeDialog = () => {
    // console.log('asd')
    this.setState({
      dialogState: false,
    });
  };
  openDialog = () => {
    this.setState({
      dialogState: true,
    });
  };
  render() {
    return (
      <div>
        <a onClick={this.openDialog}>{this.props.value}</a>
        <Dialog
          enable={this.state.dialogState}
          closeDialog={this.closeDialog}
        />
      </div>
    );
  }
}
