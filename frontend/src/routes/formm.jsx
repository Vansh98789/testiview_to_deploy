import imgg from '../images/imggg.png'; 
import imggg from '../images/char.jpg';
import { Link } from 'react-router-dom';
function Formm(){
    return(<>
    <div className="bg-purple-500">
    <img src={imgg} alt="Logo" className="mr-2 h-[5rem]" />
    </div>
    <hr/>
    
    <div className="flex flex-col items-center pt-[3rem] ">
    <img src={imggg} className="w-[4rem] h-[4rem] rounded-full" alt="Description" />
    <h1 className="text-center text-2xl font-bold">Vansh Business Work</h1>
    <h2 className="text-center text-xl pt-[3rem] font-bold">Questions</h2>
    <h2 className="text-center pt-[0.2rem] text-lg">Please specify your name?</h2>
    <h2 className="text-center pt-[0.2rem] text-lg">Please specify the work we have done for you?</h2>
    <h2 className="text-center  pt-[0.2rem] text-lg">Please specify the overall experience?</h2>
    <h2 className="text-center pt-[0.2rem] text-lg">Please specify the changes you want in our services?</h2>
    <h2 className="text-center pt-[0.2rem] text-lg">Video Url (If any)</h2>
    <div className=" space-y-4">
    <Link to="/response" className="bg-purple-500 mt-8 text-white px-4 py-2 rounded hover:bg-purple-700 block text-center">
        Send Your Response
    </Link>
    
</div>

</div>


    
    </>);
}

export default Formm;