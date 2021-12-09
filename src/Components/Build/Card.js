import React, { Component, useContext } from "react";
import { BuildContext } from "../Context/BuildContext";
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ModalContext } from "../Context/ModalContext";

const { applyFilters } = wp.hooks;

export default function (props) {
	// get the required data from buildContext or parent using props.
	const { deleteItemInList, moveCard, type, proActive } = useContext(BuildContext);
    const ref = useRef(null);
    const { id, text, index, item } = props;

	// this function is created in order to rearrange the cards in the List.
    const [{ handlerId }, drop] = useDrop({
        accept: 'card' + item.type,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
		// hover function when one card element is dragged and hovered on the other.
        hover(data, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = data.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex, item);

            data.index = hoverIndex;
        },
    });

	// cards useDrag in order to make them draggable.
    const [{ isDragging }, drag] = useDrag({
        type: 'card' + item.type,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const style = {
        opacity: isDragging ? 0 : 1,
        cursor: isDragging ? 'pointer' : 'move',
    }
    drag(drop(ref));

    const { setShowModal, setCurrentElement } = useContext(ModalContext);

	// this function is called when user tries to edit a card / question by clicking on edit button.
    const editCard = function() {
        setCurrentElement(item);
        setShowModal(true);
    }

    const conditionalLogicCard = function() {
        setCurrentElement({
            componentName: 'ConditionalLogic',
            data: item
        });
        setShowModal(true);
    }

    const deleteCard = function() {
        deleteItemInList( item );
    }
    
    return (
        <div ref={ref} style={style} className={(!proActive && ( item.componentName === 'TextElement' || item.componentName === 'ImageQuestion' )) ? 'card-disabled surveyfunnel-lite-card-area' : 'surveyfunnel-lite-card-area' }>
        {item.type === 'CONTENT_ELEMENTS' && <div className="surveyfunnel-lite-cardbox-number">
                {props.index + 1}
            </div>}
        <div className="cardBox" >
            <div className="surveyfunnel-lite-cardbox-title" >
                <img src={require(`./BuildImages/${item.componentName}.png`)}></img>
                <h3>{item.title}</h3>
            </div>

            <div className="card-flex">
				{item.type === 'RESULT_ELEMENTS' && applyFilters( 'scoringLogicCardFilter', '', item, type )}
                {item.type === 'CONTENT_ELEMENTS' && applyFilters('conditionalLogicCardFilter', '', conditionalLogicCard ) } 
                <button className="surveyfunnel-lite-cardBox-btn" onClick={editCard} disabled={!proActive && ( item.componentName === 'TextElement' || item.componentName === 'ImageQuestion' ) }><img src={require('./BuildImages/pencil.png')}></img></button>
                <button className="surveyfunnel-lite-cardBox-btn" onClick={deleteCard} disabled={!proActive && ( item.componentName === 'TextElement' || item.componentName === 'ImageQuestion' ) }><img src={require('./BuildImages/delete-icon.png')}></img></button>
            </div>
        </div>
        </div>
    );
}