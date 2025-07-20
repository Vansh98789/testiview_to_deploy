import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img from '../images/phh.png';
function Main1() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="px-4 md:px-8 lg:px-16 py-20">
        
        {/* Main Content */}
        <div className={`max-w-6xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          
          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Get testimonials from{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Customers
              </span>
              <span className="block text-gray-600 text-3xl sm:text-4xl lg:text-5xl mt-4 mb-4">&</span>
              <span className="block">Enhance your business</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Using this, you can collect all your reviews in one place and simply attach them to your own
              website using a simple line of code.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <div className="relative group">
              {/* Subtle shadow behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 transform scale-105"></div>
              
              {/* Main image container */}
              <div className="relative bg-white rounded-3xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <img
                  src={img}
                  alt="dashboard photo"
                  className="w-full max-w-4xl h-auto rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Main1;
