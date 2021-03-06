import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
class Fileupload extends Component {
  constructor() {
    super();
    this.state = {
      uploadedFiles: [],
      uploading: false
    };
  }
  componentDidMount() {
    const { images } = this.props;
    this.setState({ uploadedFiles: images });
  }
  onDrop = files => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);

    axios.post("http://158.106.137.107:7000/api/client/uploadimage", formData, config).then(response => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data]
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  };

  onRemove = id => {
    axios.get(`http://158.106.137.107:7000/api/client/removeimage?public_id=${id}`).then(response => {
      let images = this.state.uploadedFiles.filter(item => {
        return item.public_id !== id;
      });

      this.setState(
        {
          uploadedFiles: images
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };

  showUploadedImages = () =>
    this.state.uploadedFiles.map(item => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        {item.url.includes("png") ||
        item.url.includes("jpg") ||
        item.url.includes("jpeg") ||
        item.url.includes("gif") ? (
          <div
            className="wrap"
            style={{ background: `url(${item.url}) no-repeat` }}
          />
        ) : item.url.includes("pdf") ? (
          <img
            style={{ width: "82px", height: "90px", cursor: "pointer" }}
            src="/images/pdf.png"
            alt=""
          />
        ) : (
          <img
            style={{ width: "82px", height: "90px", cursor: "pointer" }}
            src="/images/microsoft_office_word-512.png"
            alt=""
          />
        )}
      </div>
    ));

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: []
      });
    }
    return null;
  }

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={e => this.onDrop(e)}
              multiple={false}
              className="dropzone_box"
            >
              {({ getRootProps, getInputProps, isDragActive }) => {
                return (
                  <div className="wrap">
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </div>
                );
              }}
            </Dropzone>

            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "29px"
                }}
              >
                <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default Fileupload;
