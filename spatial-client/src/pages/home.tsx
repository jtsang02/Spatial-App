import calcLogo from '../assets/calcLogo.svg'
import tableLogo from '../assets/tableLogo.svg'
import { Link } from 'react-router-dom'
import '../App.css'

const Home: React.FC = () => {

  return (
    <div className='flex h-full'>
      <div className='m-auto'>
        <div className='inline-grid grid-cols-2'>
          <a href='https://jtsang02.github.io/spatial-calc-js/calculator.html'>
            <img src={calcLogo} className="logo calculator" />
          </a>
          <Link to="/table">
            <img src={tableLogo} className="logo table" />
          </Link>
        </div>
        <h1 className='text-4xl font-bold p-5'>Spatial Calculator V2.0</h1>
        <p className="text-gray-500 mb-8 italic">
          Click on the icons above to get started!
        </p>
        <div className='grid place-items-center'>
          <Link to="/about" className='mb-4'>
            <button >
              About
            </button>
          </Link>
          <a href="https://josiahtsang.netlify.app/"
            className="font-medium text-blue-500 no-underline hover:text-blue-700">
            Visit my portfolio
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home