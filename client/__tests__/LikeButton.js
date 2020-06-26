import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LikeButton from '../src/components/collections/LikeButton';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('LikeButton', () => {
    let wrapper;
    const props = {
      loggedInUser: '5ef3f1798a8800471b987bbe',
      id: '5eee5bac1e986de551d57488',
    };

    beforeAll(() => {
      wrapper = shallow(<LikeButton {...props} />);
    });

    it('Renders a <button> tag with the label "Like Collection"', () => {
      expect(wrapper.type()).toEqual('button');
      expect(wrapper.text()).toEqual('Like Collection');
    });
  });
});
