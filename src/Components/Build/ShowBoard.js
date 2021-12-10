import React from 'react';
import { useContext } from 'react';
import Card from './Card';
import { BuildContext } from '../Context/BuildContext';

// showBoard shows the list of cards present.
function ShowBoard( { itemType } ) {
	const { List } = useContext(BuildContext);
	return (
		<div className="showBoard">
			{List[itemType].map(function( item, index ) {
				return <Card key={item.id} index={index} id={item.id} text={item.title} item={item} currentlySaved={true}></Card>;
			})}
		</div>
	);
}

export default ShowBoard;