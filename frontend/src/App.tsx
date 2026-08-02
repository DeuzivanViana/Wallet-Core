import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { SignIn } from './pages/sign-in'
import { SignUp } from './pages/sign-up'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route element={<Home/>} path='/'/>
      <Route element={<SignIn/>} path='/sign-in'/>
      <Route element={<SignUp/>} path='/sign-up'/>
    </Routes>
  </BrowserRouter>
}

export default App
