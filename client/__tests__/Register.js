/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// import { MemoryRouter, Route } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Register from '../src/components/Register';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('Register Form', () => {
    let wrapper;
    const props = {
      loggedInUser: '5ef3f1798a8800471b987bbe',
    };

    // jest.mock('react-router-dom', () => ({
    //   useParams: jest.fn().mockReturnValue({ userId: '123' }),
    // }));

    // mount(
    //   <MemoryRouter initialEntries={['/1231']}>
    //     <Route exact path="/:userId" component={AllCollections} />
    //   </MemoryRouter>,
    // );

    beforeAll(() => {
      wrapper = shallow(<Register loggedInUser={props.loggedInUser} />);
    });

    it('Register component should have correct number and types of inputs', () => {
      // console.log('Register wrapper', wrapper.html());
      // console.log('Register wrapper', wrapper.text());
      expect(wrapper.find('input')).toHaveLength(5);
      expect(wrapper.find('input').at(0).is('[type="text"]')).toEqual(true);
      expect(wrapper.find('input').at(1).is('[type="text"]')).toEqual(true);
      expect(wrapper.find('input').at(2).is('[type="password"]')).toEqual(true);
      expect(wrapper.find('input').at(3).is('[type="password"]')).toEqual(true);
      expect(wrapper.find('input').at(4).is('[type="submit"]')).toEqual(true);
    });

    it('Invokes the click handler for the Register input button', () => {
      // const mockFetch = jest.fn(() => Promise.resolve({
      //   status: 200,
      //   json: () => ({
      //     registrationSuccessful: true,
      //     userId: '5ef7840ba4aca16282b26299',
      //   }),
      // }));
      // global.fetch = mockFetch;
      wrapper.find('.submit-form').simulate('click', {
        preventDefault: () => {},
      });
      // wrapper.find('.submit-form').simulate('submit');
      // wrapper.find('.submit-form').simulate('click');
      // expect(mockFetch).toHaveBeenCalled();
      // expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });
});
