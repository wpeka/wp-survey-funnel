/**
 * ShowBoard JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/Components/Build
 */

import React from 'react';
import { useContext } from 'react';
import Card from './Card';
import { BuildContext } from '../Context/BuildContext';

// showBoard shows the list of cards present.
//Phpcs doesn't support ReactJS and Phpcbf messes the code,so we cant use it.
// @codingStandardsIgnoreStart
function ShowBoard( { itemType } ) {
	const { List }      = useContext( BuildContext );
	return (
		<div className = "showBoard">
			{List[itemType].map(
				function( item, index ) {
					return <Card key = {item.id} index = {index} id = {item.id} text = {item.title} item = {item} currentlySaved = {true} > </Card> ;
				}
			)}
		</div>
	);
}
// @codingStandardsIgnoreEnd

export default ShowBoard;
