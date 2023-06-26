
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import LineChart from "./LineChart";
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class GlucoseObservation {
  constructor(level, date, message = "") {
    this.level = level;
    this.date = date;
    this.message = message;
  }
}

const glucoseReadings = [
  new GlucoseObservation(180, new Date("6/20/2023 01:05:05"), "lol"),
  new GlucoseObservation(221, new Date("6/20/2023 01:05:10")),
  new GlucoseObservation(212, new Date("6/20/2023 01:05:15")),
  new GlucoseObservation(209, new Date("6/20/2023 01:05:20")),
  new GlucoseObservation(185, new Date("6/20/2023 01:05:25")),
  new GlucoseObservation(200, new Date("6/20/2023 01:05:30")),
];

const state = {
  showF: 99,
  labels: [
    glucoseReadings[0].date.toTimeString().split(" ")[0],
    glucoseReadings[1].date.toTimeString().split(" ")[0],
    glucoseReadings[2].date.toTimeString().split(" ")[0],
    glucoseReadings[3].date.toTimeString().split(" ")[0],
    glucoseReadings[4].date.toTimeString().split(" ")[0],
    glucoseReadings[5].date.toTimeString().split(" ")[0],
  ],
  datasets: [
    {
      label: 'Blood sugar level',
      fill: false,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [ glucoseReadings[0].level, glucoseReadings[1].level,
              glucoseReadings[2].level, glucoseReadings[3].level,
              glucoseReadings[4].level, glucoseReadings[5].level,
            ]
    }
  ]
}

function App() {
  const [showFilters, setShowFilters] = useState(2);
  const [selection, setSelection] = useState(NaN);
  const currentReading = glucoseReadings[0].level;
  const handleClick = () => {
    alert("f");
    setShowFilters(0);
  };
  return (
    <div onScroll={() => handleClick()}>
      {showFilters}
      <div className="container-fluid bg-info text-center">
        <div className="container">{showFilters ? displayFilters() : ""}</div>
      </div>
      <div className="container-fluid text-center">
        <div className="container">
          {displayCurrentAndSelection(currentReading, selection)}
          {selection >= 0 ? ShowUploadFields(selection) : ""}
          {displayReadings(setSelection)}
          {displayGraph()}
        </div>
      </div>
      <br/>
    </div>
  );
}

function displayGraph() {
  return (
    <Line data={state} />
  );
}

function displayFilters() {
  return (
    <div className="row  padding2">
      <div className="input-group input-group-lg">
        <div className="col-sm-12 col-md-4">
          <h6>date</h6>
          <input value="2023-06-20" type="date" className="form-control"/>
        </div>
        <div class="col-sm-6 col-md-4">
          <h6>starting from</h6>
          <input type="time" className="form-control" required/>
        </div>
        <div className="col-sm-6 col-md-4">
          <h6>until</h6>
          <input type="time" className="form-control" required/>
        </div>
      </div>
    </div>
  );
}

function displayCurrentAndSelection(currentReading, selection) {
  return (
    <div className="row">
      <div className="col-6">
        <div className="card bg-dark text-white padding">
          <h1 className={getColor(currentReading, true)}>{currentReading} mg/dL</h1>
          <small>Most Recent</small>
        </div>
      </div>
      <div className="col-6">
        <div class="card bg-light padding">
          <h1 className={getColor(glucoseReadings[selection]?.level, true)}>
            {glucoseReadings[selection] == null ? "-" : glucoseReadings[selection].level} mg/dL
          </h1>
          <small>
            {new Date(glucoseReadings[selection]?.date).toLocaleString('en-us', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
          })}
          </small>
        </div>
      </div>
    </div>
  );
}

function displayReadings(setSelection) {
  return (
    <div className="row">
      <div className="col-12">
        <h4>Click a glucose reading ({glucoseReadings.length}) to expand details.</h4>
        {glucoseReadings.map((o, key) => 
          <button onClick={() => setSelection(key)}
                  className={getColor(o.level, false)}
                  data-toggle="tooltip" data-placement="top"
                  title="Tooltip on top">{o.level}</button>)}
      </div>
    </div>
  );
}

function ShowUploadFields(selection) {
  const textareaValue = useState();
  return (
    <div className="row">
      <div className="input-group input-group-lg">
        <div className="col-sm-12 col-md-5">
          <div className="card form-control">
            <button type="button" className="btn btn-secondary">
                <svg
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" 
                    height="32" 
                    fill="currentColor" 
                    className="bi bi-mic" 
                    viewBox="0 0 16 16">
                  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"></path>
                  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"></path>
                </svg>
                Record Voice Note
              </button>
            </div>
        </div>
        <div className="col-sm-12 col-md-5">
          <div className="card form-control">
            <textarea className="form-control"
                      placeholder="Enter text note"
                      value={textareaValue}>
            </textarea>
          </div>
        </div>
        <div className="col-sm-12 col-md-2">
          <div className="card form-control">
            <button className="btn btn-primary">
              <span>Upload </span>
              <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  fill="currentColor" 
                  class="bi bi-send" 
                  viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getColor(level, text) {
  var t = "btn btn-";
  var t2 = "text-";
  if (level >= 190 && level < 219)
    return ((text ? t2 : t) + "warning");
  else if (level >= 220)
    return ((text ? t2 : t) + "danger");
  else return ((text ? t2 : t) + "success");
}

export default App;
