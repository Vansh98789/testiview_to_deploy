import { Link } from 'react-router-dom';
import img from '../images/phh.png';

function Main1() {
  return (
    <>
      <div className="mb-8 px-4 md:px-8 lg:px-16">
        {/* Heading Text */}
        <p className="text-4xl sm:text-5xl text-center font-bold mt-12">
          Get testimonials from Customers
          <br />
          <span className="block text-center"> & </span>
          <br />
          <span className="text-center">Enhance your business</span>
        </p>
        
        {/* Description Text */}
        <p className="font-bold mt-4 text-center">
          Using this, you can collect all your reviews in one place and simply attach them to your own
          website using a simple line of code.
        </p>
        
        {/* Image */}
        <div className="flex justify-center mt-8">
          <img
            src={img}
            alt="dashboard photo"
            className="h-96 w-4/5 sm:w-3/4 lg:w-3/5 object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Main1;
