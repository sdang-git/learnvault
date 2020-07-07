/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageNotFound from '../src/components/PageNotFound';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('PageNotFound', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<PageNotFound />);
    });

    it('Renders the PageNotFound component correctly', () => {
      expect(wrapper.text()).toMatch('Page not found');
    });
  });
});
