import {useState} from 'react';
import './../../assets/css/Dashboard.css';

/*
Dark green #233018 rgba(35, 48, 24, 1)
Background #B8B28C rgba(184, 178, 140, 1)
Main heading writing color #EEEDEE
Lines color #6D7D67
Ek white
font Astro Armada Expanded
*/

const background_color = "rgba(184, 178, 140, 1)";
const darkColor = "rgba(35, 48, 24, 1)";


const tmp2 = [{
    "assign":"Ali",
    "goal":"176",
    "achieve":"123",
    "progress":"69.8%"
},{
    "assign":"GM",
    "goal":"107",
    "achieve":"103",
    "progress":"96.2%"
},{
    "assign":"Azhar",
    "goal":"182",
    "achieve":"23",
    "progress":"12.6%"
},{
    "assign":"Noman",
    "goal":"107",
    "achieve":"103",
    "progress":"96.2%"
},{
    "assign":"Haseeb",
    "goal":"182",
    "achieve":"23",
    "progress":"12.6%"
}]

const tmp = [{
    "name":"Plan1",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "progress":"60%"
},{
    "name":"Plan2",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "progress":"20%"
},{
    "name":"Plan3",
    "sdate":"10-1-2021",
    "edate":"12-1-2021",
    "progress":"92%"
}]

function Dashboard () {


    var [userNumbers, setUserNumbers] = useState("561");
    var [planNumbers, setPlanNumbers] = useState("269");
    var [activeGoalNumber, setActiveGoalNumber] = useState("100");

    var [plans, setPlan] = useState(tmp);

    var [goals, setGoals] = useState(tmp2);

    const fontSizeValue = "calc(2px + 2vmin)";

    return <div className="dashboard">
            <div className="container">
                <div className="row align-item-center">
                    <div className="col-4 col-sm-3 offset-sm-3 top-buffer">
                        <button className="circular-progress">
                            <h3>{userNumbers}
                                <label>Users</label>
                            </h3>
                        </button>
                    </div>
                    <div className="col-4 col-sm-3 top-buffer">
                        <button className="circular-progress">
                            <h3>{planNumbers}
                                <label>Plans</label>
                            </h3>
                        </button>
                    </div>
                    <div className="col-4 col-sm-3 top-buffer">
                        <button className="circular-progress">
                            <h3>{activeGoalNumber}
                                <label>Goals</label>
                            </h3>
                        </button>
                    </div>
                </div>

                <div className="row top-buffer">        
                    <div className="col-12 col-md-9 col-lg-9 col-xl-9  offset-xl-3  offset-lg-3 offset-md-3 offset-0 card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 header">
                                    <b>Active Plans</b>
                                </div>
                            </div>

                            <div className="row justify-content-center subheader" >
                                <div className="col-3" style={{fontSize:fontSizeValue}}>Plan Name </div>
                                <div className="col-3" style={{fontSize:fontSizeValue}}>Start Date</div>
                                <div className="col-3" style={{fontSize:fontSizeValue}}>End Date </div>
                                <div className="col-3" style={{fontSize:fontSizeValue}}>Progress </div>
                            </div>
                            <hr className="divider"/>   

                            {/* Here wil go dynamic UI */}
                            {plans.map( ({name, sdate, edate, progress}, index) => {
                                return <div key={index} className="row justify-content-center" style={{marginTop:"20px"}}>
                                    <div className="col-3" style={{fontSize:fontSizeValue}}>{name} </div>
                                    <div className="col-3" style={{fontSize:fontSizeValue}}>{sdate}</div>
                                    <div className="col-3" style={{fontSize:fontSizeValue}}>{edate} </div>
                                    <div className="col-3" style={{fontSize:fontSizeValue}}>{progress} </div>
                                </div>                                    
                            })}
                        </div>
                    </div>
                </div>

                <div className="row top-buffer">        
                    <div className="col-12 col-md-9 col-lg-9 col-xl-9  offset-xl-3  offset-lg-3 offset-md-3 offset-0 card">
                        <div className="card-body">
                            <div className="row header" >
                                <div className="col-12">
                                    <b>Active Goals</b>
                                </div>
                            </div>

                            
                            <div className="row justify-content-center subheader">
                                <div className="col-3" style={{fontSize:fontSizeValue}}>Assigned </div>
                                <div className="col-3" style={{fontSize:fontSizeValue}}>Goal</div>
                                <div className="col-3" style={{fontSize:fontSizeValue}}>Achieved </div>
                                <div className="col-3" style={{fontSize:fontSizeValue}}>Percentage </div>
                            </div>
                            <hr className="divider"/>   

                            {/* Here wil go dynamic UI */}
                            {/* Here wil go dynamic UI */}
                            {goals.map( ({assign, goal, achieve, progress}, index) => {
                                return <div key={index} className="row justify-content-center" style={{marginTop:"20px"}}>
                                    <div className="col-3" style={{fontSize:fontSizeValue}}>{assign} </div>
                                    <div className="col-3" style={{fontSize:fontSizeValue}}>{goal}</div>
                                    <div className="col-3" style={{fontSize:fontSizeValue}}>{achieve} </div>
                                    <div className="col-3" style={{fontSize:fontSizeValue}}>{progress} </div>
                                </div>                                    
                            })}
                        </div>
                    </div>
                </div> {/*end row*/}

                {/* Footer */}
                <div className="top-buffer"></div>
            </div>
            <br/><br/><br/>
    </div>
}
export default Dashboard;