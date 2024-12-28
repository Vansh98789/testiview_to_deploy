import imgg from '../images/imggg.png';

function Footer() {
    return (
        <div className="bg-purple-500 flex flex-col md:flex-row justify-between p-4">
            <div className=" items-center ml-[1.5rem] mt-[2rem] mb-4 md:mb-0">
                <img src={imgg} alt="Logo" className="h-12 mr-2" />
                <p className="text-white text-3xl font-bold">Testiview</p>
                <p className="text-white text-sm mt-[1rem] font-semibold">See the proof, Share the truth</p>
                <p className="text-white text-sm mt-[1rem] font-semibold">© Vansh's Built</p>

            </div>

            <table className="w-[50rem] text-white">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 text-left">Products</th>
                        <th className="py-2 text-left">Company</th>
                        <th className="py-2 text-left">Customers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="">
                        <td className="py-2">Our Wall of Love</td>
                        <td className="py-2">Our resources</td>
                        <td className="py-2">Agencies</td>
                    </tr>
                    <tr className="">
                        <td className="py-2">Chrome extension</td>
                        <td className="py-2">Tutorials</td>
                        <td className="py-2">B2B companies</td>
                    </tr>
                    <tr className="">
                        <td className="py-2">Slack app</td>
                        <td className="py-2">Customer stories</td>
                        <td className="py-2">Course creators</td>
                    </tr>
                    <tr className="">
                        <td className="py-2">Pricing</td>
                        <td className="py-2">Privacy policy</td>
                        <td className="py-2">Consumer apps</td>
                    </tr>
                    <tr className="">
                        <td className="py-2">Features</td>
                        <td className="py-2">Terms of Service</td>
                        <td className="py-2">Cookie policy</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Footer;
