/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LikeButton from '../src/components/collections/LikeButton';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('LikeButton', () => {
    let wrapper;
    const props = {
      loggedInUser: '5ef3f1798a8800471b987bbe', // userId
      id: '5eee5bac1e986de551d57488', // collectionId
    };

    // const originalFetch = global.fetch;

    beforeAll(() => {
      wrapper = shallow(<LikeButton loggedInUser={props.loggedInUser} id={props.id} />);
    });

    // afterAll(() => {
    //   global.fetch = originalFetch;
    // });

    it('Renders a <button> tag with the label "Like Collection"', () => {
      expect(wrapper.type()).toEqual('button');
      expect(wrapper.text()).toMatch('Like Collection');
    });

    it('Invokes the click handler when the Like button is pressed', () => {
      const mockFetch = jest.fn(() => Promise.resolve({
        status: 200,
        json: () => ['5ef2b8c3d5973033a191aea2', '5ef3f1798a8800471b987bbe'],
      }));
      global.fetch = mockFetch;
      wrapper.find('.button-like').simulate('click');
      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch.mock.calls.length).toBe(1);

      const arg1 = `/api/collections/like/${props.id}`;
      const arg2 = {
        body: JSON.stringify({ id: props.loggedInUser, collectionId: props.id }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      };
      expect(mockFetch).toHaveBeenCalledWith(arg1, arg2);
    });

    it('Invokes the click handler when the Like button is pressed (error path)', () => {
      const mockFetch = jest.fn(() => Promise.reject(new Error('should catch this error')));
      global.fetch = mockFetch;
      wrapper.find('.button-like').simulate('click');
    });
  });
});
