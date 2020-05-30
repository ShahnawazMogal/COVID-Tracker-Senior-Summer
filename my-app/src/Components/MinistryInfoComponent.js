import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Jumbotron from "react-bootstrap/Jumbotron";

class MinistryInfo extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h2>Information from Ministry of Health</h2>
          <CardDeck>
            <Card>
              <iframe
                src="https://www.moh.gov.bh/COVID19/News"
                width="100%"
                height="600"
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Card>
            <Card>
              <a
                class="twitter-timeline"
                href="https://twitter.com/MOH_Bahrain"
                data-chrome="nofooter"
                height="600"
                width="100%"
              ></a>
            </Card>
          </CardDeck>
        </Jumbotron>
      </div>
    );
  }
}

export default MinistryInfo;
