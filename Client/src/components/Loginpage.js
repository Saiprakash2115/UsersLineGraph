import './Usershomepage.css';
import { Link } from 'react-router-dom';
import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Loginpage=()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [userdetails,setUserDetails] = useState([])
    const [items, setItems] = useState([]);
    let navigate = useNavigate();     
    const userData ={      
        email:email,       
        password:password,
        }
    const current_date=new Date().toDateString(); 
    const current_time=new Date().toLocaleTimeString();
    const onSubmitBtn = (e) =>{
    e.preventDefault();
    if(email && password !== ''){
        axios.post('http://localhost:3003/login', userData)
        .then(response=>{
            console.log(response);
            // return
            if(response.status === 200){
                if(response.data.status === 'success'){                            
                    if(response.data.type === 'user'){
                    let jwtToken = response.data.token
                    let userLoginId= response.data.docId
                    // let userLoginTime= response.data.userLoginTime
                    localStorage.setItem('token',jwtToken)
                    localStorage.setItem('time',current_time)
                    localStorage.setItem('userLoginId',userLoginId)
                    // localStorage.setItem('userLoginTime',userLoginTime)
                    toast.success(response.data.msg, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });                            
                    setTimeout(() => {
                        navigate("/Usershomepage")
                    }, 3000);
                }
                if(response.data.type === 'admin'){
                    let jwtToken = response.data.token
                    localStorage.setItem('token',jwtToken)
                    toast.success(response.data.msg, {
                        position: "top-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });                            
                    setTimeout(() => {
                        navigate("/Adminhomepage")
                    }, 3000);
                }
            }
            else{
                toast.warning(response.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",                    
                });                        
            }                                      
        }          
    })                                
    .catch(error=>{
        console.log("Catch",error);
        toast.warning(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",                    
        });              
    })
    }else{
        toast.warning('Please Enter Valid Inputs', {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}    
return(
        <div className='backEntireSheetColor py-5'>
            <div className="container-fluid p-5 background-color">
               <div className="row">
                   <div className="col-md-6 card p-3 offset-md-3 backgroundColor">
                        <div className="row ">
                            <div className='d-flex flex-row justify-content-end'>
                                <p>{current_time}</p>- 
                                <p>{current_date}</p>
                            </div>
                            <div className='col-md-12 text-center'>                        
                            <h2><b>Login</b></h2>
                            <small style={{color:"#2c0264"}}>It only takes a couple of minutes to get started!
                            </small>
                            </div>
                        </div>
                            <div className="row">
                                <div className="col-12 p-0">
                                <Form className="form-container" onSubmit={onSubmitBtn}>
                                <Form.Group className="mb-1" controlId="email" onChange={(e)=>setEmail(e.target.value)} value={email}>
                                <Form.Label><b>Email</b></Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="password" onChange={(e)=>setPassword(e.target.value)} value={password}>
                                <Form.Label><b>Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" />
                                </Form.Group>
                                <Button variant="primary" className="mt-2 btn btn-block btn-secondary w-100 background-bottom blackbackground" type="submit">
                                        <b>Login</b>
                                </Button>
                            </Form> 
                            
                        <Link to="/Signuppage" variant="primary" className="mt-2 btn btn-block btn-light w-100 background-bottom" type="submit">
                                        <b>Signup</b>
                                </Link>                          
                        </div>                        
                    </div>            
                        <div className="col-md-4" style={{marginLeft:"30px"}}>
                            <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                            />
                        </div>
                </div>
            </div>
        </div> 
    </div>
)
}
export default Loginpage;