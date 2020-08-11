/**
 * Inspired by "Earth Date to Martian Solar Longitude Conversion"
 * http://www-mars.lmd.jussieu.fr/mars/time/martian_time.html
 */

function CheckGivenYear() {
  let leap; // leap year ? (0==no, 1==yes) (returned value)
  let val = new Date();
  val = val.getFullYear();

  // check if it is a leap year
  /* a year is a leap year if it is a multiple of 4 but not of 100,
or if it is a multiple of 400 */
  if ((val % 4 == 0 && val % 100 != 0) || val % 400 == 0) {
    leap = 1;
  } else {
    leap = 0; // not a leap year
  }
  return leap;
}

export function Convert2Julian() {
  let currentDate = new Date(),
    day = currentDate.getDate(),
    month = currentDate.getMonth() + 1,
    year = currentDate.getFullYear();

  let leap; // leap year ? (0==no, 1==yes)
  let i;
  let ref_year = 1968;
  let ref_jDate = 2.4398565e6; // Julian date for 01/01/1968 00:00:00
  let eDays = new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334);
  // eDays = number of elapsed days during previous months of same year
  let nDay = 0.0; // number of days

  // compute number of days due to years
  if (year > ref_year) {
    for (i = ref_year; i < year; i++) {
      nDay = nDay + 365.0;
      if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
        // leap year
        nDay++;
      }
    }
  } else {
    for (i = year; i < ref_year; i++) {
      nDay = nDay - 365.0;
      if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
        // leap year
        nDay--;
      }
    }
  }

  leap = CheckGivenYear();

  nDay = nDay + eDays[month - 1];
  //alert(nDay)

  //add 1 if year is leap and month >=3
  if (leap == 1 && month >= 3) {
    nDay = nDay + 1;
  }
  // add reference year offset and day
  //jDate=ref_jDate+nDay+day;
  let jDate = nDay * 1.0 + day * 1.0 + ref_jDate * 1.0 - 1.0;

  return jDate;
}

export function Convert2Ls() {
  // Convert a Julian date to corresponding "sol" and "Ls"
  let sol;
  let jDate;
  let ls;
  let martianYear;
  let martianMonth;

  let jDate_ref = 2.442765667e6; // 19/12/1975 4:00:00, such that Ls=0
  // jDate_ref is also the beginning of Martian Year "12"
  let martianYear_ref = 12;
  let earthDay = 86400.0;
  let marsDay = 88775.245;
  let marsYear = 668.6; // number of sols in a martian year

  // Start by converting given date to Julian date
  jDate = Convert2Julian();

  // Convert julian days to sol date
  //jDate = document.julian.value;

  sol = ((jDate - jDate_ref) * earthDay) / marsDay;

  martianYear = martianYear_ref;
  // Compute Martian Year #, along with sol value
  // sol being computed modulo the number of sols in a martian year
  while (sol >= marsYear) {
    sol = sol - marsYear;
    martianYear = martianYear + 1;
  }
  while (sol < 0.0) {
    sol = sol + marsYear;
    martianYear = martianYear - 1;
  }

  //document.dummy.dummy1.value=sol;

  // convert sol number to Ls
  ls = Sol2Ls(sol);

  // Knowing Ls compute martian month
  martianMonth = 1 + Math.floor(ls / 30);
  ls = Math.round(ls * 10) / 10;
  sol = 1 + Math.floor(sol);

  //Display value with a maximum of 2 decimal digits
  /*document.martianYear.value = martianYear;
  document.calendar.martianMonth.value = martianMonth;
  document.calendar.ls.value = Math.round(ls * 10) / 10;
  //document.calendar.sol.value=Math.round(sol*10)/10;
  document.calendar.sol.value = 1 + Math.floor(sol);*/

  return {
    month: martianMonth,
    year: martianYear,
  };
}

function Sol2Ls(sol) {
  var sol;
  let ls;

  let year_day = 668.6; // number of sols in a martian year
  let peri_day = 485.35; // perihelion date
  let e_ellip = 0.0934; // orbital eccentricity
  let timeperi = 1.90258341759902; // 2*Pi*(1-Ls(perihelion)/360); Ls(perihelion)=250.99
  let rad2deg = 180 / Math.PI;

  let i;
  let zz,
    zanom,
    zdx = 10;
  let xref, zx0, zteta;
  // xref: mean anomaly, zx0: eccentric anomaly, zteta: true anomaly

  zz = (sol - peri_day) / year_day;
  zanom = 2 * Math.PI * (zz - Math.round(zz));
  xref = Math.abs(zanom);

  // Solve Kepler equation zx0 - e *sin(zx0) = xref
  // Using Newton iterations
  zx0 = xref + e_ellip * Math.sin(xref);
  do {
    zdx =
      -(zx0 - e_ellip * Math.sin(zx0) - xref) / (1 - e_ellip * Math.cos(zx0));
    zx0 = zx0 + zdx;
  } while (zdx > 1e-7);
  if (zanom < 0) zx0 = -zx0;

  // Compute true anomaly zteta, now that eccentric anomaly zx0 is known
  zteta =
    2 * Math.atan(Math.sqrt((1 + e_ellip) / (1 - e_ellip)) * Math.tan(zx0 / 2));

  // compute Ls
  ls = zteta - timeperi;
  if (ls < 0) ls = ls + 2 * Math.PI;
  if (ls > 2 * Math.PI) ls = ls - 2 * Math.PI;
  // convert Ls into degrees
  ls = rad2deg * ls;

  return ls;
}
