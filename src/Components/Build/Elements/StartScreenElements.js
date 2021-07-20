import React, { Fragment, useContext, useState, useEffect } from "react";
import { BuildContext } from "../../Context/BuildContext";
import { ModalContext } from "../../Context/ModalContext";

export class CoverPage extends React.Component {
    
    state = {
        button: '',
    }

    handleChange = (event) => {
        this.setState({
            button: event.target.value,
        });
    }

    componentDidMount() {
        const { currentElement } = this.props;
        if ( currentElement?.button && currentElement.button !== '' ) {
            this.setState({
                button: currentElement.button
            })
        }
    }

    render() {
        return (
            <Fragment>
                <label>button</label>
                <input type="text" name="button" value={this.state.button} onChange={this.handleChange} />
            </Fragment>
        )
    }
    
}
