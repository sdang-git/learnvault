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

    beforeAll(() => {
      wrapper = shallow(<SaveButton loggedInUser={props.loggedInUser} id={props.id} />);
    });

    it('Renders a <button> tag with the label "Save Collection"', () => {
      expect(wrapper.type()).toEqual('span');
      expect(wrapper.text()).toMatch('Save Collection');
    });

    it('Invokes the click handler when the Save button is clicked (success path)', () => {
      const mockFetch = jest.fn(() => Promise.resolve({
        status: 200,
        json: () => ['5ef2b8c3d5973033a191aea2', '5ef3f1798a8800471b987bbe'],
      }));
      global.fetch = mockFetch;

      wrapper.find('.button-like').props().onClick({ key: 'Enter' });
      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch).toHaveBeenCalledTimes(1);

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

    it('Invokes the click handler when the Save button is clicked (error path)', () => {
      const mockFetch = jest.fn(() => Promise.reject(new Error('should catch this error')));
      global.fetch = mockFetch;
      wrapper.find('.button-like').props().onClick({ key: 'Enter' });
    });

    it('Invokes the click handler when the Save button is keypressed (error path)', () => {
      const mockFetch = jest.fn(() => Promise.reject(new Error('should catch this error')));
      global.fetch = mockFetch;
      wrapper.find('.button-like').props().onKeyPress({ key: 'Enter' });
    });
  });
});
