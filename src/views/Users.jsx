import React from "react";
import {
  Button,
  Table,
  Divider,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Spin,
  Icon,
  Select
} from "antd";
import { connect } from "react-redux";
import {
  addUser,
  getUsers,
  editUser,
  deleteUser
} from "../actions/users_actions";
import { getFaculities } from "../actions/category_actions";

const Option = Select.Option;
class Users extends React.Component {
  state = {
    loading: false,
    visible: false,
    edit: false,
    categories: [],
    id: "",
    pictures: [],
    files: []
  };
  componentDidMount() {
    var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
    if (loginUser.status === true && loginUser.response.roles === 0) {
      this.props.history.push("/admin/users");
    } else {
      this.props.history.push("/login");
    }
    this.props.dispatch(getUsers());
    this.props.dispatch(getFaculities());
  }
  showModal = () => {
    this.props.form.setFields({
      email: { value: "" },
      password: { value: "" },
      fullName: { value: "" },
      phone: { value: "" },
      roles: { value: null },
      faculity: { value: null }
    });
    this.setState({
      visible: true
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      edit: false
    });
  };
  findName = (users, name) => {
    var result = -1;
    users.forEach((user, index) => {
      if (user.name === name) {
        result = index;
      }
    });
    return result;
  };
  onEdit = id => {
    this.setState({ visible: true, edit: true, id });

    const { form, users } = this.props;
    if (users.users) {
      users.users.forEach(item => {
        if (item.id === id) {
          form.setFields({
            email: { value: item.email },
            password: { value: item.password },
            fullName: { value: item.fullName },
            phone: { value: item.phone },
            roles: { value: item.roles },
            faculity: { value: item.faculity.id }
          });
        }
      });
    }
  };
  onconfirm = id => {
    this.props.dispatch(deleteUser(id));
    setTimeout(() => {
      message.success("Delete Successfully");
    }, 180);
  };

  handleSubmit = e => {
    const { users, dispatch, form } = this.props;
    const { edit, id } = this.state;
    e.preventDefault();

    form.validateFields((err, values) => {
      const data = {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        phone: values.phone,
        roles: values.roles,
        faculity: {
          id: values.faculity
        }
      };
      if (values.name !== "" && values.days >= 15) {
        this.setState({
          loading: true
        });
      }
      if (!err) {
        if (users.users) {
          if (edit) {
            dispatch(editUser(id, data));
            setTimeout(() => {
              this.setState({ loading: false, visible: false, edit: false });
              dispatch(getUsers());
              message.success("Update Successfully");
              form.resetFields();
            }, 1000);
          } else {
            let index = this.findName(users.users, values.email);

            if (index === -1) {
              dispatch(addUser(data));
              setTimeout(() => {
                this.setState({ loading: false });
                dispatch(getUsers());
                message.success("Add Successfully");
                form.resetFields();
              }, 1000);
            } else {
              this.setState({ loading: false });
              message.error("The email already exists");
            }
          }
        }
      }
    });
  };
  removeItems = name => {
    this.setState({
      files: this.state.files.filter(item => item.name !== name)
    });
  };
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const columns = [
      {
        title: "Email",
        dataIndex: "Email",
        key: "Email"
      },
      {
        title: "Full Name",
        dataIndex: "FullName",
        key: "FullName"
      },
      {
        title: "Phone",
        dataIndex: "Phone",
        key: "Phone"
      },
      {
        title: "Role",
        dataIndex: "Role",
        key: "Role"
      },
      {
        title: "Faculity",
        dataIndex: "Faculity",
        key: "Faculity"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          return (
            <span>
              <Button onClick={() => this.onEdit(record.key)}>Edit</Button>
              <Divider type="vertical" />
              <Popconfirm
                title={`Are you sure delete this user ${record.Name}`}
                onConfirm={() => this.onconfirm(record.key)}
                onCancel={this.cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
            </span>
          );
        }
      }
    ];
    const dataSource = this.props.users.users
      ? this.props.users.users.map(item => {
          return {
            key: item.id,
            Email: item.email,
            FullName: item.fullName,
            Phone: item.phone,
            Role: item.roles,
            Faculity: item.faculity ? item.faculity.id : null
          };
        })
      : null;
    const { getFieldDecorator } = this.props.form;
    const { category } = this.props;
    return (
      <>
        <div className="content">
          <div style={{ overflow: "hidden" }}>
            <Button
              style={{ float: "right", marginBottom: 20 }}
              icon="plus-square"
              onClick={this.showModal}
            >
              Add New User
            </Button>
          </div>
          {dataSource ? (
            <Table
              bordered
              style={{ background: "#e9ecef" }}
              dataSource={dataSource}
              columns={columns}
            />
          ) : (
            <Spin indicator={antIcon} />
          )}
        </div>
        <Modal
          title={this.state.edit ? "Edit User" : "Add New User"}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "Please input email!" }]
              })(<Input placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Please input password!" }]
              })(<Input placeholder="Password" type="password" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("fullName", {
                rules: [{ required: true, message: "Please input full name!" }]
              })(<Input placeholder="Full Name" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("phone", {
                rules: [{ required: true, message: "Please input phone!" }]
              })(<Input placeholder="Phone" type="number" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("roles", {
                rules: [{ required: true, message: "Please select a role!" }]
              })(
                <Select
                  showSearch
                  placeholder="Select a role"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={1}>Marketing Manager</Option>
                  <Option value={2}>Marketing Coordinator</Option>
                  <Option value={3}>Student</Option>
                  <Option value={4}>Guest</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("faculity", {
                rules: [
                  { required: true, message: "Please select a faculity!" }
                ]
              })(
                <Select
                  showSearch
                  placeholder="Select a faculity"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {category.types
                    ? category.types.map((item, i) => (
                        <Option key={i} value={item.id}>
                          {item.name}
                        </Option>
                      ))
                    : null}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    category: state.category,
    users: state.users
  };
};
const UsersForm = Form.create()(Users);
export default connect(mapStateToProps)(UsersForm);
