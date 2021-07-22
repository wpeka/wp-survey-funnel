import React from 'react';
import update from 'immutability-helper';
import { ItemTypes } from '../../Data';

const fetchData = async (url, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    return response.json();
}

export class BuildContextProvider extends React.Component {
    state = {
        List: {
			[ItemTypes.START_ELEMENTS]: [],
			[ItemTypes.CONTENT_ELEMENTS]: [],
            [ItemTypes.RESULT_ELEMENTS]: [],
		},
    };

    componentDidMount() {
        const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'wpsf_get_build_data',
            post_id
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData( ajaxURL, data )
        .then(data => {
            if ( data.data === '' ) {
                return;
            }
            let state = JSON.parse(data.data);
            this.setState( state );
        })
    }

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

    saveData = () => {
        const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            state: JSON.stringify( { ...this.state } ),
            security: ajaxSecurity,
            action: 'wpsf_save_build_data',
            post_id
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData(ajaxURL, data)
        .then(data => {
            console.log(data);
        });
    }

    render() {
        return (
            <BuildContext.Provider
                value={{ ...this.state, addToList: this.addToList, getCount: this.getCount, editList: this.editList, deleteItemInList: this.deleteItemInList, moveCard: this.moveCard, generateId: this.generateId, saveData: this.saveData }}
            >
                {this.props.children}
                
            </BuildContext.Provider>
        );
    }
}
  
export const BuildContext = React.createContext();