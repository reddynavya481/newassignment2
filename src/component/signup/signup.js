import React from 'react'
import { Component } from 'react';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd'
import 'antd/dist/antd.css';
import Home from '../Home/Home'
import Bar from '../nav/nav'
class Signup extends Component {
    log = false
    com = true
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submit: false
        }
        this.HandleChange = this.HandleChange.bind(this);
        this.HandlePassword = this.HandlePassword.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
        this.HandleLog = this.HandleLog.bind(this);
    }
    HandleSubmit() {
        if (this.state.username == "" || this.state.password == "") {
            alert("Enter Credentials")
            this.setState({ submit: false })
            this.com = false
        }
        else if (!localStorage.getItem(this.state.username) && this.com == true) {
            const obj = {
                username: this.state.username,
                password: this.state.password,
                boards: []
            }
            localStorage.setItem(this.state.username, JSON.stringify(obj))
        }

    }
    HandleLog() {
        this.setState({ submit: true })
        if (this.state.username == "" || this.state.password == "") {
            alert("Enter Credentials")
            this.setState({ submit: false })
            //this.log=!this.log
            this.com = false
        }
        else {
            let user = JSON.parse(localStorage.getItem(this.state.username))
            if (user) {
                if (this.state.password !== user.password) {
                    alert("Wrong Password!Please give correct credentials")
                    this.setState({ submit: false })
                }
                else {
                    this.log = !this.log
                }
            }
            else {
                alert("user ot exist")
                this.setState({ submit: false })

            }

        }

        this.setState({ username: this.state.username, password: this.state.password })


    }
    HandleChange(event) {
        this.setState({ username: event.target.value })
    }
    HandlePassword(event) {
        this.setState({ password: event.target.value })
    }
    handleLogout = (e) => {

        console.log(this.com)
        //this.log=!this.log;
        this.setState({
            username: '',
            password: '',
            submit: false
        })

        console.log(this.state)
        this.com = !this.com
        console.log(this.com)

    }
    render() {
        return (
            <div>
                {this.state.submit ? 
                <Home username={this.state.username} password={this.state.password} onLogout={this.handleLogout} />
                    :
                    <div className={this.log ? "hide" : "show"}>

                        <div style={{
                            backgroundColor: 'pink',
                            backgroundPosition: 'center'
                        }}>
                            <h2 align="center" >Sign Up</h2>
                            Username:<Input type="text" size="large" prefix={<UserOutlined />} suffix={
                                <Tooltip title="Enter Username">
                                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>}
                                className="inputi" name="username" style={{ width: '20%' }} onChange={this.HandleChange} /><br />
                            Password:<Input.Password size="large" placeholder="enter password" name="password" onChange={this.HandlePassword} style={{ width: '20%' }} /><br />

                            <Button type="primary" onClick={this.HandleLog} style={{ marginLeft: '80px' }}>Login</Button>
                            <Button type="default" onClick={this.HandleSubmit} style={{ marginLeft: '7px' }} >Don't have an account?Register</Button>
                        </div>
                    </div>
                }
            </div>



        )
    }
}
export default Signup;
