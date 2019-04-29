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
  Icon
} from "antd";
import {
  deleteTopic,
  addTopic,
  editTopic,
  getTopics
} from "../actions/topic_actions";
import { connect } from "react-redux";
import moment from "moment";
class Topics extends React.Component {
  state = {
    loading: false,
    visible: false,
    edit: false,
    categories: [],
    id: ""
  };

  componentDidMount() {
    var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
    if (loginUser.status === true && loginUser.response.roles === 0) {
      this.props.history.push("/admin/topics");
    } else {
      this.props.history.push("/login");
    }
    this.props.dispatch(getTopics());
  }

  showModal = () => {
    this.props.form.setFields({ name: { value: "" } });
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
  findName = (topics, name) => {
    var result = -1;
    topics.forEach((topic, index) => {
      if (topic.name === name) {
        result = index;
      }
    });
    return result;
  };
  onEdit = id => {
    this.setState({ visible: true, edit: true, id });
    const { form, topics } = this.props;
    if (topics.topics) {
      topics.topics.forEach(item => {
        if (item.id === id) {
          form.setFields({
            name: { value: item.name },
            days: { value: item.days }
          });
        }
      });
    }
  };
  onconfirm = id => {
    this.props.dispatch(deleteTopic(id));
    setTimeout(() => {
      message.success("Delete Successfully");
    }, 180);
  };

  handleSubmit = e => {
    const { topics, dispatch, form } = this.props;
    const { edit, id } = this.state;
    e.preventDefault();

    form.validateFields((err, values) => {
      if (values.name !== "" && values.days >= 15) {
        this.setState({
          loading: true
        });
      }
      if (!err) {
        if (topics.topics) {
          if (edit) {
            dispatch(editTopic(id, values));
            setTimeout(() => {
              this.setState({ loading: false, visible: false, edit: false });
              dispatch(getTopics());
              message.success("Update Successfully");
              form.resetFields();
            }, 1000);
          } else {
            let index = this.findName(topics.topics, values.name);

            if (index === -1) {
              if (values.days >= 15) {
                dispatch(addTopic(values));
                setTimeout(() => {
                  this.setState({ loading: false });
                  dispatch(getTopics());
                  message.success("Add Successfully");
                  form.resetFields();
                }, 1000);
              } else {
                message.warning("Date must be grather 15");
              }
            } else {
              this.setState({ loading: false });
              message.error("The topic name already exists");
            }
          }
        }
      }
    });
  };

  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const columns = [
      {
        title: "Name",
        dataIndex: "Name",
        key: "Name"
      },
      {
        title: "Date Start",
        dataIndex: "DateStart",
        key: "DateStart"
      },
      {
        title: "Date End",
        dataIndex: "DateEnd",
        key: "DateEnd"
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
                title={`Are you sure delete this faculity ${record.Name}`}
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
    const dataSource = this.props.topics.topics
      ? this.props.topics.topics.map(item => {
          return {
            key: item.id,
            Name: item.name,
            DateEnd: moment(new Date(item.deadline)).format("LLLL"),
            DateStart: moment(new Date(item.createdTime)).format("LLLL")
          };
        })
      : null;
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <div className="content">
          <div style={{ overflow: "hidden" }}>
            <Button
              style={{ float: "right", marginBottom: 20 }}
              icon="plus-square"
              onClick={this.showModal}
            >
              Add New Topic
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
          title={this.state.edit ? "Edit Faculity" : "Add New Faculity"}
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
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "Please input name!" }]
              })(<Input placeholder="Name" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("days", {
                rules: [{ required: true, message: "Please input date!" }]
              })(<Input placeholder="Date" />)}
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    topics: state.topics
  };
};
const TopicsForm = Form.create()(Topics);
export default connect(mapStateToProps)(TopicsForm);
