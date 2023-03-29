import {Link} from 'react-router-dom'
import { usernametobepassed } from './LoginComponent'

function WelcomeComponent() {
    return (
        <div className="WelcomeComponent">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><h1>Welcome {usernametobepassed}</h1></div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <br></br>
        </div>
    )
}

export default WelcomeComponent