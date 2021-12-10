import React, { useContext, useEffect, useState } from "react";
import { shareTabsData } from "../../Data";
import { ShareContext } from "../Context/ShareContext";
import Tabs from "../../HelperComponents/Tabs";
import ShareShortCode from "./ShareShortCode";
import PopupSettings from "./PopupSettings";
import '../../scss/share.scss';

// function decides which component to render based on currentShareTab.
const getCurrentTabContent = ( currentShareTab ) => {
	switch( currentShareTab ) {
		case 'shortcode':
			return <ShareShortCode />
		case 'popup':
			return <PopupSettings />
		default:
			return '';
	}
}

export default function Share() {

	// state to keep in track of currentTab defualt is shortcode.
	const [ currentShareTab, setCurrentShareTab ] = useState('shortcode');

	const changeCurrentShareTab = ( id ) => {
		setCurrentShareTab(id);
	}
	
	return (
        <div className="Share">
            <div className="shareTabs">
				{shareTabsData.map(function(item, i) {
					return <div key={i} className="shareTabs-element" style={{cursor: 'pointer'}} onClick={() => {
						changeCurrentShareTab(item.id);
					}}>
								<div className="shareTabs-element-title">
									<h3>{item.name}</h3>
									<p>{item.description}</p>
								</div>
								{item.id === currentShareTab && <img src={require('../Build/BuildImages/arrowRight.png')}></img> }
							</div>
				})}
				
			</div>
			<div className="shareTabContent">
				<div className="shareTabContentContainer">
					{getCurrentTabContent( currentShareTab )}
				</div>
			</div>
        </div>
    );
}
