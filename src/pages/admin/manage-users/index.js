import React from "react";
import { UserService } from "services";
import { PageHeader } from 'pages/shared'
import "./styles.css";

export default class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userList: ""
    };
  }

  async componentDidMount() {
    this.getUserList();
  }

  async getUserList() {
    const users = await UserService.Obtem();
    this.setState({users: [users.data]});
  }

  buildUsersList(){
    
    const { users } = this.state;
    console.log(users)

    return users.map( (user, idx) =>
        <div key={`${idx}-user`} className="card" style={{  margin: "1%" }}>
          <div className="card-body">
            <h5 className="card-title">{user.nome}</h5>
            <div className="row">
            
              <div className="col col-md-8">
                {user.nome} {user.sobrenome}
                <p className="card-text">
                  <small>ID: {user.id}</small><br />
                  <small>CPF: {user.cpf}</small><br />
                  <small>Email: {user.email}</small><br />
                  <small>Nasc.: {user.data_nascimento}</small>
                </p>
              </div>
              <div className="col col-md-2"><a href="/user" className="btn btn-sm btn-primary">Editar</a></div>
              <div className="col col-md-2"><a href="/user" className="btn btn-sm btn-primary">Excluir</a></div>
            </div>
          </div>
        </div>
    );
  }


  render() {
    return (
      <>
        <PageHeader />
        <div id="adm-pet-classes" className="col col-md-12 col-sm-12">
          { this.buildUsersList() }
          <br />
          <br />
        </div>
      </>
    );
  }
}
