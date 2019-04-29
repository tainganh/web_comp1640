import React from "react";
// nodejs library that concatenates classes
// react plugin used to create charts
import { Line, Bar,Pie } from "react-chartjs-2";
import { connect } from "react-redux";

import { report } from "../actions/report_actions";
// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
// core components

import {
  chartExample1,
  chartExample2,
  chartExample4
} from "variables/charts.jsx";
import { Form, Select } from "antd";
const Option = Select.Option;
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataReport: [],
      bigChartData: "data1",
      dataReportContributions: [],
      label: [],
      dataReportContributor: []
    };
  }
  componentDidMount() {
    var loginUser = JSON.parse(localStorage.getItem("loginSuccess"));
    if (loginUser.status === true && loginUser.response.roles === 0) {
      this.props.history.push("/admin/dashboard");
    } else {
      this.props.history.push("/login");
    }
    this.props
      .dispatch(report())
      .then(res => this.setState({ dataReport: res.payload.response }));
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  handleContri = value => {
    let newDataContri = [];
    let newLableContri = [];
    if (this.state.dataReport) {
      this.state.dataReport.map(item => {
        if (item.name === value) {
          item.list.map(item => {
            newLableContri.push(item.name);
            newDataContri.push(item.contributions);
            this.setState({
              label: newLableContri,
              dataReportContributions: newDataContri
            });
          });
        }
      });
    }
  };
  handleContributor = value => {
    let newDataContributor = [];
    let newLableContributor = [];
    if (this.state.dataReport) {
      this.state.dataReport.map(item => {
        if (item.name === value) {
          item.list.map(item => {
            newLableContributor.push(item.name);
            newDataContributor.push(item.contributors);
            this.setState({
              label: newLableContributor,
              dataReportContributor: newDataContributor
            });
          });
        }
      });
    }
  };
  render() {
    let chartContri = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

        return {
          labels: this.state.label,
          datasets: [
            {
              label: "Contributions",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.state.dataReportContributions
            }
          ]
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
              }
            }
          ]
        }
      }
    };
    // let chartContributor = {
    //   data: canvas => {
    //     let ctx = canvas.getContext("2d");

    //     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    //     gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    //     gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    //     gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    //     return {
    //       labels: [],
    //       datasets: [
    //         {
    //           label: "Contributions",
    //           fill: true,
    //           backgroundColor: gradientStroke,
    //           borderColor: "#1f8ef1",
    //           borderWidth: 2,
    //           borderDash: [],
    //           borderDashOffset: 0.0,
    //           pointBackgroundColor: "#1f8ef1",
    //           pointBorderColor: "rgba(255,255,255,0)",
    //           pointHoverBackgroundColor: "#1f8ef1",
    //           pointBorderWidth: 20,
    //           pointHoverRadius: 4,
    //           pointHoverBorderWidth: 15,
    //           pointRadius: 4,
    //           data: []
    //         }
    //       ]
    //     };
    //   }
    // };
    let chartContributor = {
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: this.state.label,
          datasets: [
            {
              label: "Contributions",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.state.dataReportContributor
            }
          ]
        };
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5
                        className="card-category"
                        style={{ fontSize: "15px" }}
                      >
                        <h5
                          className="card-category"
                          style={{ fontSize: "15px" }}
                        >
                          Report on the total number of submit files contributed
                          per faculty
                        </h5>

                        <Form.Item>
                          {getFieldDecorator("contri", {
                            rules: [
                              {
                                required: true,
                                message: "Please select a role!"
                              }
                            ]
                          })(
                            <Select
                              style={{ width: "50em" }}
                              showSearch
                              placeholder="Select a topic"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={this.handleContri}
                            >
                              {this.state.dataReport
                                ? this.state.dataReport.map((item, i) => (
                                    <Option key={i} value={item.name}>
                                      {item.name}
                                    </Option>
                                  ))
                                : null}
                            </Select>
                          )}
                        </Form.Item>
                      </h5>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartContri.data}
                      options={chartContri.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category" style={{ fontSize: "15px" }}>
                    report of the total number of contributors contributing to
                    each faculty
                  </h5>
                </CardHeader>
                <Form.Item>
                  {getFieldDecorator("contributor", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a role!"
                      }
                    ]
                  })(
                    <Select
                      style={{ width: "20em", marginLeft: "10px" }}
                      showSearch
                      placeholder="Select a topic"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={this.handleContributor}
                    >
                      {this.state.dataReport
                        ? this.state.dataReport.map((item, i) => (
                            <Option key={i} value={item.name}>
                              {item.name}
                            </Option>
                          ))
                        : null}
                    </Select>
                  )}
                </Form.Item>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartContributor.data}
                      options={chartContri.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category" style={{ fontSize: "15px" }}>
                    Report on the total number of submit files contributed per
                    faculty
                  </h5>
                </CardHeader>
                <Form.Item>
                  {getFieldDecorator("contri", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a role!"
                      }
                    ]
                  })(
                    <Select
                      style={{ width: "20em", marginLeft: "10px" }}
                      showSearch
                      placeholder="Select a topic"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={this.handleContri}
                    >
                      {this.state.dataReport
                        ? this.state.dataReport.map((item, i) => (
                            <Option key={i} value={item.name}>
                              {item.name}
                            </Option>
                          ))
                        : null}
                    </Select>
                  )}
                </Form.Item>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartContri.data}
                      options={chartContri.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category" style={{ fontSize: "15px" }}>
                    report of the total number of contributors contributing to
                    each faculty
                  </h5>
                </CardHeader>
                <Form.Item>
                  {getFieldDecorator("contributor", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a role!"
                      }
                    ]
                  })(
                    <Select
                      style={{ width: "20em", marginLeft: "10px" }}
                      showSearch
                      placeholder="Select a topic"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={this.handleContributor}
                    >
                      {this.state.dataReport
                        ? this.state.dataReport.map((item, i) => (
                            <Option key={i} value={item.name}>
                              {item.name}
                            </Option>
                          ))
                        : null}
                    </Select>
                  )}
                </Form.Item>
                <CardBody>
                  <div className="chart-area">
                    <Pie
                      data={chartContributor.data}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    report: state.report
  };
};
const DashboardForm = Form.create()(Dashboard);
export default connect(mapStateToProps)(DashboardForm);
