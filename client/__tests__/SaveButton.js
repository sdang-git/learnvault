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
      loggedInUser: '5ef3f1798a8800471b987bbe',
      id: '5eee5bac1e986de551d57488',
    };

    beforeAll(() => {
      wrapper = shallow(<SaveButton loggedInUser={props.loggedInUser} id={props.id} />);
    });

    it('Renders a <button> tag with the label "Save Collection"', () => {
      expect(wrapper.type()).toEqual('button');
      expect(wrapper.text()).toMatch('Save Collection');
    });
  });
});
