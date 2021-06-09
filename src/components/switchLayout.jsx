import React from "react";
import { withRouter } from "react-router";
import { secureStorage } from 'websecure-local-storage'
import "./css/components.css";

class SwitchLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admLayout: false,
    };
  }

  componentDidMount() {
    this.setState({
      admLayout: this.props.match.path === "/admin",
    });
  }

  shwowSwitchLayout() {
    const userRights = secureStorage().getItem("usertype");
    return (userRights === "root" || userRights === "admin") === true || false;
  }

  switchButton(){
    const {admLayout} = this.state;
    return(
      <div className="row">
          <div className="col col-md-2">
          <span className="badge badge-pill badge-warning">{!admLayout ? "Adm" : "Usr"}</span>
            <a
              className={`btn btn-circle btn-sm btn-${!admLayout ? "" : "outline-"}secondary`}
              href={admLayout ? "/user" : "/admin"}
              id="layoutDropdown"
            >
              <i className="fas fa-desktop"></i>
            </a>
          </div>
        </div>
    );
  }

  render() {
    const isAdm = this.shwowSwitchLayout();
    const switchButton = this.switchButton();
    
    return (
      <>
      {isAdm && switchButton}
      </>
    );
  }
}

export default withRouter(SwitchLayout);
