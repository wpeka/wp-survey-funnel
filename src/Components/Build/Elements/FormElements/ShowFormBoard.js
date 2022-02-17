/**
 * ShowFormBoard JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/Components/Build
 */

import React from 'react';
import Card from './Card';
// @codingStandardsIgnoreStart
//Phpcs doesn't support ReactJS and Phpcbf messes the code,so we cant use it.
function ShowBoard( { List, editList, deleteFromList, moveCard } ) {
	return (
		<div className = "showBoard" >
			{List.map(
				function( item, index ) {
					return <Card moveCard = {moveCard} key = {item.id} index = {index} id = {item.id} text = {item.name} item = {item} editList = {editList} deleteFromList = {deleteFromList} > </Card> ;
				}
			)}
		</div>
	);
}

export default ShowBoard;
// @codingStandardsIgnoreEnd
