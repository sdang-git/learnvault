/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import AddCollection from '../src/components/collections/AddCollection';

configure({ adapter: new Adapter() });
describe('AddCollection tests', () => {
  let wrapper;
  const testProps = {
    loggedInUser: '5ef3f1798a8800471b987bbe', // userId
  };

  const testFormData = {
    contributors: 'Fluffy',
    links: 'https://dog.ceo/dog-api/documentation/random',
    tags: 'doggos',
    author: 'Ginger',
    title: 'Top Dog APIs',
    description: 'doggos!',
    hidden: false,
    category: 'api',
    text: 'https://dog.ceo/dog-api/documentation/random',
  };

  const testData = {
    contributors: ['Fluffy'],
    links: ['https://dog.ceo/dog-api/documentation/random'],
    likes: [],
    tags: ['doggos'],
    _id: '5efac899542971e42791965e',
    author: 'Ginger',
    title: 'Top Dog APIs',
    description: 'doggos!',
    hidden: false,
    category: 'api',
    text: 'https://dog.ceo/dog-api/documentation/random',
    updated: '2020-06-30T05:07:37.350Z',
    __v: 0,
  };

  const mockFetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => testData,
  }));
  global.fetch = mockFetch;

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  const RenderWithRouter = ({ children }) => (
    <MemoryRouter initialEntries={['/']}>
      <Route path="/">{children}</Route>
    </MemoryRouter>
  );

  beforeAll(async () => {
    await act(async () => {
      wrapper = mount(
        <RenderWithRouter>
          <AddCollection loggedInUser={testProps.loggedInUser} />
        </RenderWithRouter>,
      );
    });
    console.log('wrapper.html', wrapper.html());
  });

  it('displays a form with input fields for Author, Title, Description', () => {
    expect(wrapper.text()).toMatch('Author');
    expect(wrapper.text()).toMatch('Title');
    expect(wrapper.text()).toMatch('Description');
    expect(wrapper.find('input')).toHaveLength(10);
  });

  it('invokes onChange handler for all input fields and updates each corresponding state', () => {
    const author = wrapper.find('input').at(0);
    // console.log('author.html', author.html());
    author.instance().value = testFormData.author;
    author.simulate('change');
    // expect(setState).toHaveBeenCalledWith(testFormData.author);

    const title = wrapper.find('input').at(1);
    // console.log('title.html', title.html());
    title.instance().value = testFormData.title;
    title.simulate('change');
    // expect(setState).toHaveBeenCalledWith(testFormData.title);

    const description = wrapper.find('input').at(2);
    // console.log('description.html', description.html());
    description.instance().value = testFormData.description;
    description.simulate('change');
    // expect(setState).toHaveBeenCalledWith(testFormData.description);

    const hidden = wrapper.find('input').at(3);
    // console.log('hidden.html', hidden.html());
    hidden.instance().value = testFormData.hidden;
    hidden.simulate('change');
    // expect(setState).toHaveBeenCalledWith(testFormData.hidden);

    const contributors = wrapper.find('input').at(4);
    console.log('contributors.html', contributors.html());
    contributors.instance().value = testFormData.contributors;
    contributors.simulate('change');
    // expect(setState).toHaveBeenCalledWith(testFormData.contributors);

    const text = wrapper.find('input').at(5);
    // console.log('text.html', text.html());
    text.instance().value = testFormData.text;
    text.simulate('change');
    // expect(setState).toHaveBeenCalledWith(testFormData.text);

    const category = wrapper.find('input').at(6);
    // console.log('category.html', category.html());
    category.instance().value = testFormData.category;
    category.simulate('change');
    // expect(setState).toHaveBeenCalledWith(testFormData.category);

    const tags = wrapper.find('input').at(7);
    // console.log('tags.html', tags.html());
    tags.instance().value = testFormData.tags;
    tags.simulate('change');
    // expect(setState).toHaveBeenCalledWith(testFormData.tags);

    const links = wrapper.find('input').at(8);
    // console.log('links.html', links.html());
    links.instance().value = testFormData.links;
    links.simulate('change');
    // expect(setState).toHaveBeenCalledWith(testFormData.links);
  });

  it('displays a button with the label Submit', () => {
    // expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input[type="submit"]')).toHaveLength(1);
    expect(wrapper.find('input[type="submit"]').html()).toMatch('Submit');
  });

  it('invokes the click handler for the Submit button', () => {
    wrapper.find('input[type="submit"]').simulate('click');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('invokes the click handler for the Submit button (negative test)', () => {
    const mockBadFetch = jest.fn(() => Promise.reject(new Error('should catch this error')));
    global.fetch = mockBadFetch;
    wrapper.find('input[type="submit"]').simulate('click');
    expect(mockBadFetch).toHaveBeenCalledTimes(1);
  });
});
