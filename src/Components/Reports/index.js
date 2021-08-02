import React, { useContext, useState } from "react";
import Tabs from "../../HelperComponents/Tabs";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Responses from "./Responses";
import Insights from "./Insights";
import { ReportContext } from "../Context/ReportContext";

export default function Reports() {
    const { dates, changeDate, dateValidations } = useContext( ReportContext );
    return (
        <div>
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
            </div>

            <Tabs>
                <div label="Insights">
                    {dateValidations().error ? (<div>{dateValidations().errorMessage}</div>) : (<Insights></Insights>)}
                    
                </div>
                <div label="Responses">
                    {dateValidations().error ? (<div>{dateValidations().errorMessage}</div>) : (<Responses></Responses>)}
                </div>
            </Tabs>
        </div>
    );
}
