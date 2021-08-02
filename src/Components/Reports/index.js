import React, { useState } from "react";
import Tabs from "../../HelperComponents/Tabs";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import Responses from "./Responses";
import Insights from "./Insights";

const options = {  year: 'numeric', month: 'long', day: 'numeric' };
const toDateString = ( date ) => {
	return '';
}

export default function Reports() {
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
	
    return (
        <div>
			<div className="datePicker">
				<div className="datePickerInput">
					<p>{toDateString(dates.startDate)} - {toDateString(dates.endDate)}</p>
				</div>
				<DateRange
					editableDateInputs={true}
					onChange={item => setDates([item.selection])}
					moveRangeOnFirstSelection={false}
					ranges={dates}
				/>
			</div>
			
            <Tabs>
                <div label="Insights">
                    <Insights></Insights>
                </div>
                <div label="Responses">
					<Responses></Responses>
				</div>
            </Tabs>
        </div>
    );
}
