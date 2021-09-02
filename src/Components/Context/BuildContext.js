import React from 'react';
import update from 'immutability-helper';
import { ItemTypes } from '../../Data';
import fetchData from '../../HelperComponents/fetchData';

export class BuildContextProvider extends React.Component {
    state = {
        List: {
			[ItemTypes.START_ELEMENTS]: [],
			[ItemTypes.CONTENT_ELEMENTS]: [],
            [ItemTypes.RESULT_ELEMENTS]: [],
		},
        title: ''
    };

    componentDidMount() {
        const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_get_build_data',
            post_id
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData( ajaxURL, data )
        .then(data => {
            if ( data.data.build !== '' ) {
                let build = JSON.parse(data.data.build);
                let title = data.data.post_title;
                this.setState( {
                    ...build,
                   title
                } );
            }
            else {
                let title = data.data.post_title;
                this.setState( {
                   title
                } );
            }
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

    saveData = (e) => {
        e.target.classList.add('surveyfunnel-lite-button-loading');
        const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            state: JSON.stringify( { ...this.state } ),
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_save_build_data',
            post_id,
            post_title: this.state.title
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData(ajaxURL, data)
        .then(data => {
            e.target.classList.remove('surveyfunnel-lite-button-loading');
        });
    }

    handleChangeTitle = ( title ) => {
        this.setState({
            title
        });
    }

    render() {
        return (
            <BuildContext.Provider
                value={{ ...this.state, addToList: this.addToList, getCount: this.getCount, editList: this.editList, deleteItemInList: this.deleteItemInList, moveCard: this.moveCard, generateId: this.generateId, saveData: this.saveData, handleChangeTitle: this.handleChangeTitle }}
            >
                {this.props.children}
                
            </BuildContext.Provider>
        );
    }
}
  
export const BuildContext = React.createContext();