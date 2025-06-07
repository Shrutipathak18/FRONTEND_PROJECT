import React, { useState, useEffect } from 'react'
import Login from './Login'
import Welcome from './Welcome'
import Onboarding from './Onboarding'
import Dashboard from './Dashboard'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // Check localStorage for login and onboarding status
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const onboarding = localStorage.getItem('isOnboardingComplete') === 'true'
    const storedUserName = localStorage.getItem('userName')

    setIsLoggedIn(loggedIn)
    setIsOnboardingComplete(onboarding)
    if (storedUserName) {
      setUserName(storedUserName)
    }
  }, [])

  const handleLogin = (status) => {
    setIsLoggedIn(status)
    localStorage.setItem('isLoggedIn', status)
  }

  const handleOnboardingComplete = (name) => {
    setIsOnboardingComplete(true)
    setUserName(name)
    localStorage.setItem('isOnboardingComplete', 'true')
    localStorage.setItem('userName', name)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsOnboardingComplete(false)
    setUserName('')
    localStorage.clear()
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  } else if (!isOnboardingComplete) {
    return <Onboarding onOnboardingComplete={handleOnboardingComplete} />
  } else {
    return <Dashboard userName={userName} onLogout={handleLogout} />
  }
}

export default App
