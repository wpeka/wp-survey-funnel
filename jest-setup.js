import '@testing-library/jest-dom';
import { configure  } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { enableFetchMocks } from 'jest-fetch-mock'
import "@testing-library/jest-dom/extend-expect";

enableFetchMocks();

configure({adapter: new Adapter()});