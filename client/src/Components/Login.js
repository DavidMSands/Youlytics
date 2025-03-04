import React from 'react'
import { useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail,  } from 'react-icons/md'
import { FaLock } from 'react-icons/fa';

import logo from '../Data/CORVIDAETA (3).svg'
import lightLogo from '../Data/CORVIDAETA (4).svg'

function Login({ onLogin, isDark }) {
  const [showLogin, setShowLogin] = useState(true)
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  function handleLoginSubmit(e) {
    e.preventDefault() 
    const userObj = { email, password }
    submitFetch(userObj, '/login')
  }

  function handleSignupSubmit(e) {
    e.preventDefault()
    const userObj = { name, email, password, password_confirmation: passwordConfirmation }
    fetch('/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj ),
    })
      .then(r => {
        if (r.ok) {
          r.json().then((user) => console.log(user)) 
        } else {
          r.json().then(data => setErrorMsg(() => data.errors))
          setShowErrorMsg(true)
          setPassword("")
        }
      })
    singupSubmit(userObj)
  }

  function singupSubmit (userObj) {
    fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj ),
    })
    .then(r => {
      if (r.ok) {
        r.json().then((user) => onLogin(user)) 
      }
    })
  }

  function submitFetch(userObj, routeString) { 
    fetch(routeString, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj ),
    })
      .then(r => {
        if (r.ok) {
          r.json().then((user) => onLogin(user)) 
        } else {
          r.json().then(data => setErrorMsg(() => data[routeString === '/login' ? 'error' : 'errors']))
          setShowErrorMsg(true)
          setPassword("")
        }
      }) 
  }
  

  function handleChangeForm() {
    setShowLogin(!showLogin)
    setShowErrorMsg(false)
  }

  return (
    <>
    {/* <hr className="blockline"></hr> */}
      <div id="login-container">
        {/* <img src={logo} alt="logo" id="login-logo"/> */}
        <img src={ isDark ? logo : lightLogo } alt='logo' id='logo2'/>
        <div className="forms">
        {showLogin ?
        <form id="login">
              {/* <h1>Sign in to Twiddle Wakka</h1> */}
              {showErrorMsg ? <p style={{'color':'red'}}>{errorMsg}</p> : null}
              <div className="input-field">
                <label htmlFor="email"></label>
                <i><BsFillPersonFill className='icon' /></i>
                <input
                  type="email"
                  name="email"
                  placeholder='Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='field'
                /><br/>
                <label htmlFor="password"></label>
                <i><FaLock className='icon'/></i>
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='field'
                /><br/>
                <input onClick={handleLoginSubmit} type="submit" value="Login" className="login-button"/>
                <p onClick={() => handleChangeForm()}>Don't have an account?</p>
              </div>
          </form> :
          <form id="signup">
              <div className="input-field">
              <i><BsFillPersonFill className='icon' /></i>
              <label htmlFor="name"></label>
                <input
                  type="text"
                  name="name"
                  placeholder='First & last name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='field'
                /><br/>
                <i><MdEmail className='icon' /></i>
                <label htmlFor="email"></label>
                <input
                  type="text"
                  name="email"
                  placeholder='Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='field'
                /><br/>
                <i><FaLock className='icon'/></i>
                <label htmlFor="password"></label>
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='field'
                /><br/>
                <i><FaLock className='icon'/></i>
                <label htmlFor="password_confirmation"></label>
                <input
                  type="password"
                  name="password_confirmation"
                  placeholder='Confirm password'
                  value={passwordConfirmation}
                  onChange={e => setPasswordConfirmation(e.target.value)}
                  className='field'
                /><br/>
                <input onClick={handleSignupSubmit} type="submit" value="Sign up" className="login-button" />
                <p onClick={() => handleChangeForm()}>Already have an account?</p>
                {showErrorMsg && errorMsg.length > 1 ? <>{errorMsg.map(msg => <p style={{'color':'red'}}>{msg}</p>)}</> : null}
                {showErrorMsg && errorMsg.length === 1 ? <p style={{'color':'red'}}>{errorMsg}</p> : null}
              </div>
          </form>
        }
        </div>
      </div>
    
  </>
  )
}

export default Login