import React, { useState, useEffect } from 'react';
import './Profile.css';
const RenderUser = (user) =>(<>
<div className='wrap summary'>
<div><span className="initials">{user.username.slice(0,2)}</span></div>
 <div> 
  <h2>{user.username}</h2>
  <h2> {user.email}</h2>
  </div>
  </div>
</>);

const RenderInfo = ({data}) =>(
  <div className='card'>
    {data.likesTitle !=''? <p><strong>Title you liked: </strong>{data.likesTitle}</p>: null}
    {data.likesText !=''? <p><strong>Text you liked: </strong>{data.likesText}</p>: null}
    {data.likesAuthor !=''? <p><strong>likesAuthor: </strong>{data.likesAuthor},</p>: null}
    {data.category !=''? <p><strong>Category:</strong> {data.category}</p>: null}
    {data.tags !=''? <p><strong>Tags:</strong>{data.tags}</p>: null}
    { String(data.links) != '' ? <ul><strong>Links:</strong>{Object.keys(data.links).map((item, index)=>(<li key={index}><a  href={ data.links[item]}>{data.links[item]}</a></li>))
    
   }</ul>: null}
    </div>
);

const Summary = ({data}) =>{
  let newTags=()=>{
    let tags=String(Object.keys(data).map(item => data[item].tags).join(',')).split(',');
    let cache=[];
      for(let i=0; i<tags.length;i++){
          if(tags[i] !=='' && cache.indexOf(tags[i])==-1 )cache+=[tags[i]]+' ';   
      }
      return cache;
  };

  let newCat=()=>{ 
    let cat=String(Object.keys(data).map(item => data[item].category).join(',')).split(',');
    let cache=[];
    for(let i=0; i<cat.length;i++){
        if(cat[i] !=='' && cache.indexOf(cat[i])==-1 )cache+=[cat[i]]+' ';  
    }
    return cache;
  };

  let newTitles=()=>{ 
    let cat=String(Object.keys(data).map(item => data[item].likesTitle).join(',')).split(',');
    let cache=[];
    for(let i=0; i<cat.length;i++){
        if(cat[i] !=='' && cache.indexOf(cat[i])==-1 )cache+=`${[cat[i]]} , `;  
    }
    return cache;
  };


let titlesData = newTitles();
let tagsData = newTags();
const catData =newCat();
 let color=["#efd9ce","#dec0f1","#b79ced","#957fef","#7161ef", "#efd9ce","#dec0f1","#b79ced","#957fef","#7161ef"];


return(
  <>
  <div>
    <h2>Summary:</h2>
    <div className="summary-p">
    <div>You have liked <strong>{Object.keys(data).length-1}</strong> items.</div>
    <div className="line">Your favorite tags: {String(tagsData).split(' ').map((e, i)=>(String(e)!=''?<span className='tag'   style={{backgroundColor: color[Math.floor(Math.random()*color.length)]}} key={`tags-data${i}`}>{e}</span>: '')) }</div>
    <div className="line">with categories {String(catData).split(' ').map((e, i)=>(String(e)!=''?<span className='cat'   style={{backgroundColor: color[Math.floor(Math.random()*color.length)]}} key={`cat-data${i}`}>{e}</span>: '')) }</div>

    <div className="line"><strong>Book titles you liked:</strong></div>
    <ul className='bookTitle'>{String(titlesData).split(' ,').map((e, i)=><li key={`title-data${i}`} style={{backgroundColor: color[Math.floor(Math.random()*color.length)]}}>{e}</li>) }</ul>
</div>
    {/* <div>category {[String(data[item].category)].reduce((a,b) => a.includes(b) ? a.concat(b)  : null)}</div> */}
    </div>
  </>)
};


const Profile =  ( {loggedInUser} ) => {
  console.log('Profile',loggedInUser );
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
          return user
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
  <div className='maxW'>
     <RenderUser {...user} /> 
     <Summary data={data}/>
     <div className='cardWrap'>
     { 
       Object.keys(data).map((item, index) => {
        return  <RenderInfo 
        key={index} 
        data={data[item]}/>
      })
     }
     </div>
  </div> : <div>Relogin</div>
  }
 </div>
 </>
 );

};

export default Profile;
