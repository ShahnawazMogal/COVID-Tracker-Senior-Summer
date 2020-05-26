import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Timeline } from "react-twitter-widgets";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Jumbotron from "react-bootstrap/Jumbotron";
import Badge from "react-bootstrap/Badge";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const url = "https://coronavirus-19-api.herokuapp.com/countries/bahrain";

const fetchData = async () => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {}
};

class App extends React.Component {
  state = {
    bhdata: {},
  };

  async componentDidMount() {
    const getit = await fetchData();
    this.setState({ bhdata: getit.data });
  }
  render() {
    const { bhdata } = this.state;
    console.log(bhdata);
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Emblem_of_Bahrain.svg/593px-Emblem_of_Bahrain.svg.png"
              width="50"
              height="50"
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
          <h2>Chart</h2>
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
                width="650"
              >
                timeline
              </a>
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
