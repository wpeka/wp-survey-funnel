import React, { useContext, useState } from "react";
import Tabs from "../../HelperComponents/Tabs";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Responses from "./Responses";
import Insights from "./Insights";
import { ReportContext } from "../Context/ReportContext";
import '../../scss/reports.scss';
import NoResponseRecorded from "./NoResponseRecorded";

export default function Reports() {
    const { dates, changeDate, dateValidations } = useContext( ReportContext );
    return (
        <div className="surveyfunnel-lite-reports-body">
            <div className="surveyfunnel-lite-reports-container">
                <Tabs>
                    <div label="Insights">
                        {dateValidations().error ? (<NoResponseRecorded title={dateValidations().errorTitle} description={dateValidations().errorMessage}></NoResponseRecorded>) : (<Insights></Insights>)}
                        
                    </div>
                    <div label="Responses">
                        {dateValidations().error ? (<NoResponseRecorded title={dateValidations().errorTitle} description={dateValidations().errorMessage}></NoResponseRecorded>) : (<Responses></Responses>)}
                    </div>
                </Tabs>
                <div className="datePicker">
                    <DateTime
                        dateFormat="MMMM Do YYYY"
                        value={dates.startDate}
                        onChange={(date) => {
                            changeDate(date, "startDate");
                        }}
                        timeFormat={false}
                        closeOnSelect={true}
                    ></DateTime>
                    <strong> - </strong>
                    <DateTime
                        dateFormat="MMMM Do YYYY"
                        value={dates.endDate}
                        onChange={(date) => {
                            changeDate(date, "endDate");
                        }}
                        timeFormat={false}
                        closeOnSelect={true}
                    ></DateTime>
                    <img src={require('../Build/BuildImages/calendar.png')}></img>
                </div>


            </div>
        </div>
    );
}
