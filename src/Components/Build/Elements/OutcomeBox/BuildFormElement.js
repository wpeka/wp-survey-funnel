import { useDrag } from "react-dnd";
import { useContext, useState } from "react";
import '../../../../assets/css/bootstrap.min.css';

export default function BuildFormElement({ ele, setCurrentFormElement, addToList }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'Outcome',
        item: ele,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {          
                // setCurrentFormElement(item);
                // addToList(item);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    // console.log(collectedProps);
    const opacity = isDragging ? 0.4 : 1;
    return (
            <div
                ref={drag}
                role="BuildElement"
                style={{ opacity }}
                // data-testid={`buildelement-${name}`}
				className="surveyfunnel-lite-form-elements_box"
            >
                <img src={require(`../../BuildImages/pencil.png`)} className={`surveyfunnel-lite-build-pencil-img`}></img>
                <p>{ele.key}</p>
                <p>{ele.name}</p>
        </div>
    );
};
