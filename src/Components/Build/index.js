import { BuildContext } from '../Context/BuildContext';
import '../../scss/Build.scss';
import '../../scss/survey.scss';
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

	const { saveData, title } = useContext(BuildContext);
	const { setCurrentElement, setShowModal } = useContext( ModalContext );
	
	const changeTitle = () => {
		setCurrentElement({
			title: title,
			componentName: 'postTitle',
		});
		setShowModal(true);
	}

	return (
		<>
		<div className="wpsf-build-container">
			<div className="wpsf-build-container-menu">
				<div className="wpsf-build-eles">
					<div className="wpsf-build-text">
						<h2>Survey‌ ‌Builder‌</h2>
						<p>Drag‌ ‌and‌ ‌Drop‌ ‌elements‌ ‌to‌ ‌the‌ ‌right‌ ‌to‌ ‌start‌ ‌creating‌ ‌your‌ ‌survey‌</p>
					</div>
					<div className="wpsf-build-elements">
						<div className="wpsf-build-elements_start">
							<h3>Start Screen:</h3>
							<div className="wpsf-build-elements_container">
								{buildElements.startScreen.map(function( ele, i ) {
									return <BuildElement ele={ele} key={i}></BuildElement>
								})}
							</div>
						</div>
						<div className="wpsf-build-elements_content">
							<h3>Survey‌ ‌Elements‌ ‌(NR):‌</h3>
							<div className="wpsf-build-elements_container">
								{buildElements.contentElements.map(function( ele, i ) {
									return <BuildElement ele={ele} key={i}></BuildElement>
								})}
							</div>
						</div>
						<div className="wpsf-build-elements_results">
							<h3>Results Screen:</h3>
							<div className="wpsf-build-elements_container">
								{buildElements.resultScreen.map(function( ele, i ) {
									return <BuildElement ele={ele} key={i}></BuildElement>
								})}
							</div>
						</div>
					</div>
				

				</div>
				<div className="wpsf-build-elements-save">
							<button className="wpsf-build-elements-save-button" onClick={saveData}>Save</button>
				</div>
			</div>
			<div className="wpsf-build-content">
				<div className="wpsf-build-content-title-container">
					<h2>{title?title:'no name'}</h2>
					<button className="wpsf-build-content-title-edit" type="button" onClick={changeTitle}><img src={require('./BuildImages/pencil.png')}></img></button>
					<div>
						<p>basic</p>
					</div>
				</div>
				{dropBoard.map(function( ele, i ) {
					return <DropBoard ele={ele} key={i}></DropBoard>
				})}
			</div>
			<ModalContainer />
		</div>
		</>
	)
}
