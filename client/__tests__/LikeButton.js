/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LikeButton from '../src/components/collections/LikeButton';

const sinon = require('sinon');

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('LikeButton', () => {
    let wrapper;
    const props = {
      loggedInUser: '5ef3f1798a8800471b987bbe',
      id: '5eee5bac1e986de551d57488',
    };

    beforeAll(() => {
      wrapper = shallow(<LikeButton loggedInUser={props.loggedInUser} id={props.id} />);
    });

    it('Renders a <button> tag with the label "Like Collection"', () => {
      expect(wrapper.type()).toEqual('button');
      console.log('wrapper.text', wrapper.text());
      console.log('wrapper.html', wrapper.html());
      console.log('wrapper.debug', wrapper.debug());
      expect(wrapper.text()).toMatch('Like Collection');
    });

    it('Invokes the click handler when the button is pressed', () => {
      wrapper = shallow(<LikeButton loggedInUser={props.loggedInUser} id={props.id} />);
      wrapper.find('.button-like').simulate('click');
    });
  });
});
