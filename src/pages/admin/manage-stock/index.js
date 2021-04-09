import React from "react";
import { PetService } from "services";
import { AdminPetClassesComponent } from "pages/shared";
import { PageHeader } from 'pages/shared'
import "./styles.css";

export default class ManageStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoCloseClasses:
        localStorage.getItem("autoCloseClasses") === "true" ? true : false,
      petClasses: [],
    };
  }

  PetService;

  toggleAutoClose() {
    let { autoCloseClasses } = this.state;
    this.setState({ autoCloseClasses: !autoCloseClasses }, () =>
      localStorage.setItem("autoCloseClasses", (!autoCloseClasses).toString())
    );
  }
  async componentDidMount() {
    this.getPetClasses();
  }

  async getPetClasses() {
    await PetService.ObtemPetClasses()
      .then((res) => {
        if (res.data.status === false) {
          this.showErrors(res);
        } else {
          this.setState({ petClasses: res.data });
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

  render() {
    let { autoCloseClasses } = this.state;

    return (
      <>
        <PageHeader />
        <div id="adm-pet-classes" className="col col-md-12 col-sm-12">
          {this.state.petClasses.map((x, idx) => {
            return (
              <AdminPetClassesComponent
                key={`adm-pet-class-${idx}`}
                data_parent="adm-pet-classes"
                subkey={idx}
                nome={x.nome}
                descricao={x.descricao}
                wiki_link={x.wiki_link}
                criadoPor={x.criadoPor}
                criadoEm={x.criadoEm}
                expanded={idx === 0}
                autoClose={autoCloseClasses}
              />
            );
          })}
          <br />
          <br />
        </div>
      </>
    );
  }
}
