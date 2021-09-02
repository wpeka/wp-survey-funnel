import { useDrag } from "react-dnd";
import { useContext, useState } from "react";
import { ModalContext } from "../Context/ModalContext";
import { BuildContext } from "../Context/BuildContext";
import { ItemTypes } from "../../Data";

export default function BuildElement({ ele }) {
    const { setCurrentElement, setShowModal } = useContext( ModalContext );
    const { List } = useContext( BuildContext );
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ele.itemType,
        item: ele,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {          
                setCurrentElement(ele);
                setShowModal(true);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    const opacity = isDragging ? 0.4 : 1;
    const getDragRef = () => {
        if ( ele.itemType === ItemTypes.START_ELEMENTS ) {
            if ( List.START_ELEMENTS.length >= 1 ) {
                return null;
            }
        }
        return drag;
    }
    return (
            <div
                ref={getDragRef()}
                role="BuildElement"
                style={{ opacity }}
                data-testid={`buildelement-${name}`}
				className="surveyfunnel-lite-build-elements_box"
            >
                <img src={require(`./BuildImages/${ele.componentName}.png`)} className={`surveyfunnel-lite-build-${ele.itemType}-img`}></img>
                <p>{ele.name}</p>
        </div>
    );
};
