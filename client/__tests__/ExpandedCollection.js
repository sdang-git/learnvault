/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExpandedCollection from '../src/components/collections/ExpandedCollection';

configure({ adapter: new Adapter() });

describe('ExpandedCollection tests', () => {
  let wrapper;
  const props = {
    loggedInUser: '5ef3f1798a8800471b987bbe',
  };

  jest.mock('react-router-dom', () => ({
    useParams: jest.fn().mockReturnValue({ userId: '123' }),
  }));

  mount(
    <MemoryRouter initialEntries={['/1234']}>
      <Route exact path="/:id" component={ExpandedCollection} />
    </MemoryRouter>
  );

  beforeAll(() => {
    wrapper = shallow(<ExpandedCollection loggedInUser={props.loggedInUser} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
