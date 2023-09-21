import './Usershomepage.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const Adminhomepage=()=>{

    const [adminList,setAdminList] = useState([]);
    const [currentTime,setCurrentTime] = useState([]);
    const [nameCap,setNameCap] = useState([]);
    let navigate = useNavigate()
    localStorage.setItem("Date",new Date());
    useEffect(()=>{
        axios.get('http://localhost:3003/allusers',
        {headers:{
            'x-token': localStorage.getItem('token')
        }
        })
        .then(response => {
            setAdminList(response.data)
            console.log(response.data)
        })
        .catch(error=>console.log(error))
    },[])
    
    useEffect(() => {
        const currentTime = (localStorage.getItem('Date'))
        if (currentTime) {
         setCurrentTime(currentTime)
        }
      }, []);
    function onSubmitBtn(id) {
      navigate("/Userviewhistory", { state: id });
    }

    return(
      <div className='backEntireSheetColor py-5'>
        <div className="container py-5 ">
          <div className="row">
              <div className='col-4 card backgroundColor'>             
                <p><b>Current Login Time:</b>{currentTime}</p>                 
              </div>              
              <div className='col-5'>
              </div>
              <div className='col-3'>
                  <Link to="/"  className="btn px-3 d-flex justify-content-center border backgroundColor">
                      <h5 >Log Out</h5>
                  </Link>
              </div>
              <div className="col-12 text-center d-flex justify-content-center">
                  <h1 className="my-3" ><b>Admin DashBoard</b></h1>
              </div>
              <div className='justify-content-center p-2 card backgroundColor'>                   
                <table>
                  <tr className='border fontSize'>
                    {/* <th>UserId</th> */}
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>View History</th>
                  </tr>
                  {adminList.map((data)=>
                  <tr className='border'>
                    {/* <td>{data._id}</td> */}
                    {/* <td className='pt-3'><h5>{data.converted_firstlettercap}</h5><br/></td> */}
                    <td className='pt-3'><h5>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h5><br/></td>
                    <td>{data.email}</td>
                    <td className='btn btn-secondary btn-block mt-2' onClick={() => onSubmitBtn(data._id)} >View History</td>
                  </tr>
                )}                       
                </table>                    
              </div>
            </div>
          </div>
      </div>
        )    
}
export default Adminhomepage;