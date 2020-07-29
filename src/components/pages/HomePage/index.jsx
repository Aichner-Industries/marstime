//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

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
import { getDate, getTime, getGeneral } from "./time";

// Dark Mode toggle
import DarkModeToggle from "react-dark-mode-toggle";

//> CSS
import "./HomePage.scss";
//#endregion

//#region > Components
class HomePage extends React.Component {
  state = {};

  componentDidMount() {
    {
      setInterval(() => {
        this.setState({ time: getTime() });
      });
    }
  }

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
                    <MDBSimpleChart
                      width={300}
                      height={300}
                      strokeWidth={20}
                      strokeColor={
                        this.state.time
                          ? parseInt(this.state.time.split(":")[0]) < 16
                            ? "#ffcd6b"
                            : "#ff0000"
                          : "#0000ff"
                      }
                      labelFontWeight="300"
                      labelFontSize="0"
                      labelColor="#000"
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
                    {this.state.isHovering && (
                      <div className="hover-expl">
                        Time on Mars is easily divided into days based on its
                        rotation rate and years based on its orbit. Sols, or
                        Martian solar days, are only 39 minutes and 35 seconds
                        longer than Earth days, and there are 668 sols (687
                        Earth days) in a Martian year. For convenience, sols are
                        divided into a 24-hour clock.
                      </div>
                    )}
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
