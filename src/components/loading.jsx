import React from "react";

export default class Loading extends React.Component {
  render() {
    return (
      <div
        className="spinner-border spinner-border-dm text-danger"
        role="status"
      ></div>
    );
  }
}
