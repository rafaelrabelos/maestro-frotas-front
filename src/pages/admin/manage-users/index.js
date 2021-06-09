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
    this.setState({users: users.data});
    console.log('newUserList');
  }

  async handleDeleteUser(userId) {
    const result = await UserService.Delete(userId);
    

    if(result.data.status === true){
      const { users } = this.state;
      const newUserList = users.filter(user => user.id !== userId);
      this.setState({users: newUserList}, () => alert('usuário deletado'));

    }else if(result.data.status === false && result.data.erros.length > 0){
      result.data.erros.forEach(erroMsg => {
        alert(erroMsg);
      });
    }
  }

  buildUsersList(){
    
    const { users } = this.state;

    return users.map( (user, idx) =>
        <div key={`${idx}-user`} className="card" style={{  margin: "1%" }}>
          <div className="card-body">
            
            <div className="row">
            <div className="col col-md-4">
              <h6 className="card-title">{user.nome} {user.sobrenome}</h6>
            </div>
            <div className="col col-md-2">
              <div className="badge badge-pill badge-info">{user.role_name} </div>
            </div>
            </div>
            <div className="row">
              <div className="col col-md-10">
                <p className="card-text">
                  <small>CPF: {user.cpf}</small><br />
                  <small>Email: {user.email}</small><br />
                  <small>Nasc.: {user.data_nascimento}</small>
                </p>
              </div>
              <div className="row">
                <div className="col col-md-4">
                  <button onClick={ () => this.handleDeleteUser(user.id)} className="btn btn-sm btn-danger">Excluir</button>
                </div>
              </div>
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
