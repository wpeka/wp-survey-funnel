import React from 'react';
import update from 'immutability-helper';

export class BuildContextProvider extends React.Component {
    state = {
        List: {
			startScreen: [],
			contentElements: [],
			resultScreen: [],
		},
    };

    addToList = (data) => {
		let newState = JSON.parse(JSON.stringify({...this.state}));

		newState.List[data.type].push(data);
        this.setState(newState);
    }

    editList = ( data ) => {
        let newState = JSON.parse(JSON.stringify({...this.state}));

        let newList = newState.List[data.type].slice();
        for(let i = 0; i<newList.length; i++) {
            if(data.id === newList[i].id) {
                newList[i] = data;
                break;
            }
        }
        newState.List[data.type] = newList;
        this.setState(newState);
    }

    moveCard = (dragIndex, hoverIndex, data) => {
        const dragCard = this.state.List[data.type][dragIndex];
        const newList = this.state.List[data.type].slice();

        let newCardList = update(newList, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        });

        this.setState({
            List: {
                ...this.state.List,
                [data.type]: newCardList
            },
        });
    };

    deleteItemInList = ( data ) => {
        let newState = JSON.parse(JSON.stringify({...this.state}));

        let newList = newState.List[data.type].slice();
        for(let i = 0; i<newList.length; i++) {
            if(data.id === newList[i].id) {
                newList.splice(i, 1);
                break;
            }
        }
        newState.List[data.type] = newList;
        this.setState(newState);
    }

    generateId = () => {   
        return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);        
    }

    render() {
        return (
            <BuildContext.Provider
                value={{ ...this.state, addToList: this.addToList, getCount: this.getCount, editList: this.editList, deleteItemInList: this.deleteItemInList, moveCard: this.moveCard, generateId: this.generateId }}
            >
                {this.props.children}
            </BuildContext.Provider>
        );
    }
}
  
export const BuildContext = React.createContext();