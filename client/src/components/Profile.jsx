import React, { useState, useEffect } from 'react';

const RenderProfile = ({user}) =>(<>
{console.log('data::::',user)}
  <h2>User Name: {user.username}</h2>
  <h2>Email: {user.email }</h2>
</>);
const Profile =  ( {loggedInUser} ) => {

console.log('loggedInUser',loggedInUser);

const [user, setUser]=useState({
  username:'',
  email:'',
});
const [data, setData] = useState({
 
  likesTitle:'',
  likesText:'',
  likesAuthor:'',
  category:'',
  text:'',
  category:'',
  tags:'',
  links:''
});


  useEffect(() => {
    console.log('useEffect()');
        fetch(`/api/user/profile?_id=${loggedInUser}`)
        .then((res) => res.json())
        .then((result) => {
           console.log('!!!Profile---result', result);
           setUser({
            ...user,
            username: result.username,
            email: result.email
          });
          console.log('user',user);
        });

    fetch('/api/collections')
      .then((res) => res.json())
      .then((result) => {
      
        let yourLikes=result.reduce((acc, val) => {
          if(val.likes.indexOf(loggedInUser)>-1){
            acc.push([val]);

            setData({
              ...data,
              username:'',
  email:'',
                likesTitle:val.title,
                likesText:val.description,
                likesAuthor:val.author,
                category:val.category,
                text:val.text,
                tags:val.tags,
            });
            
          }
          return acc;
      }, [])
       // console.log('yourLikes', yourLikes);


        // setData({
        //   ...data,
        //   likesTitle:val.title,
        //   likesText:val.description,
        //   likesAuthor:val.author,
        //   category:val.category,
        //   text:val.text,
        //   tags:val.tags,
        // });
//       const { 
//         likesTitle,
//         likesText,
//         likesAuthor,
//         category,
//         text,
//         tags,
//        } = data;
        
// console.log('d',likesTitle,
// likesText,
// likesAuthor,
// category,
// text,
// tags);
//       });
       return;
  });
  }, []);
 
return (  
  <div className="profile">
  {loggedInUser ? <RenderProfile {...user} /> : `please <a href="/login">relogin</a>`  
  }
 </div>
 );

};

export default Profile;
