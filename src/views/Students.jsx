import React from "react";
import {
  Button,
  Table,
  message,
  Spin,
  Icon,
  Select,
  Form,
  Modal,
  Input,
  Checkbox
} from "antd";
import FileUpload from "../utils/fileupload";
import { connect } from "react-redux";
import request from "superagent";
import { getArticals, addArticals } from "../actions/student_actions";
import { getTopics } from "../actions/topic_actions";
import { comments, addComments } from "../actions/coordinator_actions";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";

const Option = Select.Option;
class Students extends React.Component {
  state = {
    loading: false,
    loadingComment: false,
    visible: false,
    edit: false,
    categories: [],
    id: "",
    pictures: [],
    files: [],
    articals: [],
    filesword: [],
    images: [],
    idArtical: "",
    comments: [],
    checked: false
  };

  componentDidMount() {
    var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
    if (loginUser.status === true && loginUser.response.roles === 3) {
      this.props.history.push("/admin/students");
    } else {
      this.props.history.push("/login");
    }
    this.props.dispatch(getArticals());
    this.props.dispatch(getTopics());
  }
  onDrop = files => {
    const req = request.post("https://httpbin.org/post");
    this.setState({
      files: this.state.files.concat(files)
    });
    files.forEach(file => {
      req.attach(file.name, file);
    });
    req.end();
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
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
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
  handleSubmitComment = e => {
    const { form } = this.props;
    e.preventDefault();
    var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
    this.props.form.setFields({
      title: { value: " " },
      topic: { value: " " }
    });
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
          loadingComment: true
        });
      }
      if (!err) {
        this.props.dispatch(addComments(data)).then(res => {
          if (res.payload.status) {
            this.setState({ loadingComment: false });
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
  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    const url = [];
    var newUrl = "";
    this.state.files.map(file => {
      url.push(file.url);
    });
    newUrl = url.join(",");
    form.validateFields((err, values) => {
      const data = {
        title: values.title,
        description: newUrl,
        topic: { id: values.topic },
        userInfo: {
          id: "1"
        }
      };
      if (
        values.title !== undefined &&
        values.topic !== undefined &&
        this.state.checked
      ) {
        this.setState({
          loading: true
        });
      }

      if (!err && this.state.checked) {
        dispatch(addArticals(data)).then(res => {
          if (res.payload.status) {
            this.setState({ checked: false, images: [] });
          }
        });
        setTimeout(() => {
          this.props.dispatch(getArticals());
          this.setState({ loading: false });
          message.success("Add Successfully");
          form.resetFields();
        }, 1000);
      }
      if (this.state.checked === false) {
        message.warning(
          "You must agree to the terms before submitting the article!"
        );
      }
    });
  };
  handleWord = (url, title) => {
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
  imagesHandler = files => {
    this.setState({ files });
  };
  removeItems = name => {
    this.setState({
      files: this.state.files.filter(item => item.name !== name)
    });
  };
  onChange = e => {
    this.setState({ checked: e.target.checked });
  };
  render() {
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
              <Button onClick={() => this.comment(record.key)}>Comment</Button>
            </span>
          );
        }
      }
    ];
    const dataSource = this.props.articals
      ? this.props.articals.map(item => {
          return {
            key: item.id,
            Title: item.title,
            date: moment(new Date(item.createdTime)).format("LLLL"),
            File: this.handleWord(item.description, item.title),
            Image: this.handleImage(item.description),
            Status: item.status
          };
        })
      : [];
    const { getFieldDecorator } = this.props.form;
    const { topics } = this.props;
    const { resetImages } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
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
    return (
      <>
        <div className="content">
          <h2 style={{ textAlign: "center" }}>Upload articals</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FileUpload
              imagesHandler={images => this.imagesHandler(images)}
              reset={resetImages}
              images={this.state.images}
            />
            <br />
            <Form.Item>
              {getFieldDecorator("title", {
                rules: [{ required: true }]
              })(<Input style={{ width: "80%" }} placeholder="Title" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("topic", {
                rules: [{ required: true, message: "Please select a topic!" }]
              })(
                <Select
                  showSearch
                  placeholder="Select a topic"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: "80%" }}
                >
                  {topics.topics
                    ? topics.topics.map((item, i) => (
                        <Option key={i} value={item.id}>
                          {item.name}
                        </Option>
                      ))
                    : null}
                </Select>
              )}
            </Form.Item>
            <Checkbox
              checked={this.state.checked}
              style={{ width: "80%" }}
              onChange={this.onChange}
            >
              I confirm that what I am about to upload is my own work and that
              it has not, in whole or part, been presented elsewhere for
              assessment. In addition, I confirm that All material which has
              been copied has been clearly identified as such by being placed
              inside quotation marks and a full reference to the source has been
              provided Any material which has been referred to or adapted has
              been clearly identified and a full reference to the source has
              been provided Any work not in quotation marks is in my own words I
              have not shared my work with any other student I have not taken
              work from any other student I have not paid anyone to do my work
              or employed the services of an essay or code writing agency Where
              material has been used from other sources it has been properly
              acknowledged in accordance with the University's Regulations
              regarding Cheating and Plagiarism.
            </Checkbox>
            <br />
            <br />
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Form>
          <br />
          {this.props.articals ? (
            <Table
              bordered
              style={{ background: "#e9ecef" }}
              dataSource={dataSource}
              columns={columns}
            />
          ) : (
            <Spin indicator={antIcon} />
          )}
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
                loading={this.state.loadingComment}
                onClick={this.handleSubmitComment}
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
            <Form onSubmit={this.handleSubmitComment} className="login-form">
              <Form.Item>
                {getFieldDecorator("comment", {
                  rules: [{ required: false, message: "Please input comment!" }]
                })(<TextArea placeholder="Comments here ...." />)}
              </Form.Item>
              <Form.Item />
            </Form>
          </Modal>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    articals: state.student.articals,
    topics: state.topics
  };
};
const StudentForm = Form.create()(Students);
export default connect(mapStateToProps)(StudentForm);
