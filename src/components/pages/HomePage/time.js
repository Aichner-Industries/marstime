/**
 * Inspired by James Tauber's Mars Clock
 * https://github.com/jtauber/mars-clock
 */

// Difference between TAI and UTC. This value should be
// updated each time the IERS announces a leap second.
const tai_offset = 37;

// Last time the above value changed.
const last_leap_second = "1 January 2017";

function cos(deg) {
  return Math.cos((deg * Math.PI) / 180);
}

function sin(deg) {
  return Math.sin((deg * Math.PI) / 180);
}

function h_to_hms(h) {
  let x = h * 3600;
  let hh = Math.floor(x / 3600);

  if (hh < 10) hh = "0" + hh;
  let y = x % 3600;

  let mm = Math.floor(y / 60);
  if (mm < 10) mm = "0" + mm;

  let ss = Math.round(y % 60);

  if (ss < 10) ss = "0" + ss;

  return hh + ":" + mm + ":" + ss;
}

function add_commas(n) {
  n += "";
  let x = n.split(".");
  let x1 = x[0];
  let x2 = x.length > 1 ? "." + x[1] : "";
  let rgx = /(\d+)(\d{3})/;

  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }

  return x1 + x2;
}

function within_24(n) {
  if (n < 0) {
    n += 24;
  } else if (n >= 24) {
    n -= 24;
  }
  return n;
}

function getData(type) {
  // Create new date
  let d = new Date();

  /**
   * Difference between TAI and UTC in seconds. This value should be
   * updated each time the IERS announces a leap second.
   */

  let tai_offset = 37;
  // Last time the above value changed
  let last_leap_second = "1 January 2017";

  let millis = d.getTime();
  let jd_ut = 2440587.5 + millis / 8.64e7;
  let jd_tt = jd_ut + (tai_offset + 32.184) / 86400;
  // J2000 Epoch
  let j2000 = jd_tt - 2451545.0;
  /**
   * Mars Mean Anomaly
   * The mean anomaly is a measure of where an orbiting body is in its orbit.
   */
  let m = (19.387 + 0.52402075 * j2000) % 360;

  // Angle of Fictitious Mean Sun
  /**
   * Mars goes around the Sun, but viewed from Mars's point of view, the Sun goes around Mars.
   * I'm not talking about the daily motion of the Sun caused by Mars's rotation, but the year-long
   * motion of the Sun viewed from Mars.
   */
  let alpha_fms = (270.3863 + 0.5240384 * j2000) % 360;

  /**
   * Eccentricity
   * The eccentricity is the deviation of the orbit's ellipse from being a perfect circle.
   */
  let e = 0.0934 + 2.477e-9 * j2000;
  let pbs =
    0.0071 * cos((0.985626 * j2000) / 2.2353 + 49.409) +
    0.0057 * cos((0.985626 * j2000) / 2.7543 + 168.173) +
    0.0039 * cos((0.985626 * j2000) / 1.1177 + 191.837) +
    0.0037 * cos((0.985626 * j2000) / 15.7866 + 21.736) +
    0.0021 * cos((0.985626 * j2000) / 2.1354 + 15.704) +
    0.002 * cos((0.985626 * j2000) / 2.4694 + 95.528) +
    0.0018 * cos((0.985626 * j2000) / 32.8493 + 49.095);

  /**
   * Equation of center
   * The difference between the actual position of the Sun and the fictitious mean Sun is the same as
   * the difference between the true anomaly and mean anomaly.
   */
  let nu_m =
    (10.691 + 3.0e-7 * j2000) * sin(m) +
    0.623 * sin(2 * m) +
    0.05 * sin(3 * m) +
    0.005 * sin(4 * m) +
    0.0005 * sin(5 * m) +
    pbs;
  // By adding this to our mean anomaly, M, we also get our true anomaly
  let nu = nu_m + m;

  /**
   * Areocentric Solar Longitude
   * We can now calculate the actual position of the Sun from Mars's perspective (hence "areocentric").
   */
  let l_s = (alpha_fms + nu_m) % 360;

  /**
   * Equation of time
   * Describes the discrepancy between two kinds of solar time.
   */
  let eot =
    2.861 * sin(2 * l_s) - 0.071 * sin(4 * l_s) + 0.002 * sin(6 * l_s) - nu_m;
  let eot_h = (eot * 24) / 360;

  // Mars date in sol based on the universal Mars time
  let msd = (j2000 - 4.5) / 1.027491252 + 44796.0 - 0.00096;

  // Universal Mars time
  let mtc = (24 * msd) % 24;

  switch (type) {
    case "time":
      return h_to_hms(mtc);
    case "minutes":
      return Math.round(mtc * 60);
    case "date":
      return add_commas(msd.toFixed(5));
    case "angle":
      return alpha_fms.toFixed(5);
    default:
      return null;
  }
}

// General getter with dynamic result
export function getGeneral(type) {
  return getData(type);
}

// Get minutes of time
export function getMinutes() {
  return getData("minutes");
}

// Get the universal Mars time
export function getTime() {
  return getData("time");
}

// Get the Mars date in sol based on the universal Mars time
export function getDate() {
  return getData("date");
}

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Christian Aichner
 */
