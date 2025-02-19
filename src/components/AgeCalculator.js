import React, { useState } from "react";
import { DateTime } from "luxon";
import NepaliDate from "nepali-date-converter";

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);
  const [calendar, setCalendar] = useState("AD");

  const calculateAge = () => {
    if (!dob) return alert("Please enter a valid date!");

    let birthDate;
    if (calendar === "BS") {
      birthDate = new NepaliDate(dob).toJsDate();
    } else {
      birthDate = DateTime.fromFormat(dob, "dd/MM/yyyy").toJSDate();
    }

    const today = new Date();
    if (birthDate > today) return alert("Please enter a valid DOB!");

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">Enter Your Date of Birth</h2>
      <select
        className="dropdown"
        value={calendar}
        onChange={(e) => setCalendar(e.target.value)}
      >
        <option value="AD">AD (Gregorian)</option>
        <option value="BS">BS (Bikram Sambat)</option>
      </select>
      <input
        type="text"
        placeholder="dd/mm/yyyy"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="input-field"
      />
      <button onClick={calculateAge} className="calculate-button">
        Submit
      </button>
      {age && (
        <p className="age-result">
          You are {age.years} years, {age.months} months, and {age.days} days old.
        </p>
      )}
    </div>
  );
};

export default AgeCalculator;