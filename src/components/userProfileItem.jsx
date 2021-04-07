import React from "react";
import { AuthService } from "services";
import { withRouter } from "react-router";
import SwitchLayout from "components/switchLayout";
import "./css/components.css";

class UserProfileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsLoged: AuthService.IsValideSession(),
    };
  }

  componentDidMount() {
    if (this.state.userIsLoged) {
      this.setState({
        userName: sessionStorage.getItem("nome"),
        userEmail: sessionStorage.getItem("email"),
      });
    } else {
      this.handleLogout();
    }
  }

  handleLogout = () =>
    AuthService.Logout().then(() => {
      this.props.history.push("/auth");
    });

  messagesButton() {
    return (
      <div className="row">
        <div className="col col-md-2">
          <span className="badge badge-pill badge-warning">2</span>
          <button
            className="btn btn-circle btn-sm btn-outline-primary"
            type="submit"
          >
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    );
  }

  dropDownMenuItems() {
    const { pathBase } = this.props;
    const menuItemsData = [
      { divider: true },
      {
        title: "Perfil",
        icon: "fa fa-user-circle",
        color: "Blue",
        href: `${pathBase}/profile`,
        onClick: "",
      },
      { divider: true },
      {
        title: "Sair",
        icon: "fa fa-sign-out-alt",
        color: "Tomato",
        href: `/user`,
        onClick: () => this.handleLogout(),
      },
    ];
    return menuItemsData.map((item) =>
      item.divider ? (
        <div className="dropdown-divider"></div>
      ) : (
        <a className="dropdown-item"
        href={item.href}
        onClick={item.onClick}
        >
          <div className="row">
            <div className="col col-md-2">
                <span style={{color: item.color }}>
                  <i className={item.icon}></i>
                </span>
            </div>
            <div className="col col-md-2">{item.title}</div>
          </div>
        </a>
      )
    );
  }

  render() {
    const randUserNum = 9;
    return (
      <>
        <a
          className="nav-link dropdown-toggle"
          href="/#"
          id="profileDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className="row">
            <div className="col col-md-12">
              <img
                alt="avatar"
                className="circle-img rounded-circle"
                src={`https://mdbootstrap.com/img/Photos/Avatars/img%20(${randUserNum}).jpg`}
                data-holder-rendered="true"
              />
              <span className="badge badge-danger">3</span>
            </div>
          </div>
          <small className="username">{this.state.userName}</small>
        </a>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="profileDropdown"
        >
          <div className="col col-md-12 user-description">
            <div className="row">
              <div className="col col-md-2">
                <SwitchLayout />
              </div>
              <div className="col col-md-2">{this.messagesButton()}</div>
            </div>
          </div>
          {this.dropDownMenuItems()}
        </div>
      </>
    );
  }
}

export default withRouter(UserProfileItem);
