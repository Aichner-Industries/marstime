//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> Additional
// Progress bar component in the shape of a semicircle
import SemiCircleProgressBar from "react-progressbar-semicircle";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBView,
  MDBSimpleChart,
} from "mdbreact";

//> Images
// Logo of MDB React
import MDBLogo from "../../../assets/mdb-react-small.png";
// Logo of Advertisement Agency Christian Aichner
import AgencyLogo from "../../../assets/agency-small.png";
// Image of someone coding
import Projects from "../../../assets/content/projects.jpg";

// Mars Time
import { getDate, getTime, getMinutes, getGeneral } from "./time";

// Dark Mode toggle
import DarkModeToggle from "react-dark-mode-toggle";

//> CSS
import "./HomePage.scss";
//#endregion

//#region > Components
class HomePage extends React.Component {
  state = { minutes: 0 };

  componentDidMount() {
    // Initial
    this.init();

    // Get time every 250ms
    setInterval(() => {
      this.setState({ time: getTime() });
    }, 250);

    // Get minutes every minute
    setInterval(() => {
      this.setState({ minutes: getMinutes() });
    }, 60000);
  }

  init = () => {
    this.setState({
      time: getTime(),
      minutes: getMinutes(),
    });
  };

  constructor(props) {
    super(props);

    this.handleMouseHover = this.handleMouseHover.bind(this);

    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    console.log(this.state.time);

    return (
      <>
        <MDBEdgeHeader color="red darken-4" className="sectionPage" />
        <div className="mt-3 mb-5">
          <MDBFreeBird>
            <MDBRow>
              <MDBCol
                md="10"
                className="mx-auto float-none white py-2 px-2 border"
              >
                <MDBCardBody className="text-center">
                  <h2 className="h2-responsive mb-4">
                    <SemiCircleProgressBar
                      percentage={(100 / 1477) * this.state.minutes}
                    />
                    <div
                      onMouseOver={this.handleMouseHover} //need to find better solution
                      onMouseLeave={this.handleMouseHover}
                      className="clock"
                    >
                      <h3
                        onMouseOver={this.handleMouseHover}
                        onMouseLeave={this.handleMouseHover}
                      >
                        Coordinated Mars Time
                      </h3>
                      <div
                        onMouseOver={this.handleMouseHover}
                        onMouseLeave={this.handleMouseHover}
                        className="time mtc"
                      >
                        {this.state.time && this.state.time}
                      </div>
                    </div>
                  </h2>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12" className="mt-4">
                <p className="text-center text-muted mb-1"></p>
                <hr className="my-5" />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </>
    );
  }
}
//#endregion

//#region > Exports
export default HomePage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
