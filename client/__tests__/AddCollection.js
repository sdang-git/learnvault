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

  it('displays a form with input fields for Title, Description', () => {
    expect(wrapper.text()).toMatch('Add New Collection');
    expect(wrapper.text()).toMatch('Title');
    expect(wrapper.text()).toMatch('Description');
    expect(wrapper.find('input')).toHaveLength(8);
  });

  it('invokes onChange handler for all input fields and updates each corresponding state', () => {
    const title = wrapper.find('input[name="title"]');
    // console.log('title.html', title.html());
    // title.instance().value = testFormData.title;
    // title.simulate('change');
    const event = {
      preventDefault() {},
      target: { value: testFormData.title },
    };
    act(() => {
      title.props().onChange(event);
    });
    // expect(setState).toHaveBeenCalledWith(testFormData.title);

    const description = wrapper.find('input[name="description"]');
    // console.log('description.html', description.html());
    // description.instance().value = testFormData.description;
    // description.simulate('change');
    event.target.value = testFormData.description;
    act(() => {
      description.props().onChange(event);
    });
    // expect(setState).toHaveBeenCalledWith(testFormData.description);

    const hidden = wrapper.find('input[name="hidden"]');
    // console.log('hidden.html', hidden.html());
    // hidden.instance().value = testFormData.hidden;
    // hidden.simulate('change');
    event.target.name = 'hidden';
    event.target.value = testFormData.hidden;
    act(() => {
      hidden.props().onChange(event);
    });
    // expect(setState).toHaveBeenCalledWith(testFormData.hidden);

    const contributors = wrapper.find('input[name="contributors"]');
    console.log('contributors.html', contributors.html());
    // contributors.instance().value = testFormData.contributors;
    // contributors.simulate('change');
    event.target.value = testFormData.contributors;
    act(() => {
      contributors.props().onChange(event);
    });
    // expect(setState).toHaveBeenCalledWith(testFormData.contributors);

    const text = wrapper.find('input[name="text"]');
    // console.log('text.html', text.html());
    // text.instance().value = testFormData.text;
    // text.simulate('change');
    event.target.value = testFormData.text;
    act(() => {
      text.props().onChange(event);
    });
    // expect(setState).toHaveBeenCalledWith(testFormData.text);

    const category = wrapper.find('input[name="category"]');
    // console.log('category.html', category.html());
    // category.instance().value = testFormData.category;
    // category.simulate('change');
    event.target.value = testFormData.category;
    act(() => {
      category.props().onChange(event);
    });
    // expect(setState).toHaveBeenCalledWith(testFormData.category);

    const tags = wrapper.find('input[name="tags"]');
    // console.log('tags.html', tags.html());
    // tags.instance().value = testFormData.tags;
    // tags.simulate('change');
    event.target.value = testFormData.tags;
    act(() => {
      tags.props().onChange(event);
    });
    // expect(setState).toHaveBeenCalledWith(testFormData.tags);

    const links = wrapper.find('input[name="link-0"]');
    // console.log('links.html', links.html());
    // links.instance().value = testFormData.links;
    // links.simulate('change');
    event.target.value = testFormData.links;
    act(() => {
      links.props().onChange(event);
    });
    // expect(setState).toHaveBeenCalledWith(testFormData.links);

    const addLink = wrapper.find('#add-link');
    act(() => {
      addLink.props().onClick(event);
    });
  });

  it('displays a button with the label Submit', () => {
    // expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    expect(wrapper.find('button[type="submit"]').html()).toMatch('Submit');
  });

  it('invokes the click handler for the Submit button', () => {
    const event = {
      preventDefault() {},
    };
    const submitButton = wrapper.find('button[type="submit"]');
    act(() => {
      submitButton.props().onClick(event);
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('invokes the click handler for the Submit button (negative test)', () => {
    const mockBadFetch = jest.fn(() => Promise.reject(new Error('should catch this error')));
    global.fetch = mockBadFetch;
    const event = {
      preventDefault() {},
    };
    const submitButton = wrapper.find('button[type="submit"]');
    act(() => {
      submitButton.props().onClick(event);
    });
    expect(mockBadFetch).toHaveBeenCalledTimes(1);
  });
});
