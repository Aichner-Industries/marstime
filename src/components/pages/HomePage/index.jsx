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
                      width={250}
                      height={250}
                      strokeWidth={3}
                      percent={56}
                      strokeColor={
                        this.state.time
                          ? parseInt(this.state.time.split(":")[0]) < 16
                            ? "#4FB64E"
                            : "#ff0000"
                          : "#0000ff"
                      }
                      labelFontWeight="300"
                      labelFontSize="0"
                      labelColor="#000"
                    />
                    <div className="clock">
                      <h3>Coordinated Mars Time</h3>
                      <div className="time mtc">
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
