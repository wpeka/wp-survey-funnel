import React from 'react';
import update from 'immutability-helper';
import { ItemTypes } from '../../Data';
import fetchData from '../../HelperComponents/fetchData';
const { applyFilters } = wp.hooks;
export class BuildContextProvider extends React.Component {
	// buildContext state which contains List of questions, type, title, proActive or not.
    state = {
        List: {
			[ItemTypes.START_ELEMENTS]: [],
			[ItemTypes.CONTENT_ELEMENTS]: [],
            [ItemTypes.RESULT_ELEMENTS]: [],
		},
        title: '',
		type: '',
		proActive: false,
    };

	// after component mounted get build data.
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
				let type  = data.data.survey_type;
				let proActive = data.data.proActive;
                this.setState( {
                    ...build,
                   title,
				   type,
					proActive: proActive === '1' ? true : false
                } );
            }
            else {
                let title = data.data.post_title;
				let type  = data.data.survey_type;
                this.setState( {
                   title,
				   type
                } );
            }
        })
    }

	// add to list when question is newly created.
    addToList = (data) => {
		let newState = JSON.parse(JSON.stringify({...this.state}));

		newState.List[data.type].push(data);
        this.setState(newState);
    }

	// when question is being edited.
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

	// Card component uses this function in order to rearrage the cards.
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

	// to delete item in the list.
    deleteItemInList = ( data ) => {
        let newState = JSON.parse(JSON.stringify({...this.state}));
        let newList = newState.List[data.type].slice();
        for(let i = 0; i<newList.length; i++) {
            if(data.id === newList[i].id) {
                newList.splice(i, 1);
                break;
            }
        }
        newList = applyFilters('deleteItemInList', newList, data);
        newState.List[data.type] = newList;
        this.setState(newState);
    }

	// generate unique id for each question.
    generateId = () => {   
        return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);        
    }

	// saving data in the backend.
    saveData = (e) => {
        e.target.classList.add('surveyfunnel-lite-button-loading');
        const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
		const stateData = JSON.stringify( { ...this.state } );
		const hasProQuestions = stateData.match( /proVersionQuestionType/g ) ? true : false;
        const data = {
            state: JSON.stringify( { ...this.state } ),
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_save_build_data',
            post_id,
            post_title: this.state.title,
			hasProQuestions
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData(ajaxURL, data)
        .then(data => {
            e.target.classList.remove('surveyfunnel-lite-button-loading');
        });
    }

	// to handle title state change.
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