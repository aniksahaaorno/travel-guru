import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';


firebase.initializeApp(firebaseConfig);

const Login = () => {

    const [newUser,setNewUser] = useState(false);

    const [user,setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      password:'',
      photo: '',
    })
  
    const provider = new firebase.auth.GoogleAuthProvider();
  
    const handleSignIn = () => {
  
      firebase.auth().signInWithPopup(provider)
      .then(res =>{
          const {displayName,email,photoURL} = res.user;
          const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
          }
          setUser(signedInUser);
        console.log(displayName,email,photoURL);
      })
      .catch(error =>{
        console.log(error);
        console.log(error.message);
      })
    }
  
    const handleSignOut = () =>{
      firebase.auth().signOut()
      .then(res =>{
         const signedOutUser ={
           isSignedIn: false,
           name: '',
           email: '',
           photo: '',
           error:'',
           success: false
         }
         setUser(signedOutUser);
      })
      .catch(error =>{
        console.log(error);
      })
    }
    
    const handleBlur = (event) =>{
  
     let isFieldValid = true;
  
      if(event.target.name === 'email'){
  
        isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
     
      }
      if(event.target.name === 'password'){
  
        isFieldValid = event.target.value.length >6 && /\d{1}/.test(event.target.value);
     
      }
  
      if(isFieldValid){
  
            const newUserInfo = {...user};
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
      }
  
    }
   
   const handleSubmit = (e) => {
        if(newUser && user.email && user.password){
         
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(res => {
  
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUserName(user.name);
          
          })
          .catch(error => {
     
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
         
        } 
  
        if(!newUser && user.email && user.password){
  
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
  
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            console.log('Sign in UserInfo',res.user);
          
          })
          .catch(function(error) {
  
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
          });
        }
  
        e.preventDefault();
   }
  
  
  const updateUserName = (name) =>{
   const user = firebase.auth().currentUser;
  
  user.updateProfile({
    displayName: name,
  }).then(function() {
    console.log('User Name Update successful.');
  
  }).catch(function(error) {
    console.log(error);
  });
  }

    return (
        <div style={{textAlign: 'center',backgroundColor:'white'}}>
 {
             user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :   <button onClick={handleSignIn}>Continue with Google</button>
           }
          
           {
             user.isSignedIn && <div>
               <p>Welcome,{user.name}</p>
               <p>Email: {user.email}</p>
               <img src={user.photo} alt=""/>
             </div>
           }

           <h1>Create An Account</h1>

           <form onSubmit={handleSubmit}>
             <input type="text" name="firstName"   onBlur={handleBlur} placeholder="First Name" required />
             <br/>
             <input type="text" name="lastName" onBlur={handleBlur} placeholder="Last Name" required/>
             <br/>
             <input type="text" name="email" onBlur={handleBlur} placeholder="Email" required/>
             <br/>
             <input type="password" name="password" onBlur={handleBlur} placeholder="password" required/>
             <br/>
             <input type="password" name="password" onBlur={handleBlur} placeholder="password" required/>
             <br/>
             <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
            <label htmlFor="newUser">New User Sign Up</label>
            <br/>
             <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
           </form>

          <p style={{color:'red'}}>{user.error}</p>
          {
            user.success &&  <p style={{color:'green'}}>User {newUser ?'created': "logged In"} successfully</p>
          }
        </div>
    );
};

export default Login;