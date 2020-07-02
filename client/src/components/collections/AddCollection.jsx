import React, { useState } from 'react';

import './AddCollection.css';

const AddCollection = () => {
  const linkField = { link: '' };
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hidden, setHidden] = useState(false);
  const [contributors, setContributors] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [links, setLinks] = useState('');
  // this is for link input fields
  const [linkInput, setLinkInput] = useState([{ ...linkField }]);
  let tempLinks = '';

  // Add new link field to form so you can add multiple links
  const addLinkField = () => {
    setLinkInput([...linkInput, { ...linkField }]);
  };

  // Goes through all links in different link fields and puts them together into one string
  const addLinks = () => {
    // Go through the link inputs (minus 1)
    for (let i = 0; i < linkInput.length - 1; i++) {
      // Add value of input field (plus a comma and space) to temp variable
      tempLinks += document.getElementById(`link-${i}`).value;
      tempLinks += ', ';
    }
    // Add last link (doesn't need comma after it)
    tempLinks += document.getElementById(`link-${linkInput.length - 1}`).value;
    // Set links state with the new temporary variable string
    setLinks(tempLinks);
  };

  const addCollection = (e) => {
    e.preventDefault();
    // Supposed to put links together before fetch request - Couldn't get async to work for this
    // Needs work. new state does not seem to be available when fetch request is made
    addLinks();
    fetch('/api/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author,
        title,
        description,
        hidden,
        contributors,
        text,
        category,
        tags,
        links,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response: ', data);
        console.log('Links: ', links);
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
          <input
            type="text"
            name="author"
            required
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
        <br />
        <label>
          Hidden:
          <input
            type="checkbox"
            name="hidden"
            onChange={() => setHidden(!hidden)}
            value={hidden}
          />
        </label>
        <br />
        <label>
          Contributors:
          <input
            type="text"
            name="contributors"
            onChange={(e) => setContributors(e.target.value)}
            value={contributors}
          />
        </label>
        <br />
        <label>
          Text:
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </label>
        <br />
        <label>
          Tags:
          <input
            type="text"
            name="tags"
            onChange={(e) => setTags(e.target.value)}
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
                <input type="text" name={link} id={link} />
              </label>
            </div>
          );
        })}
        <button type="button" id="add-link" onClick={addLinkField}>
          +
        </button>
        <br />
        <button type="submit" onClick={addCollection}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCollection;
