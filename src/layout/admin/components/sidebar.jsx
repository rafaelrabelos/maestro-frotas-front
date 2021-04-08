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
    const subItens_Gerenciar = [
      {
        href: `${basePath}/gerenciar-usuarios`,
        faIco: "fa fa-user",
        name: "Usuários",
        class: "nc",
        parentName: "Gerenciar",
      },
      {
        href: `${basePath}/gerenciar-frota`,
        faIco: "fa fa-car",
        name: "Frota",
        class: "nc",
        parentName: "Gerenciar",
      },
      {
        href: `${basePath}/pets-racas`,
        faIco: "fa fa-truck",
        name: "Fornecedores",
        class: "nc",
        parentName: "Gerenciar",
      },
    ];

    const subItens_Relatorios = [
      {
        href: `${basePath}/users`,
        faIco: "fa fa-handshake",
        name: "Adesão/Locação",
        class: "nc",
        color: "#833f94",
        parentName: "Relatórios",
      },
    ];

    const subItens_Colaboradores = [
      {
        href: `${basePath}/vacinas`,
        faIco: "fa fa-pills",
        name: "Beneficios",
        class: "nc",
        parentName: "Colaboradores",
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

    return subItens_Gerenciar.concat(
      subItens_Relatorios.concat(subItens_Colaboradores.concat(subItens_Ajuste))
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
        faIco: "fa fa-cog",
        name: "Gerenciar",
        class: "darkerlishadow",
        color: "#0c91a8",
        group: true,
        subItens: [],
      },
      {
        href: basePath,
        faIco: "fa fa-database",
        name: "Relatórios",
        class: "darkerli",
        color: "#0c91a8",
        group: true,
        subItens: [],
      },
      {
        href: basePath,
        faIco: "fa fa-address-card",
        name: "Colaboradores",
        class: "darkerli",
        color: "#0c91a8",
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
