import calcLogo from '../assets/calcLogo.svg'
import tableLogo from '../assets/tableLogo.svg'
import { Link } from 'react-router-dom'
import '../App.css'

const Home: React.FC = () => {

  return (
    <div className='flex h-full'>
      <div className='m-auto'>
        <div className='inline-grid grid-cols-2'>
          <a href='https://jtsang02.github.io/spatial-calc-js/'>
            <img src={calcLogo} className="logo" />
          </a>
          <Link to="/table">
            <img src={tableLogo} className="logo" />
          </Link>
        </div>
        <h1 className='text-4xl font-bold p-5'>Spatial Calculator V2.0</h1>
        <p className="text-gray-700 mb-8">
          Click on the Vite and React logos to learn more
        </p>
        <a href="https://josiahtsang.netlify.app/" className="profile-button">
          Visit my portfolio
        </a>
      </div>
    </div>
  )
}

export default Home