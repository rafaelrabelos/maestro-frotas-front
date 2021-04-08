import React from "react";
import { withRouter } from "react-router";
import buildSideNav  from '../../shared/util/sidebar';
import "layout/admin/styles/sidebar.css";
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
    };
  }

  menuSubItemList() {
    const {basePath} = this.props;
    const subItens_Suporte = [
      {
        href: `${basePath}/pets`,
        faIco: "fa fa-user",
        name: "Usuarios",
        class: "nc",
        color: "#0c91a8",
        parentName: "Suporte",
      },
      {
        href: `${basePath}/pets-classes`,
        faIco: "fa fa-car",
        name: "Veiculos",
        class: "nc",
        color: "#0c91a8",
        parentName: "Suporte",
      },
      {
        href: `${basePath}/pets-racas`,
        faIco: "fa fa-handshake",
        name: "Reserva",
        class: "nc",
        color: "#0c91a8",
        parentName: "Suporte",
      },
    ];

    const subItens_Ajuste = [
      {
        href: `${basePath}/settings-geral`,
        faIco: "fa fa-cog",
        name: "Geral",
        class: "nc",
        parentName: "Ajustes",
      },
      {
        href: `${basePath}/settings-sistema`,
        faIco: "fa fa-wrench",
        name: "Sistema",
        class: "nc",
        parentName: "Ajustes",
      },
    ];

    return subItens_Suporte.concat(
      subItens_Ajuste
    );
  }

  menuItemList() {
    const {basePath} = this.props;
    const itens = [
      {
        href: basePath,
        faIco: "fa fa-home",
        name: "Home",
        class: "nc",
        group: true,
        subItens: null,
      },
      //in group
      {
        href: basePath,
        faIco: "fa fa-window-restore",
        name: "Suporte",
        class: "darkerlishadow",
        color: "#860ba5",
        group: true,
        subItens: [],
      },
      {
        href: basePath,
        faIco: "fa fa-rocket",
        name: "Ajustes",
        class: "darkerlishadowdown",
        group: true,
        subItens: [],
      },
      //ou of group
      {
        href: basePath,
        faIco: "fa fa-question-circle",
        name: "Ajuda",
        class: "nc",
        color: "#0c91a8",
        group: false,
        subItens: [],
      },
      {
        href: basePath,
        faIco: "fa fa-bug",
        name: "Bugs",
        class: "nc",
        color: "Tomato",
        group: false,
        subItens: [],
      },
      {
        href: basePath,
        faIco: "fa fa-blog",
        name: "Blog",
        class: "nc",
        color: "Orange",
        group: false,
        subItens: [],
      },
    ];

    return itens;
  }

  render() {
    const menuItemList = this.menuItemList();
    const menuSubItemList = this.menuSubItemList();
    return buildSideNav(menuItemList, menuSubItemList);
  }
}

export default withRouter(SideBar);
