import './Usershomepage.css'
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/InputGroup';
import Small from 'react-bootstrap/InputGroup'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



const Signuppage=()=>{
    const [typeOfLogin,setTypeOfLogin] = useState('user')
    const [fullname,setFullname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [mobile,setMobile] = useState('')    
    
    let navigate = useNavigate()
    const [data,setData] = useState()
    console.log(fullname)

    const userData ={
        type:typeOfLogin,
        name:fullname,
        email:email,
        password:password,
        contactNumber:mobile,
    }

console.log(userData);

const handleSelect=(key)=> {
    setTypeOfLogin(key)
};

const onSubmitForm = (e) =>{
    e.preventDefault();
    if(typeOfLogin && fullname && email && password && mobile !== ''){
        axios.post('http://localhost:3003/signup', userData)
        .then(response=>{
            console.log(response);
            // return
            setData(response.data)
            if(response.status === 200){
                if(response.data.status === 'success'){
                    toast.success(response.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",                    
                    });
                    setTimeout(() => {
                        navigate('/')
                    }, 2000); 
                }else{
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
            console.log(error.response.data)
        })
    }else{
        toast.warning('Please Enter Required Details', {
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
        <div className="backEntireSheetColor">         
            <div className="container-fluid p-5 background-color">
            <div className="row ">                
            <div className="col-md-6 card col-lg-6 col-sm-12 col-xs-12 p-5 offset-md-3 backgroundColor">
                <div className="text-center">
                <h2>Create an account</h2>
                <small style={{color:"#2c0264"}}>It only takes a couple of minutes to get started!
                </small>
                </div>            
            <div className="row">
            <div className="col-12 p-0">
                <Tabs
                    defaultActiveKey="user"
                    onSelect={handleSelect}
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                    >
                    <Tab eventKey="user"  title="User">
                    <Form className="form-container" onSubmit={onSubmitForm} >
                                <Form.Group className="mb-1" controlId="fullname" onChange={(e)=>setFullname(e.target.value)} value={fullname}>
                                <Form.Label><b>Full Name</b></Form.Label>
                                <Form.Control type="fullname" placeholder="Enter your Full name" />
                                </Form.Group>                            
                                <Form.Group className="mb-1" controlId="email" onChange={(e)=>setEmail(e.target.value)} value={email}>
                                <Form.Label><b>Email ID</b></Form.Label>
                                <Form.Control type="email" placeholder="Enter your Email ID" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="password" onChange={(e)=>setPassword(e.target.value)} value={password}>
                                <Form.Label><b>Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Minimum 6 characters" />                                
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="mobile" onChange={(e)=>setMobile(e.target.value)} value={mobile}>
                                <Form.Label><b>Mobile Number</b></Form.Label>                                
                                <InputGroup className="mb-3">
                                    <DropdownButton
                                    variant="outline-secondary"
                                    title="+91"
                                    id="input-group-dropdown-1"
                                    >
                                    <Dropdown.Item href="#">91</Dropdown.Item>
                                    <Dropdown.Item href="#">90</Dropdown.Item>
                                    <Dropdown.Item href="#">89</Dropdown.Item>
                                    
                                    </DropdownButton>
                                    <Form.Control type="mobile" placeholder="Enter your mobile number" />
                                </InputGroup>
                                </Form.Group>
                                <Button variant="primary" className="btn btn-secondary background-bottom mt-2" type="submit">
                                        Register Now
                                </Button>
                    </Form>
                    </Tab>
                    <Tab eventKey="admin" title="Admin">
                    <Form className="form-container" onSubmit={onSubmitForm} >
                                <Form.Group className="mb-1" controlId="fullname" onChange={(e)=>setFullname(e.target.value)} value={fullname}>
                                <Form.Label><b>Admin Name</b></Form.Label>
                                <Form.Control type="companyname" placeholder="Enter your Admin name" />
                                </Form.Group>                            
                                <Form.Group className="mb-1" controlId="email" onChange={(e)=>setEmail(e.target.value)} value={email}>
                                <Form.Label><b>Email ID</b></Form.Label>
                                <Form.Control type="email" placeholder="Enter your Email ID" />
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="password" onChange={(e)=>setPassword(e.target.value)} value={password}>
                                <Form.Label><b>Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Minimum 6 characters" />                                
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="mobile" onChange={(e)=>setMobile(e.target.value)} value={mobile}>
                                <Form.Label><b>Mobile Number</b></Form.Label>                                
                                <InputGroup className="mb-3">
                                    <DropdownButton
                                    variant="outline-secondary"
                                    title="+91"
                                    id="input-group-dropdown-1"
                                    >
                                    <Dropdown.Item href="#">91</Dropdown.Item>
                                    <Dropdown.Item href="#">90</Dropdown.Item>
                                    <Dropdown.Item href="#">89</Dropdown.Item>
                                    
                                    </DropdownButton>
                                    <Form.Control type="mobile" placeholder="Enter your mobile number" />
                                </InputGroup>
                                </Form.Group>                                    
                                <Button variant="primary" className="btn btn-secondary background-bottom my-2" type="submit">
                                        Register Now
                                </Button>                                
                    </Form>
                    </Tab>                    
                </Tabs>   
                <Link to="/" >Already Register</Link>         
            </div>
        </div>
           
    </div>             
           <div className="col-md-4 col-lg-4" style={{marginLeft:"30px"}}>
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
    )
}

export default Signuppage;