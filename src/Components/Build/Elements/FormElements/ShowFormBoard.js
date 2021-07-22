import React from 'react';
import Card from './Card';

function ShowBoard( { List } ) {
	return (
		<div className="showBoard">
			{List.map(function( item, index ) {
				return <Card key={item.id} index={index} id={item.id} text={item.name} item={item} currentlySaved={true}></Card>;
			})}
		</div>
	);
}

export default ShowBoard;