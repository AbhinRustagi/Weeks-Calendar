/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./App.css";
import * as dayjs from "dayjs";

function calculateLivedNoOfWeeks(dateOfBirth) {
  const dob = dayjs(dateOfBirth, "YYYY-MM-DD");
  const today = dayjs();

  const diffInDays = today.diff(dob, "days");

  return parseInt(diffInDays / 7);
}

function calculateTotalNoOfWeeks(lifeExpectancy, dateOfBirth) {
  const dob = dayjs(dateOfBirth, "YYYY-MM-DD");
  const last = dayjs(dateOfBirth, "YYYY-MM-DD").add(
    parseInt(lifeExpectancy),
    "years"
  );

  const diffInDays = last.diff(dob, "days");
  return parseInt(diffInDays / 7);
}

function App() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");
  const [noOfWeeks, setNoOfWeeks] = useState(0);
  const [totalNoOfWeeks, setTotalNoOfWeeks] = useState(0);
  const [cookies, setCookie] = useCookies(["lifeExpectancy", "dateOfBirth"]);

  useEffect(() => {
    if (cookies.lifeExpectancy) {
      setLifeExpectancy(cookies.lifeExpectancy);
    } else {
      setLifeExpectancy("75");
    }

    if (cookies.dateOfBirth) {
      setDateOfBirth(cookies.dateOfBirth);
    } else {
      setDateOfBirth("2000-01-01");
    }
  }, []);

  useEffect(() => {
    if (lifeExpectancy && cookies.lifeExpectancy !== lifeExpectancy)
      setCookie("lifeExpectancy", lifeExpectancy);
    if (dateOfBirth && cookies.dateOfBirth !== dateOfBirth)
      setCookie("dateOfBirth", dateOfBirth);

    const _totalNoOfWeeks = calculateTotalNoOfWeeks(
      lifeExpectancy,
      dateOfBirth
    );
    const _livedNoOfWeeks = calculateLivedNoOfWeeks(dateOfBirth);
    setTotalNoOfWeeks(_totalNoOfWeeks);
    setNoOfWeeks(_livedNoOfWeeks);
  }, [lifeExpectancy, dateOfBirth]);

  return (
    <div className="App">
      <div className="container">
        <h1>Life Weeks Calendar</h1>
        <div className="input-group">
          <div className="input-wrapper">
            <label htmlFor="dateOfBirth">
              <strong>Date of Birth</strong>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lifeExpectancy">
              <strong>Life Expectancy</strong>
            </label>
            <select
              name="lifeExpectancy"
              id="lifeExpectancy"
              value={lifeExpectancy}
              onChange={(e) => setLifeExpectancy(e.target.value)}
            >
              <option value="60">60 Years</option>
              <option value="65">65 Years</option>
              <option value="70">70 Years</option>
              <option value="75" selected>
                75 Years
              </option>
              <option value="80">80 Years</option>
              <option value="85">85 Years</option>
              <option value="90">90 Years</option>
              <option value="95">95 Years</option>
              <option value="100">100 Years</option>
            </select>
          </div>
        </div>
        <h2>
          {noOfWeeks} weeks completed out of {totalNoOfWeeks} expected weeks (
          {parseInt((noOfWeeks * 100) / totalNoOfWeeks)}%)
        </h2>
        <div className="box-group">
          {totalNoOfWeeks &&
            [...Array(totalNoOfWeeks)].map((_, index) => (
              <div
                className={`box ${index < noOfWeeks ? "box-lived" : ""}`}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
