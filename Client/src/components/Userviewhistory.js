import './Usershomepage.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import React from 'react';
import Chart from 'react-apexcharts'; 
const Userviewhistory=()=>{
    const [usersList,setUsersList] = useState([]);
    const [date,setDate] = useState([]);
    const [lineChartData,setLineChartData] = useState([]);
    const {state} = useLocation();
    console.log("Params",state);
    var StartDate = new Date('9/4/2023').getTime();
    // var StartDate = new Date(1693798200000)
    // var EndDate = new Date(StartDate+(1693798200000+(86400000*5)));
    var EndDate = new Date(StartDate+(86400000*5)).getTime();

    useEffect(()=>{
        axios.post('http://localhost:3003/individualuser',{id:state,SDate:StartDate,EDate:EndDate})
        .then(response => {
            const userWorkedHours = {};
            var loopDate = StartDate;
            // console.log(StartDate,EndDate,loopDate);
            setUsersList(response.data.map(v => {
                v['converted_signinTime'] = new Date(+v.signinTime).toLocaleString();
                v['converted_signoutTime'] = new Date(+v.signoutTime).toLocaleString();
                // const differenceInMinutes = ((new Date(+v.signoutTime)-new Date(+v.signinTime))/(1000*60));
                const differenceInMinutes = (+v.signoutTime - (+v.signinTime))/(1000*60);
                console.log(differenceInMinutes);
                if(!userWorkedHours[new Date (+v.signinTime).toLocaleDateString()])
                    userWorkedHours[new Date (+v.signinTime).toLocaleDateString()] = differenceInMinutes+"Mins" ;
                else
                    userWorkedHours[new Date (+v.signinTime).toLocaleDateString()] += differenceInMinutes+"Mins";
                // v['converted_timeInMinutes'] = (+v.signoutTime - (+v.signinTime))/(1000*60);
                // const decimal =differenceInMinutes - Math.floor(differenceInMinutes)
                let decimalValue = differenceInMinutes.toString().indexOf(".");
                let decimalValue1 = (''+differenceInMinutes).split(".") || '0.0';
                let result = differenceInMinutes.toString().substring(decimalValue+1);
                console.log(result,decimalValue1);
                let hours = Math.floor(differenceInMinutes / 60);
                if (hours < 0) {
                    hours = 24 + hours;
                }
                let minutes = Math.floor(differenceInMinutes % 60);
                if (minutes < 0) {
                    minutes = 60 + minutes;
                }
                let seconds = (result%60)
                if (seconds < 0) {
                    seconds = 60 + seconds;
                }
                // v['hoursAndMinutes'] = `${hours}Hrs : ${minutes < 10 ? '0' : ''}${minutes}`;
                 v['hoursAndMinutes'] = `${hours}Hrs : ${minutes < 10 ? '0' : ''}${minutes}Mins : ${seconds < 10 ? '0' : ''}${Math.round(+('.'+decimalValue1[1]) * 60) || 0} Secs`
                // v['hoursAndMinutes'] = hours +"Hrs"+ ":" + (minutes < 10 ? '0' : '') + minutes;
                return v;
            }))
            // console.log(response.data)
           /*  for(let i=0; i < resData.length; i++)
            {
                newvalue.push({y:resData[i].converted_timeInMinutes, x:new Date (+resData[i].signinTime).toLocaleDateString()});
                // newvalue.push({y:resData[i].converted_timeInMinutes, x:+resData[i].signinTime});
            } */
            console.log(userWorkedHours);
            while (loopDate < EndDate) {
                userWorkedHours[new Date (loopDate).toLocaleDateString()] = userWorkedHours[new Date (loopDate).toLocaleDateString()] ?
                userWorkedHours[new Date (loopDate).toLocaleDateString()] : "0";
                loopDate = new Date(loopDate+86400000).getTime();
            }
            const finalHoursData = Object.keys(userWorkedHours).map(v => {
                return {x:v,y:userWorkedHours[v]}
            })
            setDate(finalHoursData); 
            console.log([{data:finalHoursData}]);
            setLineChartData([{data:finalHoursData.reverse()}]);      
            console.log(userWorkedHours,finalHoursData);
        })
        .catch(error=>console.log(error))
    },[])
    
    return(
        <div className='backEntireSheetColor'>
            <><div className="container py-5 ">
            <div className="row">
                <div className='col-3 backgroundColor offset-md-9'>
                    <Link to="/Adminhomepage" className="btn d-flex justify-content-center border">
                        Back to Admin DashBoard
                    </Link>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-12 d-flex flex-row justify-content-center">
                    <h1><b>User Login History</b></h1>
                </div>
            </div>
            <div className='=row'>
                <div className='col-md-12 card backgroundColor'>
                    <Chart type='line'
                        width={1100}
                        height={300}
                        series={lineChartData}
                    options={{
                        title: { text: "User Login in Day wise" },
                        dropShadow: {
                            enabled: true,
                            color: '#000',
                            top: 18,
                            left: 7,
                            blur: 10,
                            opacity: 0.2
                        },
                        toolbar: {
                            show: false
                        },
                        colors: ['black', '#545454'],
                        dataLabels: {
                        enabled: true,
                        },
                        stroke: {
                        curve: 'smooth'
                        },                
                        xaxis: {
                            title: { text: "Week dates" },
                            type: 'numeric'
                        },
                        grid: {
                            borderColor: '#e7e7e7',
                            row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                            },
                        },
                        markers: {
                            size: 1
                        },
                        yaxis: {
                            title: { text: "Working Minutes"},
                            // min:400,
                            // max: 600
                        },
                        legend: {
                            position: 'top',
                            horizontalAlign: 'right',
                            floating: true,
                            offsetY: -25,
                            offsetX: -5
                        }
                    }}            
                    >
                    </Chart>
                </div>
            </div>
            <div className="row my-5 backgroundColor">
                <table>
                    <tr className='border fontSize'>
                        {/* <th>UserID</th> */}
                        <th>LogIn Time</th>
                        <th>LogOut Time</th>
                        <th>Total Work Time</th>
                    </tr>
                    {usersList.map((data) => <>
                        <tr className='border'>
                            {/* <td>{idPass}</td> */}
                            <td>{data.converted_signinTime}</td>
                            <td>{data.converted_signoutTime}</td>
                            <td>{data.hoursAndMinutes}</td>
                        </tr>
                    </>
                    )}
                </table>
            </div>          
        </div>
        </>
        </div>         
    )    
}
export default Userviewhistory;