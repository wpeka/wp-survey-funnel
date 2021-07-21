import { BuildContext } from '../Context/BuildContext';
import '../../scss/Build.scss';
import BuildElement from './BuildElement';
import { buildElements, dropBoard } from '../../Data';
import DropBoard from './DropBoard';
import ModalBox from './ModalBox';
import { useContext } from 'react';
import { ModalContextProvider, ModalContext } from '../Context/ModalContext';

class ModalContainer extends React.Component {
	static contextType = ModalContext;

	render() {
		const { getShowModal } = this.context;
		return(
			<div>
				{getShowModal() && <ModalBox />}
			</div>
		)
	}
}

export default function Build() {

	const { saveData } = useContext(BuildContext);

	return (
		<ModalContextProvider>
		<div className="build-container">
			<div className="build-eles">
				<div className="build-text">
					<p>Content Builder</p>
					<p>Drag and drop contents to the right</p>
				</div>
				<div className="build-elements">
					<div className="build-elements_start">
						Start Screen:
						{buildElements.startScreen.map(function( ele, i ) {
							return <BuildElement ele={ele} key={i}></BuildElement>
						})}
					</div>
					<div className="build-elements_content">
						Content Elements:
						{buildElements.contentElements.map(function( ele, i ) {
							return <BuildElement ele={ele} key={i}></BuildElement>
						})}
					</div>
					<div className="build-elements_results">
						Result Screen:
						{buildElements.resultScreen.map(function( ele, i ) {
							return <BuildElement ele={ele} key={i}></BuildElement>
						})}
					</div>
				</div>
			</div>
			<div className="build-content">
				{dropBoard.map(function( ele, i ) {
					return <DropBoard ele={ele} key={i}></DropBoard>
				})}
			</div>
			<ModalContainer />
		</div>
		<button onClick={saveData}>saveData</button>
		</ModalContextProvider>
	)
}
