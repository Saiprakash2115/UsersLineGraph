// import 'Userhomepage.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
const Usershomepage=()=>{
    const [usersList,setUsersList] = useState([]);
    const [items, setItems] = useState([]);
    const [currentTime,setCurrentTime] = useState([]);
    const [userloginhistory,setUserLoginHistory] = useState([]);
    let navigate = useNavigate()
    localStorage.setItem('Date',new Date());
    useEffect(()=>{
        axios.get('http://localhost:3003/myprofile',
        {headers:{
            'x-token': localStorage.getItem('token')
          }
        })
        .then(response => {
            setUsersList(response.data)            
        })
        .catch(error=>console.log(error))
    },[])
    useEffect(() => {
      const LoginTime = (localStorage.getItem('time'));
      const currentTime = (localStorage.getItem('Date'))
      const docId= localStorage.getItem('userLoginId');
      // const signinTime= localStorage.getItem('userLoginTime')
      setUserLoginHistory({docId})
      if (LoginTime,currentTime) {
       setItems(LoginTime);
       setCurrentTime(currentTime)
      }
    }, []);
    console.log(userloginhistory)
    const onSubmitBtn = () =>{
      axios.post('http://localhost:3003/logout', userloginhistory)
        .then(response=>{
          navigate("/")
      })
    }  
    return(
      <div className="container mt-5">
        <div className="row">
          <div className='col-3'>
          <Link onClick={onSubmitBtn} className="btn px-3 d-flex justify-content-center border">
              <h5 >Log Out</h5>
          </Link>
          </div>
          <div className='col-3'>
            <p><b>Login Time:</b>{items}</p> 
          </div>            
          <div className='col-6'>
            <p><b>Current Time:</b>{currentTime}</p> 
          </div>
          <div className="col-12 text-center d-flex justify-content-center">
              <h1 className="mt-3" >User DashBoard</h1>
          </div>                
          <div className='card m-4 p-4' style={{backgroundColor:"violet"}}>
            <h5>Welcome {usersList.name}</h5>
          </div>        
        </div>
      </div>
    )    
}
export default Usershomepage;