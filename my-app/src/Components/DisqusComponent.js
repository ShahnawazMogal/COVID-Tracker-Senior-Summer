import Disqus, { DiscussionEmbed } from "disqus-react";
import React from "react";
class DisqusComponent extends React.Component {
  disqusConfig = {
    url: "https://www.covid19bahrain.co/",
    identifier: "main_discussion",
    title: "COVID Discussion Board",
  };
  render() {
    return (
      <div>
        <DiscussionEmbed
          shortname="https-www-covid19bahrain-co"
          config={this.disqusConfig}
        />
      </div>
    );
  }
}

export default DisqusComponent;
