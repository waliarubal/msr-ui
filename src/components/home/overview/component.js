import React from "react";
import PropTypes from "prop-types";

export default class Overview extends React.Component {
  render() {
    return (
      <div class="overview-section">
        <div class="container">
          <div class="overview-section-inner">
            <h1>Overview </h1>
            <p>
              As part of Microsoft Research’s{" "}
              <a href="https://www.microsoft.com/en-us/research/group/central-engineering/">
                Central Engineering Team
              </a>
              , the Hardware Lab provides electrical and mechanical engineering
              support and prototype development for Microsoft’s research
              priorities.{" "}
            </p>

            <p>
              We provide engineering expertise and provide hardware prototyping
              support using our suite of in-house lab equipment, including 3D
              printers, PCBA fabrication and assembly machines, laser cutters,
              CNC’s, a water jet, and more. We provide electrical technician
              support for reworking PCBA’s and offer solder stations for lab
              patrons.
            </p>
            <p>
              To get started, create a new request (above) or reach out to us at{" "}
              <a href="mailto:hardlabsupport@microsoft.com">
                hardlabsupport@microsoft.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
