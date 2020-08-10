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
  MDBMask,
} from "mdbreact";

//> Mars Time helper
import { getDate, getTime, getMinutes, getGeneral } from "./time";

//> Images
import logoImg from "../../../assets/content/marstime-white.png";

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
      this.setState({ minutes: getMinutes(), date: getDate() });
    }, 60000);
  }

  init = () => {
    this.setState({
      time: getTime(),
      minutes: getMinutes(),
      date: getDate(),
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
        <MDBView className="sectionPage">
          <MDBEdgeHeader />
          <MDBMask overlay="black-light" className="d-flex flex-center">
            <img src={logoImg} alt="Marstime Logo" />
          </MDBMask>
        </MDBView>
        <div className="mt-3 mb-5">
          <MDBFreeBird>
            <MDBRow>
              <MDBCol md="10" className="mx-auto float-none white py-2 px-2">
                <MDBCardBody className="text-center">
                  <SemiCircleProgressBar
                    percentage={(100 / 1477) * this.state.minutes}
                  />
                  <MDBRow className="justify-content-center mt-4">
                    <MDBCol lg="5">
                      <div className="clock border mb-4 py-3">
                        <p className="lead h3-responsive font-weight-bold mb-0">
                          {this.state.time && this.state.time}
                        </p>
                        <p className="lead text-muted mb-0">
                          Coordinated Mars Time
                        </p>
                      </div>
                    </MDBCol>
                    <MDBCol lg="5">
                      <div className="clock border mb-4 py-3">
                        <p className="lead h3-responsive font-weight-bold mb-0">
                          {this.state.date && this.state.date}
                        </p>
                        <p className="lead text-muted mb-0">Mars Sol Date</p>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBFreeBird>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12" className="mt-4">
                <p className="text-center text-muted mb-1"></p>
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
 * Copyright © 2020 Christian Aichner
 */
