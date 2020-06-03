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
                            <div className="login">LOG IN</div>
                            <div className="hi">Hi, Welcomeback to My Library</div>
                            <form className="form-input">
                                <input className="email" type="email" placeholder="Email"/>
                                <input className="password"type="password" placeholder="Password"/>
                                <div class="forgot">
                                    <a href="#">Forgot Password</a>
                                </div>
                                <div className="button">
                                <input type="submit" className="login-btn" value="LOG IN"/>
                                <input type="submit" className="signup-bnt" value="SIGN UP"/>
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