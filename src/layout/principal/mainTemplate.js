import React from "react";
import { Container, Row } from "reactstrap";
import { Switch, Redirect } from "react-router-dom";
//components
import Topo from "./components/topo";
import Rodape from "./components/rodape";
import SideBar from "./components/sidebar";
import BreadCrumb from "components/breadcrumb";
import routes, { getRoutes } from "routes.js";
import "./styles/layout.css";

class UserLayout extends React.Component {
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }

  render() {
    return (
      <>
        <Topo />
        <SideBar basePath="/user" />
        <div className="main-content">
        <BreadCrumb />
          {/* Page content */}

          {/* roteamento do layout */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>
                {getRoutes(routes, "/user")}
                <Redirect from="*" to="/user/home" />
              </Switch>
            </Row>
          </Container>
        </div>
        <Rodape />
      </>
    );
  }
}

export default UserLayout;
