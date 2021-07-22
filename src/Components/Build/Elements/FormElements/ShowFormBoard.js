import React from 'react';
import Card from './Card';

function ShowBoard( { List, editList, deleteFromList, moveCard } ) {
	return (
		<div className="showBoard">
			{List.map(function( item, index ) {
				return <Card moveCard={moveCard} key={item.id} index={index} id={item.id} text={item.name} item={item} editList={editList} deleteFromList={deleteFromList}></Card>;
			})}
		</div>
	);
}

export default ShowBoard;