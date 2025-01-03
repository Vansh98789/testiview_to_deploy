import imgg from '../images/imggg.png';

function Footer() {
  return (
    <div className="bg-purple-500 flex flex-col md:flex-row justify-between p-6">
      {/* Left Section */}
      <div className="flex flex-col items-center md:items-start ml-4 mt-8 md:mt-0 mb-6 md:mb-0">
        <img src={imgg} alt="Logo" className="h-12 mb-4" />
        <p className="text-white text-3xl font-bold">Testiview</p>
        <p className="text-white text-sm mt-4 font-semibold">See the proof, Share the truth</p>
        <p className="text-white text-sm mt-4 font-semibold">© Vansh's Built</p>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto md:overflow-visible">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Products</th>
              <th className="py-2 text-left">Company</th>
              <th className="py-2 text-left">Customers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2">Our Wall of Love</td>
              <td className="py-2">Our resources</td>
              <td className="py-2">Agencies</td>
            </tr>
            <tr>
              <td className="py-2">Chrome extension</td>
              <td className="py-2">Tutorials</td>
              <td className="py-2">B2B companies</td>
            </tr>
            <tr>
              <td className="py-2">Slack app</td>
              <td className="py-2">Customer stories</td>
              <td className="py-2">Course creators</td>
            </tr>
            <tr>
              <td className="py-2">Pricing</td>
              <td className="py-2">Privacy policy</td>
              <td className="py-2">Consumer apps</td>
            </tr>
            <tr>
              <td className="py-2">Features</td>
              <td className="py-2">Terms of Service</td>
              <td className="py-2">Cookie policy</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Footer;
