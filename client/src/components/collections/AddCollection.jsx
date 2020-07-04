import React, { useState } from 'react';

import './AddCollection.css';

const AddCollection = () => {
  const linkField = { link: '' };
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    description: '',
    hidden: false,
    contributors: '',
    text: '',
    category: '',
    tags: '',
    links: '',
  });

  // this is for link input fields
  const [linkInput, setLinkInput] = useState([{ ...linkField }]);

  // Add new link field to form so you can add multiple links
  const addLinkField = () => {
    setLinkInput([...linkInput, { ...linkField }]);
  };

  const updateForm = (e) => {
    if (e.target.name === 'hidden') {
      setFormData({
        ...formData,
        hidden: !hidden,
      });
    } else if (e.target.name === 'link') {
      console.log('links state: ', links);
      let temp;
      e.target.id === 'link-0'
        ? (temp = `${e.target.value}`)
        : (temp = `${links}, ${e.target.value}`);
      console.log('temp: ', temp);
      setFormData({
        ...formData,
        links: temp,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const {
    author,
    title,
    description,
    hidden,
    contributors,
    text,
    category,
    tags,
    links,
  } = formData;

  const addCollection = (e) => {
    e.preventDefault();
    // const temp = [];
    // Object.keys(formData).forEach((key) => {
    //   if (key.indexOf('link') > -1 && key !== 'links') {
    //     temp.push(formData[key]);
    //     delete formData[key];
    //   }
    //   formData.links = String(temp);
    // });
    fetch('/api/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response: ', data);
      })
      .catch((err) => {
        console.log('Error on add collection', err);
      });
  };

  return (
    <div className="addCollection">
      <h1>Add New Collection</h1>
      <form>
        <label>
          Author:
          <span className="label-note">(Required)</span>
          <input
            type="text"
            name="author"
            required
            onChange={(e) => updateForm(e)}
            value={author}
          />
        </label>
        <br />
        <label>
          Title:
          <span className="label-note">(Required)</span>
          <input
            type="text"
            name="title"
            required
            onChange={(e) => updateForm(e)}
            value={title}
          />
        </label>
        <br />
        <label>
          Description:
          <span className="label-note">(Required)</span>
          <input
            type="text"
            name="description"
            required
            onChange={(e) => updateForm(e)}
            value={description}
          />
        </label>
        <br />
        <label>
          Hidden:
          <input
            type="checkbox"
            name="hidden"
            onChange={(e) => updateForm(e)}
            value={hidden}
          />
        </label>
        <br />
        <label>
          Contributors:
          <input
            type="text"
            name="contributors"
            onChange={(e) => updateForm(e)}
            value={contributors}
          />
        </label>
        <br />
        <label>
          Text:
          <input
            type="text"
            name="text"
            onChange={(e) => updateForm(e.target.value)}
            value={text}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            onChange={(e) => updateForm(e)}
            value={category}
          />
        </label>
        <br />
        <label>
          Tags:
          <input
            type="text"
            name="tags"
            onChange={(e) => updateForm(e)}
            value={tags}
          />
        </label>
        <br />
        {linkInput.map((val, idx) => {
          const link = `link-${idx}`;
          return (
            <div key={`link-${idx}`}>
              <label>
                Link:
                <input
                  type="text"
                  name="link"
                  id={link}
                  onChange={(e) => updateForm(e)}
                />
              </label>
              <button
                type="button"
                id="add-link"
                onClick={() => {
                  addLinkField();
                }}
              >
                +
              </button>
            </div>
          );
        })}
        {/* <button
          type="button"
          id="add-link"
          onClick={() => {
            addLinkField();
          }} */}
        {/* >
          +
        </button> */}
        <br />
        <button type="submit" onClick={addCollection}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCollection;
