import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Timeline } from "react-twitter-widgets"; //required for twitter widget even though not used
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Jumbotron from "react-bootstrap/Jumbotron";
import Badge from "react-bootstrap/Badge";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";

const url = "https://coronavirus-19-api.herokuapp.com/countries/bahrain"; //for card data
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
        <Jumbotron>
          <h2>Current Case Summary</h2>

          <CardDeck>
            <Card border="warning" bg="warning" style={{ width: "12rem" }}>
              <Card.Header>Active Cases</Card.Header>
              <Card.Body>
                <Card.Title>
                  {bhdata.active + " "}
                  <Badge pill variant="secondary">
                    Today: {bhdata.todayCases}
                  </Badge>
                </Card.Title>
              </Card.Body>
            </Card>
            <Card border="danger" bg="danger" style={{ width: "12rem" }}>
              <Card.Header>Critical</Card.Header>
              <Card.Body>
                <Card.Title>{bhdata.critical}</Card.Title>
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
                <Card.Title>{bhdata.totalTests}</Card.Title>
              </Card.Body>
            </Card>
            <Card border="secondary" bg="secondary" style={{ width: "12rem" }}>
              <Card.Header>Cases</Card.Header>
              <Card.Body>
                <Card.Title>{bhdata.cases}</Card.Title>
              </Card.Body>
            </Card>
            <Card border="success" bg="success" style={{ width: "12rem" }}>
              <Card.Header>Recoveries</Card.Header>
              <Card.Body>
                <Card.Title>{bhdata.recovered}</Card.Title>
              </Card.Body>
            </Card>
            <Card border="danger" bg="danger" style={{ width: "12rem" }}>
              <Card.Header>Deaths</Card.Header>
              <Card.Body>
                <Card.Title>
                  {bhdata.deaths + " "}
                  <Badge pill variant="secondary">
                    Today: {bhdata.todayDeaths}
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

        <Jumbotron>
          <h2>Information from Ministry of Health</h2>
          <CardDeck>
            <Card>
              <iframe
                src="https://www.moh.gov.bh/COVID19/News"
                width="100%"
                height="500"
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Card>
            <Card>
              <a
                class="twitter-timeline"
                href="https://twitter.com/MOH_Bahrain"
                data-chrome="nofooter"
                height="500"
                width="100%"
              ></a>
            </Card>
          </CardDeck>
        </Jumbotron>
      </div>
    );
  }
}

export default App;

/*
<Jumbotron>
          <iframe
            src="http://www.youtube.com/embed/?listType=user_uploads&list=TheMoHBahrain"
            width="800"
            height="400"
          ></iframe>
        </Jumbotron>
 */
/*
<Timeline
        dataSource={{
          sourceType: "profile",
          screenName: "MOH_Bahrain",
        }}
        options={{
          username: "MOH_Bahrain",
          width: "450",
          height: "650",
        }}
        onLoad={() => console.log("Timeline is loaded!")}
      />
*/
