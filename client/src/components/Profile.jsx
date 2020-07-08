import React, { useState, useEffect } from 'react';

const RenderUser = (user) =>(<>
  <h2>User Name: {user.username}</h2>
  <h2>Email: {user.email }</h2>
</>);

const RenderInfo = ({data}) =>(
<>  
  <div>
    {data.likesTitle !=''? <h4>likesTitle:{data.likesTitle}</h4>: null}
    {data.likesText !=''? <h4>likesText:{data.likesText}</h4>: null}
    {data.likesAuthor !=''? <h4>likesAuthor:{data.likesAuthor},</h4>: null}
    {data.category !=''? <h4>category:{data.category}</h4>: null}
    {data.tags !=''? <h4>tags:{data.tags}</h4>: null}
    { String(data.links) != '' ? <ul>links:{Object.keys(data.links).map((item, index)=>(<li key={index}><a  href={ data.links[item]}>{data.links[item]}</a></li>))
    
   }</ul>: null}
    </div>
</>);

const Summary = ({data}) =>(

  <>
  {console.log('data s::',data.tags, Object.keys(data).map(item=>item) )}
    <h2>Summary:</h2>
    <div>you have liked {Object.keys(data).length} items</div>
    <div>with {Object.keys(data).map(item=> data[item].tags)}</div>
  </>
);

const Profile =  ( {loggedInUser} ) => {
const [user, setUser]=useState({
  username:'',
  email:'',
});
const [data, setData] = useState([{
 
  likesTitle:'',
  likesText:'',
  likesAuthor:'',
  category:'',
  text:'',
  category:'',
  tags:'',
  links:''
}]);

//useEffect for RenderUser
  useEffect(() => {
        fetch(`/api/user/profile?_id=${loggedInUser}`)
        .then((res) => res.json())
        .then((result) => {
           setUser({
            ...user,
            username: result.username,
            email: result.email
          });
          return
        });

//useEffect for RenderInfo
    fetch('/api/collections')
      .then((res) => res.json())
      .then((result) => {
       result.forEach((val) => {
          if(val.likes.indexOf(loggedInUser)>-1  && (val.title) !=''){
            let responseData={
              likesTitle:val.title,
              likesText:val.description,
              likesAuthor:val.author,
              category:val.category,
              text:val.text,
              tags:val.tags,
              links:val.links,
            };
            setData(prev=> [...prev,responseData]);
          }
          
      });
              return data;
  });
  }, []);



 
return (  
  <>
  <div className="profile"> 
  { loggedInUser ?
  <div>
     <RenderUser {...user} /> 
     { 
       Object.keys(data).map((item, index) => {
        return <RenderInfo 
        key={index} 
        data={data[item]}/>
      })
     }

  </div> : <div>Relogin</div>
  }
 </div>
 </>
 );

};

export default Profile;
