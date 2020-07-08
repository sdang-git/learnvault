import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import {
  TextField, Button, InputLabel, InputAdornment, IconButton, OutlinedInput, FormControl, makeStyles,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import './AddCollection.css';
import ResultAlert from '../ResultAlert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '40ch',
  },
}));

const AddCollection = ({ loggedInUser }) => {
  const classes = useStyles();
  const linkField = { link: '' };

  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    author: loggedInUser,
    title: '',
    description: '',
    hidden: false,
    contributors: '',
    text: '',
    category: '',
    tags: '',
    links: '',
  });

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

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    setFormData({
      ...formData,
      hidden: checked,
    });
  };

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
          if (process.env.NODE_ENV === 'development'
          || process.env.NODE_ENV === 'test') {
            console.log('AddCollection successful!');
            console.log('result? ', result);
          }
          setResult('success');
          setTimeout(() => setRedirect(true), 2000);
        }
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development'
        || process.env.NODE_ENV === 'test') {
          console.log(err);
        }
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
          <br />
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <TextField id="outlined-required-title" name="title" label="Title" variant="outlined" onChange={(e) => updateForm(e)} />
          </FormControl>
          <br />
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <TextField id="outlined-required-description" name="description" label="Description" variant="outlined" onChange={(e) => updateForm(e)} />
          </FormControl>
          <br />
          <FormControl className={clsx(classes.margin)}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name="hidden"
                  color="primary"
                />
              )}
              label="Hidden"
            />
          </FormControl>
          <br />
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <TextField id="outlined-required-contributors" name="contributors" label="Contributors" variant="outlined" onChange={(e) => updateForm(e)} />
          </FormControl>
          <br />
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <TextField id="outlined-required-text" name="text" label="Text" variant="outlined" onChange={(e) => updateForm(e)} />
          </FormControl>
          <br />
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <TextField id="outlined-required-category" name="category" label="Category" variant="outlined" onChange={(e) => updateForm(e)} />
          </FormControl>
          <br />
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <TextField id="outlined-required-tags" name="tags" label="Tags" variant="outlined" onChange={(e) => updateForm(e)} />
          </FormControl>
          <br />
          {linkInput.map((val, idx) => {
            const link = `link-${idx}`;
            return (
              <div key={`link-${idx}`}>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                  <TextField id={`outlined-required-link-${idx}`} name={link} label="Link" variant="outlined" onChange={(e) => updateForm(e)} />
                </FormControl>
                <IconButton color="primary" id="add-link" aria-label="add link" component="span" className={classes.margin} onClick={addLinkField}>
                  <AddBoxIcon size="small" />
                </IconButton>
              </div>
            );
          })}
          <br />
          <Button onClick={addCollection} id="submit-button" variant="contained" color="primary">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default AddCollection;
