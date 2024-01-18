import { useState } from 'react'
import calcLogo from '../assets/calcLogo.svg'
import tableLogo from '../assets/tableLogo.svg'
import { Link } from 'react-router-dom'
import '../App.css'

const Home: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='inline-grid grid-cols-2'>
        <a href='https://jtsang02.github.io/spatial-calc-js/'>
          <img src={calcLogo} className="logo" />
        </a>
        <Link to="/table">
          <img src={tableLogo} className="logo" />
        </Link>
      </div>
      <h1 className='text-4xl font-bold'>Spatial Calculator V2.0</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>     
      <a href="https://josiahtsang.netlify.app/" target="_blank" className="profile-button">
        Visit my portfolio
      </a> 
    </>
  )
}

export default Home