import '@testing-library/jest-dom';
import { configure  } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { enableFetchMocks } from 'jest-fetch-mock'
import "@testing-library/jest-dom/extend-expect";


global.wp = {
	hooks: {
		applyFilters: function(num1, num2, callback) {},
		doAction: function(num1, num2, callback) {}
	}
}


enableFetchMocks();

configure({adapter: new Adapter()});