import React from "react";
import { Table, Form, Spin, Icon } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { getActicalsGuest } from "../actions/guest_action";
class Guest extends React.Component {
  componentDidMount() {
    var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
    if (loginUser.status === true && loginUser.response.roles === 4) {
      this.props.history.push("/admin/guest");
    } else {
      this.props.history.push("/login");
    }
    this.props.dispatch(getActicalsGuest());
  }
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
      }
    ];

    const dataSource = this.props.guest
      ? this.props.guest.map(item => {
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

          <br />
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
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    guest: state.guest.articals
  };
};
const GuestForm = Form.create()(Guest);
export default connect(mapStateToProps)(GuestForm);
