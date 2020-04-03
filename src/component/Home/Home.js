import React, { Component } from 'react';
//import {Form, Button,Label,Input} from 'reactstrap';
import { Link, Switch, Route } from 'react-router-dom';
import Board from '../Board/Board';
import '../../App.css'
import './Home.css'
//import { Card } from 'antd';
import { Button, Calendar, Layout,Input } from 'antd'
import 'antd/dist/antd.css';
import { Card, Col, Row } from 'antd';
const { Content, Sider, Header } = Layout;
export default class BoardGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            password: this.props.password,
            boardName: null,
            boardData: null,
            toggle: false,
            click: false

        }
    }
    handleClick = (e) => {
        this.setState({ click: true })
    }
    handleNewBoard = (e) => {
        e.preventDefault();
        if (e.target.value === "" || e.target.value === null) {
            alert("enter a correct name");
            return;
        }
        this.setState({ boardName: e.target.value });
    }
    handleSubmit = () => {
        console.log(this.state)
        let boardData = JSON.parse(localStorage.getItem(this.props.username));
        let board = boardData.boards
        board = { ...board, [this.state.boardName]: [{ Todo: [] }, { Done: [] }] }
        boardData.boards = board

        this.setState({ boardData: boardData })
        localStorage.setItem(this.state.username, JSON.stringify(boardData))
        this.setState({ boardName: '' });
    }
    toggleHadler = () => {
        this.setState({ toggle: true })

    }
    togglehad = () => {
        this.setState({ toggle: false })

    }
    render() {
        let boardList = JSON.parse(localStorage.getItem(this.props.username));
        let arr = []
        let arr2 = []
        let i = 0;
        if (boardList) {

            let arr1 = Object.keys(boardList.boards)
            console.log(arr1)
            arr = arr1.map((item) => {
                i++;
                return  <div><Link to={`/${item}`} onClick={this.toggleHadler}>{item}</Link></div>
            })
            arr2 = arr1.map(item => {
                return <Route path={`/${item}`}><Board username={this.props.username} task={item} /></Route>
            })
        }
        return (
            <div>
                <div>
                    <h1 style={{ backgroundColor: 'pink', height: '60px' }}>Hello {this.props.username}</h1>
                    <button onClick={this.props.onLogout} className="LogoutBtn">LOG OUT</button>
                </div>
                <Layout>
                {!this.state.toggle ?
                    
                        <div class="md-form">
                            <Header>
                                <Button type="dashed" onClick={() => this.handleClick()}>Create new board +</Button>
                                {this.state.click ?
                                    <div>
                                        <Input type="text" placeholder="name your board" value={this.state.boardName} style={{ width: '30%' }} onChange={this.handleNewBoard} />
                                        <Button style={{ width: '20%' }} onClick={this.handleSubmit}>create!</Button><br />
                                    </div>
                                    : null}
                            </Header>
                            {/* <input class="form-control form-control-lg" type="text" placeholder="Enter Board " onChange={this.handleNewBoard}/>
                <Button type="primary" class="btn btn-outline-primary btn-sm m-0 waves-effect" onClick={this.handleSubmit}> submit</Button> */}
                            <div className="site-card-wrapper" justify="space-around" align="middle" style={{marginTop:'100px'}}>
                                <Card title="Boards" align="middle" style={{width:'50%',borderColor:'black'}}>
                                    {arr}
                                </Card>
                            </div>

                        </div>:
                        <div>
                            <button onClick={this.togglehad} class="btn btn-outline-primary btn-sm m-0 waves-effect">back</button>
                            <Switch>
                                {arr2}

                            </Switch>
                        </div>}
                </Layout>
        </div>
        
                );
            }
}