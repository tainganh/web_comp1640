import React from "react";
import {
  Button,
  Table,
  Divider,
  Modal,
  Form,
  Popconfirm,
  Spin,
  Icon,
  message
} from "antd";

import { connect } from "react-redux";
import {
  getActicalsCor,
  updateAcept,
  updateReject,
  comments,
  addComments
} from "../actions/coordinator_actions";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
class Coordinator extends React.Component {
  state = {
    loading: false,
    visible: false,
    edit: false,
    categories: [],
    id: "",
    idArtical: "",
    comments: []
  };

  componentDidMount() {
    var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
    if (loginUser.status === true && loginUser.response.roles === 2) {
      this.props.history.push("/admin/coordinator");
    } else {
      this.props.history.push("/login");
    }
    this.props.dispatch(getActicalsCor());
  }

  comment = id => {
    this.props.dispatch(comments(id)).then(res => {
      this.setState({ comments: res.payload.response });
    });
    this.props.form.setFields({ comment: { value: "" } });
    this.setState({
      visible: true,
      idArtical: id
    });
  };
  acepted = id => {
    this.props.dispatch(updateAcept(id)).then(res => {
      this.props.dispatch(getActicalsCor());
      if (res.payload.status) {
        message.success("Update Successfully");
      }
    });
  };
  reject = id => {
    this.props.dispatch(updateReject(id)).then(res => {
      this.props.dispatch(getActicalsCor());
      if (res.payload.status) {
        message.success("Update Successfully");
      }
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
      edit: false
    });
  };
  findName = (categories, name) => {
    var result = -1;
    categories.forEach((category, index) => {
      if (category.name === name) {
        result = index;
      }
    });
    return result;
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
    form.validateFields((err, values) => {
      let data = {
        comment: values.comment,
        actical: {
          id: this.state.idArtical
        },
        userInfo: {
          id: loginUser.response.id
        }
      };
      if (values.comment !== "") {
        this.setState({
          loading: true
        });
      }
      if (!err) {
        this.props.dispatch(addComments(data)).then(res => {
          console.log(res);

          if (res.payload.status) {
            this.setState({ loading: false });
            this.props
              .dispatch(comments(this.state.idArtical))
              .then(res => this.setState({ comments: res.payload.response }));
            message.success("Add Comment Successfully");
            form.resetFields();
          }
        });
      }
    });
  };
  handleWord = url => {
    let fileWordInit = [];
    let filesWord = url.includes(",") ? url.split(",") : [];
    filesWord.map(item => {
      if (
        item.includes("pdf") ||
        (item.includes("png") ||
          item.includes("jpg") ||
          item.includes("jpeg") ||
          item.includes("gif")) === false
      ) {
        fileWordInit.push(item);
      }
    });
    return url.includes(",") ? (
      fileWordInit.map((item, i) => {
        return item.includes("pdf") ? (
          <>
            <img
              key={i}
              src="/images/pdf.png"
              style={{ width: "20px", height: "20px" }}
              alt=""
            />
            &nbsp;
            <a href={item}>PDF</a>
            <br />
          </>
        ) : (
          <>
            <img
              key={i}
              src="/images/word-icon.ico"
              style={{ width: "20px", height: "20px" }}
              alt=""
            />
            &nbsp;
            <a href={item}>WORD</a>
            <br />
          </>
        );
      })
    ) : (url.includes("png") ||
        url.includes("jpg") ||
        url.includes("jpeg") ||
        url.includes("gif")) === false ? (
      url.includes("pdf") ? (
        <>
          <img
            src="/images/pdf.png"
            style={{ width: "20px", height: "20px" }}
            alt=""
          />
          &nbsp;
          <a href={url}>PDF</a>
        </>
      ) : (
        <>
          <img
            src="/images/word-icon.ico"
            style={{ width: "20px", height: "20px" }}
            alt=""
          />
          &nbsp;
          <a href={url}>WORD</a>
        </>
      )
    ) : (
      ""
    );
  };
  handleImage = url => {
    let fileImageInit = [];
    let filesImage = url.includes(",") ? url.split(",") : [];
    filesImage.map(item => {
      if (
        item.includes("png") ||
        item.includes("jpg") ||
        item.includes("jpeg") ||
        item.includes("gif")
      ) {
        fileImageInit.push(item);
      }
    });
    return url.includes(",") ? (
      filesImage.map((item, i) => {
        return (
          <>
            <img
              style={{ width: "60px", height: "60px" }}
              key={i}
              src={item}
              alt=""
            />{" "}
            &nbsp;{" "}
          </>
        );
      })
    ) : url.includes("png") ||
      url.includes("jpg") ||
      url.includes("jpeg") ||
      url.includes("gif") ? (
      <img style={{ width: "60px", height: "60px" }} src={url} alt="" />
    ) : (
      ""
    );
  };
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    const columns = [
      {
        title: "Title",
        dataIndex: "Title",
        key: "Title"
      },
      {
        title: "Created Time",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "File",
        dataIndex: "File",
        key: "File"
      },
      {
        title: "Image",
        dataIndex: "Image",
        key: "Image"
      },
      {
        title: "Status",
        dataIndex: "Status",
        key: "Status"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          return (
            <span>
              <Button type="dashed" onClick={() => this.comment(record.key)}>
                Comment
              </Button>
              <Divider type="vertical" />
              {record.Status === "Accepted" ||
              record.Status === "Rejected" ? null : (
                <>
                  <Popconfirm
                    title={`Are you sure acept this artical`}
                    onConfirm={() => this.acepted(record.key)}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary">Acepted</Button>
                  </Popconfirm>

                  <Divider type="vertical" />
                  <Popconfirm
                    title={`Are you sure update this artical`}
                    onConfirm={() => this.reject(record.key)}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="danger">Rejected</Button>
                  </Popconfirm>
                </>
              )}
            </span>
          );
        }
      }
    ];
    const dataSource = this.props.coordinator
      ? this.props.coordinator.map(item => {
          return {
            key: item.id,
            Title: item.title,
            date: moment(new Date(item.createdTime)).format("LLLL"),
            File: this.handleWord(item.description),
            Image: this.handleImage(item.description),
            Status: item.status
          };
        })
      : [];
    const columnsComment = [
      {
        title: "Username",
        dataIndex: "Username",
        key: "Username"
      },
      {
        title: "Created Time",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Roles",
        dataIndex: "Roles",
        key: "Roles"
      },
      {
        title: "Comment",
        dataIndex: "Comment",
        key: "Comment"
      }
    ];
    const dataSourceComment = this.state.comments
      ? this.state.comments.map(item => {
          return {
            key: item.id,
            Username: item.userInfo.fullName,
            date: moment(new Date(item.createdTime)).format("LLLL"),
            Roles:
              item.userInfo.roles === 2 ? "Marketing Coordinator" : "Student",
            Comment: item.comment
          };
        })
      : [];
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <div className="content">
          <h4>List Articles</h4>
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
          title="Add Comment"
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
          {this.state.comments ? (
            <Table
              bordered
              style={{
                background: "#e9ecef",
                maxHeight: "30em",
                overflowY: "auto"
              }}
              dataSource={dataSourceComment}
              columns={columnsComment}
            />
          ) : (
            <Spin indicator={antIcon} />
          )}
          <br />
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("comment", {
                rules: [{ required: true, message: "Please input comment!" }]
              })(<TextArea placeholder="Comments here ...." />)}
            </Form.Item>
            <Form.Item />
          </Form>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    coordinator: state.coordinator.articals
  };
};
const CoordinatorForm = Form.create()(Coordinator);
export default connect(mapStateToProps)(CoordinatorForm);
