import { useDrag } from "react-dnd";
import { useContext, useState } from "react";

export default function BuildFormElement({ ele, setCurrentFormElement, addToList }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ele.itemType,
        item: ele,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {          
                setCurrentFormElement(item);
                addToList(item);
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
				className="surveyfunnel-lite-form-elements_box"
            >
                <img src={require(`../../BuildImages/${ele.componentName}.png`)} className={`surveyfunnel-lite-build-${ele.itemType}-img`}></img>
                <p>{ele.name}</p>
        </div>
    );
};
