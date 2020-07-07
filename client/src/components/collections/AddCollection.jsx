import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './AddCollection.css';
import ResultAlert from '../ResultAlert';

const AddCollection = (props) => {
  const linkField = { link: '' };

  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    author: props.loggedInUser,
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
    id,
  } = formData;

  const addCollection = (e) => {
    e.preventDefault();
    const temp = [];
    Object.keys(formData).forEach((key) => {
      if (key.indexOf('link') > -1 && key !== 'links') {
        temp.push(formData[key]);
        delete formData[key];
      }
      formData.links = String(temp);
    });
    fetch('/api/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log('AddCollection successful!');
          setResult('success');
          console.log('result? ', result);
          setTimeout(() => setRedirect(true), 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setResult('error');
      });
  };

  return (
    <div>
      {redirect ? <Redirect to="/" /> : null}
      {result !== null && <ResultAlert result={result} setResult={setResult} />}
      <div className="addCollection">
        <h1>Add New Collection</h1>
        <form>
          {/* <label>
            Author:
            <span className="label-note">(Required)</span>
            <input
              type="text"
              name="author"
              required
              onChange={(e) => updateForm(e)}
              value={author}
            />
          </label> */}
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
              onChange={(e) => updateForm(e)}
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
                    name={link}
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
          <br />
          <button type="submit" onClick={addCollection}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCollection;
