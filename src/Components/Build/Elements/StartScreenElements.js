import React, { Fragment } from "react";

export const CoverPage = React.memo(class extends React.Component {
    
    state = {
        button: '',
    }

    handleChange = (event) => {
        this.setState({
            button: event.target.value,
        });
    }

    componentDidMount() {
        const { currentElement, choiceType } = this.props;
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
    
});
