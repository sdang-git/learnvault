/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route, useParams } from 'react-router-dom';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExpandedCollection from '../src/components/collections/ExpandedCollection';

configure({ adapter: new Adapter() });

// This test is NOT functional yet - fetch request does not work

describe('ExpandedCollection tests', () => {
  let wrapper;
  const props = {
    loggedInUser: '5ef3f1798a8800471b987bbe', // userId
    id: '5eee5bac1e986de551d57488', // collectionId
  };

  jest.mock('react-router-dom', () => ({
    useParams: jest.fn().mockReturnValue({ id: '123' }),
  }));

  mount(
    <MemoryRouter>
      <Route exact path="/:id" component={ExpandedCollection} />
    </MemoryRouter>
  );

  beforeAll(() => {
    const mockFetch = jest.fn(() => Promise.resolve({}));
    global.fetch = mockFetch;
    wrapper = shallow(<ExpandedCollection loggedInUser={props.loggedInUser} />);
    expect(mockFetch).toHaveBeenCalled();
  });

  console.log('wrapper', wrapper);
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
