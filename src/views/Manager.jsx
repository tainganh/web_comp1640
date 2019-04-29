import React from "react";
import { Button, Table, Form, Popconfirm, Spin, Icon, message } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import {
  getActicalsManager,
  updatePublish,
  zipFile
} from "../actions/manager_actions";
class Manager extends React.Component {
  state = {
    loading: false,
    visible: false,
    edit: false,
    categories: [],
    id: "",
    idArtical: "",
    comments: [],
    files: [],
    images: [],
    zipFile:""
  };

  componentDidMount() {
    var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
    if (loginUser.status === true && loginUser.response.roles === 1) {
      this.props.history.push("/admin/manager");
    } else {
      this.props.history.push("/login");
    }
    this.props.dispatch(getActicalsManager());
  }

  publish = id => {
    this.setState({ loading: true });
    this.props.dispatch(updatePublish(id)).then(res => {
      this.props.dispatch(getActicalsManager());
      if (res.payload.status) {
        this.setState({ loading: false });
        message.success("Update Successfully");
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
      fileImageInit.map((item, i) => {
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
  confirmZip = () =>{

  }
  zipFile = () => {
    let data = {
      list: this.state.files
    };
    this.props.dispatch(zipFile(data)).then(res => {
      
    });
  };
  render() {
    let newFiles = [];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        
        selectedRows.map(item => {
          // File
          if (item.File) {
            if (item.File.length) {
              item.File.map(item => {
                item.props.children.map(item => {
                  if (item.type === "a") {
                    newFiles.push(item.props.href);
                    this.setState({
                      files: newFiles
                    });
                  }
                });
              });
            } else {
              item.File.props.children.map(item => {
                if (item.type === "a") {
                  newFiles.push(item.props.href);
                  this.setState({
                    files: newFiles
                  });
                }
              });
            }
          }
          //Image
          if (item.Image) {
            if (item.Image.length) {
              item.Image.map(item => {
                item.props.children.map(item => {
                  if (item.type === "img") {
                    newFiles.push(item.props.src);
                    this.setState({
                      files: newFiles
                    });
                  }
                });
              });
            } else {
              newFiles.push(item.Image.props.src);
            }
          }
        });
      }
    };
    
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
        title: "Faculity",
        dataIndex: "Faculity",
        key: "Faculity"
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
              {record.Status === "Public" ? null : (
                <>
                  <Popconfirm
                    title={`Are you sure Public this artical ${record.Title}`}
                    onConfirm={() => this.publish(record.key)}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button loading={this.state.loading} type="primary">Public</Button>
                  </Popconfirm>
                </>
              )}
            </span>
          );
        }
      }
    ];

    const dataSource = this.props.manager
      ? this.props.manager.map(item => {
          return {
            key: item.id,
            Title: item.title,
            Faculity: item.userInfo.faculity.name,
            date: moment(new Date(item.createdTime)).format("LLLL"),
            File: this.handleWord(item.description),
            Image: this.handleImage(item.description),
            Status: item.status
          };
        })
      : [];
    return (
      <>
        <div className="content">
          <h4>List Articles</h4>
          <Popconfirm
            title={`Are you sure zip file`}
            onConfirm={this.confirmZip}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              disabled={this.state.files.length > 0 ? false : true}
              type="primary"
              onClick={this.zipFile}
            >
              Zip File
            </Button>
          </Popconfirm>
          <br />
          {dataSource ? (
            <Table
              bordered
              style={{ background: "#e9ecef" }}
              dataSource={dataSource}
              columns={columns}
              rowSelection={rowSelection}
            />
          ) : (
            <Spin indicator={antIcon} />
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    manager: state.manager.articals
  };
};
const ManagerForm = Form.create()(Manager);
export default connect(mapStateToProps)(ManagerForm);
