import { useState } from 'react';

function Footer() {
  const [hoveredSection, setHoveredSection] = useState(null);

  const footerSections = {
    products: [
      'Our Wall of Love',
      'Chrome extension',
      'Slack app',
      'Pricing',
      'Features'
    ],
    company: [
      'Our resources',
      'Tutorials',
      'Customer stories',
      'Privacy policy',
      'Terms of Service'
    ],
    customers: [
      'Agencies',
      'B2B companies',
      'Course creators',
      'Consumer apps',
      'Cookie policy'
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl translate-x-32 translate-y-32" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6 group">
              <div className="relative">
                <img 
                  src="/api/placeholder/48/48" 
                  alt="Logo" 
                  className="h-12 w-12 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-white text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                  TestiView
                </h3>
              </div>
            </div>
            
            <p className="text-purple-100 text-lg font-medium mb-6 leading-relaxed">
              See the proof, Share the truth
            </p>
            
            <p className="text-purple-200 text-sm mb-8">
              Transform customer feedback into powerful social proof that drives conversions and builds trust.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
                <span className="text-white text-sm font-bold group-hover:rotate-12 transition-transform">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
                <span className="text-white text-sm font-bold group-hover:rotate-12 transition-transform">t</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
                <span className="text-white text-sm font-bold group-hover:rotate-12 transition-transform">in</span>
              </a>
            </div>

            <p className="text-purple-300 text-sm font-medium">
              © 2025 Vansh's Built
            </p>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Products */}
            <div 
              className="group"
              onMouseEnter={() => setHoveredSection('products')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h4 className="text-white font-bold text-lg mb-6 pb-2 border-b border-white/20 group-hover:border-white/40 transition-colors duration-300">
                Products
              </h4>
              <ul className="space-y-4">
                {footerSections.products.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className={`text-purple-200 hover:text-white transition-all duration-300 hover:translate-x-2 block ${
                        hoveredSection === 'products' ? 'text-purple-100' : ''
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div 
              className="group"
              onMouseEnter={() => setHoveredSection('company')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h4 className="text-white font-bold text-lg mb-6 pb-2 border-b border-white/20 group-hover:border-white/40 transition-colors duration-300">
                Company
              </h4>
              <ul className="space-y-4">
                {footerSections.company.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className={`text-purple-200 hover:text-white transition-all duration-300 hover:translate-x-2 block ${
                        hoveredSection === 'company' ? 'text-purple-100' : ''
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customers */}
            <div 
              className="group"
              onMouseEnter={() => setHoveredSection('customers')}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h4 className="text-white font-bold text-lg mb-6 pb-2 border-b border-white/20 group-hover:border-white/40 transition-colors duration-300">
                Customers
              </h4>
              <ul className="space-y-4">
                {footerSections.customers.map((item, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className={`text-purple-200 hover:text-white transition-all duration-300 hover:translate-x-2 block ${
                        hoveredSection === 'customers' ? 'text-purple-100' : ''
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-purple-200 text-sm mb-4 md:mb-0">
              Built with ❤️ for better customer testimonials
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
                Status
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
                API Docs
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
