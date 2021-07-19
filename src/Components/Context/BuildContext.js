import { createContext, Component } from "react";

export class BuildContextProvider extends Component {
	
	state = {
		counter: 0,
	};

	updateCounter = () => {
		this.setState({
			counter: this.state.counter + 1,
		})
	}
	
	render() {
		return(
			<BuildContext.Provider
                value={{ ...this.state, updateCounter: this.updateCounter }}
            >
                {this.props.children}
            </BuildContext.Provider>
		)
	}
}

export const BuildContext = createContext();