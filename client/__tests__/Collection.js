import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Collection from '../src/components/collections/Collection.jsx';

configure({ adapter: new Adapter() });

describe('Collection tests', () => {
  describe('Collection', () => {
    let wrapper;
    const props = {
      key: 544,
      id: 4354,
      title: 'Collection',
      description: 'buncha stuff',
      author: 'Veronica',
      loggedInUser: 'Sarge',
    };

    beforeAll(() => {
      wrapper = shallow(<Collection {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders an h1 element that displays collection title', () => {
      expect(wrapper.find('h1').text()).toMatch(props.title);
    });

    it('renders an h3 element that displays collection description', () => {
      expect(wrapper.find('h3').text()).toMatch(props.description);
    });

    it('displays div with name of author', () => {
      expect(wrapper.find('div').first().text()).toMatch(props.author);
    });

    // test link to view collection
  });
});
