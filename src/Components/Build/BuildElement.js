import { useDrag } from "react-dnd";
import { useContext, useState } from "react";
import { ModalContext } from "../Context/ModalContext";

export default function BuildElement({ ele }) {
    const { setCurrentElement, setShowModal } = useContext( ModalContext );
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
    return (
            <div
                ref={drag}
                role="BuildElement"
                style={{ opacity }}
                data-testid={`buildelement-${name}`}
				className="build-elements_box"
            >
                {ele.name}
        </div>
    );
};
