import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Timeline } from "react-twitter-widgets"; //required for twitter widget even though not used
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Jumbotron from "react-bootstrap/Jumbotron";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import { Bar, Line } from "react-chartjs-2";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import axios from "axios";

import MinistryInfoComponent from "./Components/MinistryInfoComponent";
import DisqusComponent from "./Components/DisqusComponent";

const url = "https://disease.sh/v2/countries/bahrain?yesterday=false"; //for card data
const url1 = "https://pomber.github.io/covid19/timeseries.json"; //for curve chart data

const fetchData = async () => {
  //fetch for card
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {}
};

const fetchDailyData = async () => {
  //fetch for curve chart
  try {
    const response = await axios.get(url1);
    return response;
  } catch (error) {}
};

class App extends React.Component {
  state = {
    bhdata: {},
    dailyData: [],
  };

  async componentDidMount() {
    const getit = await fetchData();
    const getit1 = await fetchDailyData();
    this.setState({ bhdata: getit.data });
    this.setState({ dailyData: getit1.data.Bahrain });
  }
  render() {
    const { bhdata } = this.state;
    const { dailyData } = this.state;
    console.log(dailyData);
    console.log(bhdata);
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/237/flag-for-bahrain_1f1e7-1f1ed.png"
              width="72"
              height="72"
              className="d-inline-block align-center"
            />{" "}
            BAHRAIN COVID-19 TRACKER
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Developed by Shahnawaz Mogal </Navbar.Text>
          </Navbar.Collapse>{" "}
        </Navbar>
        <Nav justify variant="tabs" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link href="/">Tracking Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/discussion" href="/discussion">
              Discussion
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {!bhdata.active && ( //In case API call is taking time
          <div>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
          </div>
        )}
        {bhdata.active && ( //Only render this part after API call success
          <div className="App">
            <Jumbotron>
              <h2>Current Case Summary</h2>

              <CardDeck>
                <Card border="warning" bg="warning" style={{ width: "12rem" }}>
                  <Card.Header>Active Cases</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <CountUp
                        start={0}
                        end={bhdata.active}
                        duration={2.5}
                        separator=","
                      />
                      <Badge pill variant="secondary">
                        Today:{" "}
                        <CountUp
                          start={0}
                          end={bhdata.todayCases}
                          duration={2.5}
                          separator=","
                        />
                      </Badge>
                    </Card.Title>
                  </Card.Body>
                </Card>
                <Card border="danger" bg="danger" style={{ width: "12rem" }}>
                  <Card.Header>Critical</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <CountUp
                        start={0}
                        end={bhdata.critical}
                        duration={2.5}
                        separator=","
                      />
                    </Card.Title>
                  </Card.Body>
                </Card>
              </CardDeck>
            </Jumbotron>

            <Jumbotron>
              <h2>Historical Case Summary</h2>
              <CardDeck>
                <Card border="primary" bg="primary" style={{ width: "12rem" }}>
                  <Card.Header>Tests Performed</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <CountUp
                        start={0}
                        end={bhdata.tests}
                        duration={2.5}
                        separator=","
                      />
                    </Card.Title>
                  </Card.Body>
                </Card>
                <Card
                  border="secondary"
                  bg="secondary"
                  style={{ width: "12rem" }}
                >
                  <Card.Header>Cases</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <CountUp
                        start={0}
                        end={bhdata.cases}
                        duration={2.5}
                        separator=","
                      />
                    </Card.Title>
                  </Card.Body>
                </Card>
                <Card border="success" bg="success" style={{ width: "12rem" }}>
                  <Card.Header>Recoveries</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <CountUp
                        start={0}
                        end={bhdata.recovered}
                        duration={2.5}
                        separator=","
                      />
                    </Card.Title>
                  </Card.Body>
                </Card>
                <Card border="danger" bg="danger" style={{ width: "12rem" }}>
                  <Card.Header>Deaths</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <CountUp
                        start={0}
                        end={bhdata.deaths}
                        duration={2.5}
                        separator=","
                      />
                      <Badge pill variant="secondary">
                        Today:{" "}
                        <CountUp
                          start={0}
                          end={bhdata.todayDeaths}
                          duration={2.5}
                          separator=","
                        />
                      </Badge>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </CardDeck>
            </Jumbotron>

            <Jumbotron>
              <h2>Charts</h2>
              <Bar
                data={{
                  labels: ["Infected", "Recovered", "Deaths"],
                  datasets: [
                    {
                      label: "People",
                      backgroundColor: [
                        "rgba(255, 193, 7, 1)",
                        "rgba(40, 167, 69, 1)",
                        "rgba(220, 53, 69, 1)",
                      ],
                      data: [bhdata.cases, bhdata.recovered, bhdata.deaths],
                    },
                  ],
                }}
                width={650}
                height={300}
                options={{
                  legend: { display: false },
                  maintainAspectRatio: false,
                }}
              />
            </Jumbotron>
            <Jumbotron>
              <Line
                data={{
                  labels: dailyData.map(({ date }) => date),
                  datasets: [
                    {
                      data: dailyData.map((data) => data.confirmed),
                      label: "Infected",
                      borderColor: "#ffc107",
                      backgroundColor: "rgba(255, 193, 7, 0.5)",
                      fill: true,
                    },
                    {
                      data: dailyData.map((data) => data.recovered),
                      label: "Recovered",
                      borderColor: "rgba(40, 167, 69, 1)",
                      backgroundColor: "rgba(40, 167, 69, 0.5)",
                      fill: true,
                    },
                    {
                      data: dailyData.map((data) => data.deaths),
                      label: "Deaths",
                      borderColor: "rgba(220, 53, 69, 1)",
                      backgroundColor: "rgba(220, 53, 69, 0.5)",
                      fill: true,
                    },
                  ],
                }}
                width={650}
                height={300}
                options={{
                  legend: { display: true },
                  maintainAspectRatio: false,
                }}
              />
            </Jumbotron>
            <MinistryInfoComponent></MinistryInfoComponent>
            <DisqusComponent></DisqusComponent>
          </div>
        )}
        <Navbar bg="dark" variant="dark">
          <Navbar.Collapse className="justify-content-start">
            <Navbar.Text>
              Contact developer: shahnawazbaigmogal@outlook.com{" "}
            </Navbar.Text>
          </Navbar.Collapse>{" "}
          <Navbar.Collapse className="justify-content-start">
            <Navbar.Text>Data is automatically updated every hour </Navbar.Text>
          </Navbar.Collapse>{" "}
        </Navbar>
      </div>
    );
  }
}

class Discussion extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/apple/237/flag-for-bahrain_1f1e7-1f1ed.png"
              width="72"
              height="72"
              className="d-inline-block align-center"
            />{" "}
            BAHRAIN COVID-19 TRACKER
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Developed by Shahnawaz Mogal </Navbar.Text>
          </Navbar.Collapse>{" "}
        </Navbar>
        <Nav justify variant="tabs" defaultActiveKey="/discussion">
          <Nav.Item>
            <Nav.Link href="/">Tracking Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/discussion" href="/discussion">
              Discussion
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <DisqusComponent></DisqusComponent>
      </div>
    );
  }
}

export { App, Discussion };
