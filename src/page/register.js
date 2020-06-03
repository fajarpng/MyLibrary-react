import React, {Component} from 'react'
import logo from '../asets/logo.png'
class Register extends Component{
    render(){
        return(
            <>
                <div className="page">
                    <div className="side-left">
                        <div class="darker">
                            <div className="words"> Book is a window to the world</div>
                            <div className="wm"> Photo by ???</div>
                        </div>
                    </div>
                    <div className="side-right">
                        <div className="nav">
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="form">
                            <div className="login">SIGN UP</div>
                            <div className="hi">Hi, Welcome to My Library</div>
                            <form className="form-input">
                                <input className="user" type="text" placeholder="Username"/>
                                <input className="email" type="email" placeholder="Email"/>
                                <input className="password"type="password" placeholder="Password"/>
                                <div className="button">
                                <input type="submit" className="signup-b" value="SIGN UP"/>
                                <input type="submit" className="login-b" value="LOG IN"/>
                            </div>
                            </form>   
                        </div>
                        <div className="disclimer">

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Register