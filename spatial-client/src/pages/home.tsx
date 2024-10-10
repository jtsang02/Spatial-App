import calcLogo from '../assets/calcLogo.svg'
import tableLogo from '../assets/tableLogo.svg'
import { Link } from 'react-router-dom'
import '../App.css'

export const Home: React.FC = () => {

  return (
    <div className='flex h-full'>
      <div className='m-auto text-center'>
        <div className='inline-grid grid-cols-2'>
          <a href='https://jtsang02.github.io/spatial-calc-js/calculator.html'>
            <img src={calcLogo} className="logo calculator" alt='calculator' />
          </a>
          <Link to="/table">
            <img src={tableLogo} className="logo table" alt='spreadsheet'/>
          </Link>
        </div>
        <h1 className='text-4xl font-bold p-5'>Spatial Calculator Beta</h1>
        <p className="text-gray-500 mb-8 italic">
          Click one of the icons above to get started!
        </p>
        <div className='grid place-items-center'>
          <Link to="/about" className='mb-4'>
            <button >
              ReadMe
            </button>
          </Link>
          <a href="https://josiahtsang.netlify.app/"
            className="font-medium text-blue-500 no-underline hover:text-blue-700">
            My portfolio
          </a>
        </div>
      </div>
    </div>
  )
};