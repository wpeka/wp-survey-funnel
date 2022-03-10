import React from 'react';
import Card from './Card';

function ShowBoard( {ele, editList, deleteFromList, moveCard,getList} ) {
	const List=getList();
	// console.log("I am showboard");
	console.log(List);
	return (
		<div className="showBoard">
			{List.map(function( item, index ) {
				if(ele.title==item.title)
				return <Card  moveCard={moveCard} key={item.id} index={index} id={item.id} text={item.name} item={item} editList={editList} deleteFromList={deleteFromList}></Card>;
			})}
		</div>
	);
}

export default ShowBoard;