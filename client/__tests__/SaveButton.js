/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SaveButton from '../src/components/collections/SaveButton';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('SaveButton', () => {
    let wrapper;
    const props = {
      loggedInUser: '5ef3f1798a8800471b987bbe', // userId
      id: '5eee5bac1e986de551d57488', // collectionId
    };

    // const originalFetch = global.fetch;
    // const mockConsole = jest.spyOn(global.console, 'log').mockImplementation();

    beforeAll(() => {
      wrapper = shallow(<SaveButton loggedInUser={props.loggedInUser} id={props.id} />);
    });

    // afterAll(() => {
    //   global.fetch = originalFetch;
    // });

    it('Renders a <button> tag with the label "Save Collection"', () => {
      expect(wrapper.type()).toEqual('button');
      expect(wrapper.text()).toMatch('Save Collection');
    });

    it('Invokes the click handler when the Save button is pressed (success path)', () => {
      const mockFetch = jest.fn(() => Promise.resolve({
        status: 200,
        json: () => ['5ef2b8c3d5973033a191aea2', '5ef3f1798a8800471b987bbe'],
      }));
      global.fetch = mockFetch;

      // const mockConsole = jest.fn();
      // global.console = { log: mockConsole, error: mockConsole };

      const mockConsole = jest.spyOn(global.console, 'log').mockImplementation();

      wrapper.find('.button-like').simulate('click');
      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledTimes(1);
      // expect(mockFetch.mock.calls.length).toBe(1);
      expect(mockConsole).toHaveBeenCalled();

      const arg1 = `/api/collections/save/${props.id}`;
      const arg2 = {
        body: JSON.stringify({ id: props.loggedInUser, collectionId: props.id }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      };
      expect(mockFetch).toHaveBeenCalledWith(arg1, arg2);
    });

    it('Invokes the click handler when the Save button is pressed (error path)', () => {
      const mockFetch = jest.fn(() => Promise.reject(new Error('should catch this error')));
      global.fetch = mockFetch;
      wrapper.find('.button-like').simulate('click');
    });
  });
});
