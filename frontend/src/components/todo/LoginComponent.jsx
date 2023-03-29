import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

var usernametobepassed;

function LoginComponent() {

    const [username, setUsername] = useState('')

    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
             
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        console.log("handlesubmit clicked")
        if(await authContext.login(username, password)){
            usernametobepassed=username
            console.log("called to welcome")
            navigate(`/welcome`)
        } else {
            setShowErrorMessage(true)
        }
    }

    return (
        <div className="Login" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
           
            {showErrorMessage && <div className="errorMessage">Authentication Failed.</div>}
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent
export {usernametobepassed}