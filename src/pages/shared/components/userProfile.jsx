import React from "react";
import { withRouter } from "react-router";
import { UserService } from "services";

class UserProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {},
      nome: "",
      sobrenome: "",
      email: "",
      editingProfile: false,
    };
  }

  async componentWillMount() {
    await this.getAndSetSelfUser();
  }

  async handleUserUpdateClick() {
    const res = await UserService.Update({ ...this.state });

    if (res.data.status) {
      this.setState({ editingProfile: false }, () => this.getAndSetSelfUser());
    } else {
      alert("Erro ao salvar, tente novamente.");
    }
  }

  async getAndSetSelfUser() {
    await UserService.GetSelf()
      .then((res) => {
        if (res.data.status === false) {
          this.showErrors(res);
        } else {
          this.setState({ userProfile: res.data, ...res.data });
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.showErrors(err.response);
        }
        console.log(err);
        console.log(err.response);
      });
  }

  userPermissionsComponent() {
    const { userProfile } = this.state;
    const permissions = [
      { name: "user", status: userProfile.is_user === 1 },
      { name: "sys", status: userProfile.is_sys === 1 },
      { name: "adm", status: userProfile.is_adm === 1 },
      { name: "root", status: userProfile.is_root === 1 },
    ];

    return (
      <div className="row">
        {permissions
          .filter((x) => x.status)
          .map((x, idx) => {
            return (
              <div key={idx + "_profile"} className="col-sm-4 col-md-2">
                <h5>
                  <span
                    className={`badge badge-pill ${
                      x.name === "user" ? "badge-info" : "badge-warning"
                    }`}
                  >
                    {x.name}
                  </span>
                </h5>
              </div>
            );
          })}
      </div>
    );
  }

  userEditProfileFormComponent() {
    const { editingProfile, nome, sobrenome, email } = this.state;

    return (
      <div className="row" style={{ display: editingProfile ? "" : "none" }}>
        <div className="container form-inline">
          <div className="col col-md-12 col-sm-12">
            <div className="form-group">
              <input
                value={nome}
                onChange={(e) => {
                  this.setState({ nome: e.target.value });
                }}
                type="text"
                className="form-control"
                id="profilename"
                placeholder="Nome"
              />
              <br />
            </div>
            <div className="form-group">
              <input
                value={sobrenome}
                onChange={(e) => {
                  this.setState({ sobrenome: e.target.value });
                }}
                type="text"
                className="form-control"
                id="profilesurname"
                placeholder="Sobrenome"
              />
              <br />
            </div>
            <br />
            <div className="form-group">
              <input
                value={email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>

            <br />
            <div className="col col-md-6 col-sm-6">
              <button
                onClick={(e) => this.handleUserUpdateClick(e)}
                className="btn btn-sm btn-success"
              >
                <i className="fa fa-save" style={{ paddingRight: "10px" }}></i>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { editingProfile, userProfile } = this.state;
    const { nome, sobrenome, email, criado_em, data_nascimento } = userProfile;
    const memberSince = new Date(criado_em);
    const memberAge = Math.abs(
      new Date(Date.now() - new Date(data_nascimento).getTime()).getFullYear() -
        1970
    );

    return (
      <>
        <div className="card" style={{ width: "100%" }}>
          <div className="card-header">
            <div className="row">
              <div className="col col-md-4">
                <img
                  alt="avatar"
                  className="circle-img rounded-circle"
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
                  data-holder-rendered="true"
                />
              </div>
              <div className="col col-md-12"></div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <b>{nome}</b>
            </h5>
            <p className="card-text">
              {nome} {sobrenome}({email})
            </p>
            <p className="card-text">
              {nome} é membro desde {memberSince.toLocaleDateString("pt")}, e
              tem {memberAge} anos.
            </p>
            {this.userPermissionsComponent()}
            <br />
            <div>{this.userEditProfileFormComponent()}</div>
            <br />
            <button
              onClick={() => this.setState({ editingProfile: !editingProfile })}
              className={`btn btn-sm ${
                !editingProfile ? " btn-success" : "btn-warning"
              }`}
            >
              <i
                className={`fa ${!editingProfile ? "fa-user-edit" : "fa-ban"}`}
                style={{ paddingRight: "10px" }}
              ></i>
              {!editingProfile ? "Alterar meus dados" : "Cancelar edição"}
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(UserProfileComponent);
