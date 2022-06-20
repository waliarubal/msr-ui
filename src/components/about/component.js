import React from "react";
import PropTypes from "prop-types";
import Newsletter from "../common/newsletter";

export default class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class="work-section job-section">
          <div class="container">
            <div class="work-section-inner">
              <h2>About Us </h2>
            </div>
          </div>
        </div>
        <div class="about-section">
          <div class="container">
            <div class="about-section-inner">
              <h2>Welcome to the Hardware Lab! </h2>
              <div class="row">
                <div class="col-md-7 col-sm-12">
                  <p>
                    As part of Microsoft Research’s{" "}
                    <a
                      href="https://www.microsoft.com/en-us/research/group/central-engineering/"
                      target="_blank"
                    >
                      Central Engineering Team
                    </a>
                    , the Hardware Lab provides electrical and mechanical
                    engineering support and prototype development for
                    Microsoft’s research priorities.
                  </p>
                  <p>
                    We provide engineering expertise and provide hardware
                    prototyping support using our suite of in-house lab
                    equipment, including 3D printers, PCBA fabrication and
                    assembly machines, laser cutters, CNC’s, a water jet, and
                    more. We provide electrical technician support for reworking
                    PCBA’s and offer solder stations for lab patrons.
                  </p>
                  <br />
                  <address>
                    <p>
                      <strong>Location: </strong> Microsoft Building 99 Room 4
                    </p>
                    <p>
                      <strong>Hours: </strong> 7am-7pm, Monday-Friday{" "}
                    </p>
                    <p>
                      <strong> Contact:</strong>
                      <a href="mailto:hardlabsupport@microsoft.com">
                        {" "}
                        hardlabsupport@microsoft.com{" "}
                      </a>{" "}
                    </p>
                  </address>
                </div>
                <div class="col-md-5 col-sm-12">
                  <div class="about-img">
                    <img src="images/welcome.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="meet-section">
          <div class="container">
            <div class="meet-section-inner">
              <h2>Meet the Hardware Lab Team </h2>
              <p>
                {" "}
                Our team has a diverse skillset to help you meet your
                prototyping needs.{" "}
              </p>

              <div class="row">
                <div class="col-md-4 col-sm-12">
                  <div class="team-section">
                    <div class="team-img">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <span class="member-name"> John Romualdez</span>
                    <span class="member-profile">
                      {" "}
                      Lab Manager & Electrical Engineer
                    </span>
                  </div>
                </div>

                <div class="col-md-4 col-sm-12">
                  <div class="team-section">
                    <div class="team-img">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <span class="member-name"> Becky Gagnon</span>
                    <span class="member-profile">
                      {" "}
                      Electrical & Firmware Engineer
                    </span>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <div class="team-section">
                    <div class="team-img">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <span class="member-name"> Teresa LaScala</span>
                    <span class="member-profile">
                      {" "}
                      Model Maker & Lab Steward
                    </span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4 col-sm-12">
                  <div class="team-section">
                    <div class="team-img">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <span class="member-name"> Lex Story</span>
                    <span class="member-profile"> Model Maker</span>
                  </div>
                </div>

                <div class="col-md-4 col-sm-12">
                  <div class="team-section">
                    <div class="team-img">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <span class="member-name"> Sokunthea Neang</span>
                    <span class="member-profile">
                      {" "}
                      Electrical Engineering Technician
                    </span>
                  </div>
                </div>
                <div class="col-md-4 col-sm-12">
                  <div class="team-section">
                    <div class="team-img">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <span class="member-name"> Michael Fassbind</span>
                    <span class="member-profile"> Mechanical Engineer</span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-2 col-sm-12"></div>
                <div class="col-md-4 col-sm-12">
                  <div class="team-section">
                    <div class="team-img">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <span class="member-name"> Todd Jurgenson</span>
                    <span class="member-profile"> Model Maker</span>
                  </div>
                </div>

                <div class="col-md-4 col-sm-12">
                  <div class="team-section">
                    <div class="team-img">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <span class="member-name"> Cheuk Kwan Lui</span>
                    <span class="member-profile">
                      {" "}
                      Electrical & Firmware Engineer
                    </span>
                  </div>
                </div>
                <div class="col-md-2 col-sm-12"></div>
              </div>
            </div>
          </div>
        </div>
        <Newsletter />
      </React.Fragment>
    );
  }
}
