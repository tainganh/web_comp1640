import React, { Component } from "react";
import { loginUser } from "../../actions/user_actions";
import { connect } from "react-redux";
import { Modal } from "antd";
import { withRouter } from "react-router-dom";
import { update, generateData, isFormValid } from "../../utils/formAction";
import FormField from "../../utils/formFieldsLogin";
import "./login.css";
import "antd/dist/antd.css";
export class login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  componentDidMount() {
    var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
    if (loginUser) {
      if (loginUser.status === true) {
        switch (loginUser.response.roles) {
          case 0:
            this.props.history.push("/admin/types");
            break;
          case 1:
            this.props.history.push("/admin/manager");
            break;
          case 2:
            this.props.history.push("/admin/coordinator");
            break;
          case 3:
            this.props.history.push("/admin/students");
            break;
          case 4:
            this.props.history.push("/admin/guest");
            break;
          default:
            break;
        }
      }
    }
  }
  countDown = () => {
    let secondsToGo = 2;
    const modal = Modal.success({
      title: "SUCCESSFULLY !!",
      content: `You will be redirected to the Dashboard after ${secondsToGo} second!`
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `You will be redirected to the Dashboard after ${secondsToGo} second!`
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };
  submitLogin = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formdata, "login");
    let formIsValid = isFormValid(this.state.formdata, "login");

    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(res => {
        if (res.payload.status === true) {
          localStorage.setItem("loginSuccess", JSON.stringify(res.payload));
          switch (res.payload.response.roles) {
            case 0:
              this.countDown();
              setTimeout(() => {
                this.props.history.push("/admin/types");
              }, 2000);
              break;
            case 1:
              this.countDown();
              setTimeout(() => {
                this.props.history.push("/admin/types");
              }, 2000);
              break;
            case 2:
              this.countDown();
              setTimeout(() => {
                this.props.history.push("/admin/types");
              }, 2000);
              break;
            case 3:
              this.countDown();
              setTimeout(() => {
                this.props.history.push("/admin/students");
              }, 2000);
              break;
            case 4:
              this.countDown();
              setTimeout(() => {
                this.props.history.push("/admin/types");
              }, 2000);
              break;
            default:
              break;
          }
        } else {
          this.setState({
            formError: true
          });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };
  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "login");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };
  render() {
    var { formdata, formError } = this.state;
    return (
      <div>
        <div className="limiter">
          <div
            className="container-login100"
            style={{ backgroundImage: `url('images/bg-01.jpg')` }}
          >
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
              <form
                className="login100-form validate-form"
                onSubmit={this.submitLogin}
              >
                <span className="login100-form-title p-b-49">Login</span>

                <FormField
                  id={"email"}
                  name="Username"
                  formdata={formdata.email}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={"password"}
                  name="Password"
                  formdata={formdata.password}
                  change={element => this.updateForm(element)} //element(id,event,blur) tu formfield truyen ra
                />
                {formError ? (
                  <div style={{ color: "red" }}>
                    Email or password is incorrect.
                  </div>
                ) : null}
                <div className="text-right p-t-8 p-b-31">
                  <a href="#" />
                </div>
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button
                      onClick={this.submitLogin}
                      className="login100-form-btn"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="dropDownSelect1" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(withRouter(login));
