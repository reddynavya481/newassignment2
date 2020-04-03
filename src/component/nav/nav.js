import React, { Component } from 'react'
class nav extends Component
{
    render()
    {
        return(
            <div className="header">
                <label className="HelloUser"><h2>Welcome {this.props.username}</h2></label>
                 
                <button class="btn btn-outline-primary btn-sm m-0 waves-effect" onClick={this.props.onLogout}  className="LogoutBtn">LOGOUT</button> 
                </div>
        )
    }
}
export default nav;