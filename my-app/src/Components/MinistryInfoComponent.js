import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Timeline } from "react-twitter-widgets"; //required for twitter widget even though not used

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
              <Timeline
                dataSource={{
                  sourceType: "profile",
                  screenName: "MOH_Bahrain",
                }}
                options={{
                  username: "MOH_Bahrain",
                  height: "600",
                }}
                onLoad={() => console.log("Timeline is loaded!")}
              />
            </Card>
          </CardDeck>
        </Jumbotron>
      </div>
    );
  }
}

export default MinistryInfo;
