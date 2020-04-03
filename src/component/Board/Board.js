import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd';
import './Board.css'
import '../../App.css'
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import Task from '../Task/Task'
class Board extends Component{
    
    state={
        tasklist:'',
        stage:'',
        drop:'',
        fromdrop:'',
        todrop:'',
        adddrop:'',
        modal:''
    }
    taskHadler = () => {
        this.setState((prevState) => {
           return{
              modal: !prevState.modal
           }
        })
     }
    HandleChange(event)
      {
          this.setState({tasklist:event.target.value})
      }
      HandleStage(event)
      {
          this.setState({stage:event.target.value})
      }
     addTask=()=>
        {
            let task1=this.props.task
             let TaskData=JSON.parse(localStorage.getItem(this.props.username))
            console.log(this.props.task)
            console.log( TaskData.boards[task1][0].Todo)
            let array = TaskData.boards[this.props.task].map(obj => {
                return Object.keys(obj)
            })
            let index = array.findIndex((ele) => {
                return ele == this.state.adddrop
            })
            TaskData.boards[task1][index][this.state.adddrop].push(this.state.tasklist)
            //TaskData.boards[task1][1].Done.push(this.state.tasklist)

            console.log(TaskData)
             localStorage.setItem(this.props.username,JSON.stringify( TaskData))
            // console.log(this.props.task)
            // console.log(TaskData.boards[task1][0].todo)
            this.setState({tasklist:''})
        }
        addStage=()=>
        {
            let TaskData=JSON.parse(localStorage.getItem(this.props.username))
            
            let array = TaskData.boards[this.props.task].map(obj => {
            return Object.keys(obj)
        })
        let index = array.findIndex((ele) => {
            return ele == this.state.drop
        })
        TaskData.boards[this.props.task].splice(index + 1, 0,{[this.state.stage]:[]} )
            // console.log(TaskData.boards[this.props.task])
            // let value=this.state.drop
            // let arr= Object.keys( TaskData.boards[this.props.task])
            // TaskData.boards[this.props.task].map(item=>{
            //     console.log(value,item)
            //     if(value===item)
            //     {
            //         let c=arr.indexOf(value)
            //         TaskData.boards[this.props.task][c+1]={[this.state.stage]:[]}
            //     }
            // })
            // console.log(TaskData)
            //TaskData.boards[this.props.task].push({[this.state.stage]:[]})
            localStorage.setItem(this.props.username,JSON.stringify( TaskData))

            this.setState({stage:''})
        }
        rearrage=()=>{
            let TaskData=JSON.parse(localStorage.getItem(this.props.username))
            let a1=TaskData.boards[this.props.task].map(item=>{
                return Object.keys(item)
            })
            let i1=a1.findIndex((ele)=>{
             return ele == this.state.fromdrop
            })
            console.log(i1)
            let i2=a1.findIndex((ele)=>{
                return ele == this.state.todrop
               })
               console.log(i2)
               TaskData.boards[this.props.task].splice(i2 + 1, 0, TaskData.boards[this.props.task][i1])
               console.log(TaskData)
               TaskData.boards[this.props.task].splice(i1,1)
               console.log(TaskData)
               localStorage.setItem(this.props.username,JSON.stringify(TaskData))
               this.forceUpdate()
        }
        deleteStage=()=>{
            let TaskData=JSON.parse(localStorage.getItem(this.props.username))
            let a1=TaskData.boards[this.props.task].map(item=>{
                return Object.keys(item)
            })
            let i1=a1.findIndex((ele)=>{
                return ele == this.state.fromdrop
               })
               let delarr=Object.values(TaskData.boards[this.props.task][i1])
            console.log(delarr)
            if((delarr.length)!==i1)
            {
                console.log(delarr.length)
                console.log(i1)
            let arr=Object.values(TaskData.boards[this.props.task][i1+1])
            console.log(arr)
            

            delarr.map((ele)=>{
                ele.map(el=>{
                    arr[0].push(el)
                })
                
            })
        }
            TaskData.boards[this.props.task].splice(i1,1)
            localStorage.setItem(this.props.username,JSON.stringify(TaskData))
            this.forceUpdate()
        }

        dropHadler=(e)=>{
            this.setState({drop:e.target.value})
        }
        fromdrop=(e)=>{
            this.setState({fromdrop:e.target.value})
        }
        todrop=(e)=>{
            this.setState({todrop:e.target.value})
        }
        adddrop=(e)=>{
            this.setState({adddrop:e.target.value})
        }
        taskHadler=()=>{

        }
    render(){
       let data=JSON.parse(localStorage.getItem(this.props.username))
       let value=this.state.drop
       let arr=data.boards[this.props.task]
       let optios=[]
       let stages=arr.map(item=>{
           optios.push(Object.keys(item))
       return <th scope="col">{Object.keys(item)}</th>
       })
       console.log()
        let  op =optios.map(item=>{
        return <option value={item}>{item}</option>
    
    })
    let array = data.boards[this.props.task].map(obj => {
        
        return <Col span={8}><Card title={Object.keys(obj)} style={{ width: 300 }}>
            {Object.values(obj).map(task => {
                return task.map((ele) => {
                    return <a onClick={this.taskHadler}> {ele}</a>
                })
            })}
        </Card></Col>
    })
    //    let tasks=data.boards[this.props.task][0].Todo.map(item=>{
    //        console.log(item)
    
    //         return <tr>
    //         <td >{item}</td></tr>
           
          
        
    //     })
    //     console.log(tasks)
        return(
            <div>
            <table>
                <tr>

                {/* <section class="mb-4">
          <div class="row">
          <div class="col-md-12 mb-md-0 mb-5">
          <div class="row">
          <div class="col-md-5">
            <div class="md-form mb-0"> */}
<td><label>Stage Add</label></td>
<div class="md-form">
<td><input class="form-control" id="ip2" type="text" placeholder="Add stage" value={this.state.stage} onChange={(event)=>this.HandleStage(event)}/></td>
</div>
{/* </div>
</div> */}
{/* <div class="col-md-4">
            <div class="md-form mb-0"> */}
<td><select class="browser-default custom-select" onChange={this.dropHadler} >
    {op}
</select></td>
{/* </div>
</div> */}
{/* <div class="col-md-3">
            <div class="md-form mb-0"> */}
<td><button class="btn btn-outline-primary btn-sm m-0 waves-effect" onClick={this.addStage}>Add Stage</button><br></br></td>
{/* </div>
</div>
</div> */}
</tr>
<tr>
<td><label>Rearrage tasks</label></td>
<td><select class="browser-default custom-select" onChange={this.fromdrop}>
    {op}
</select></td>
<td><select class="browser-default custom-select" onChange={this.todrop}>
    {op}
</select></td>
<td>
<button class="btn btn-outline-primary btn-sm m-0 waves-effect" onClick={this.rearrage}>Rearrage</button><br></br></td>
</tr>
<tr>
<td><label>Delete stage</label></td>
<td colSpan="2"><select class="browser-default custom-select" onChange={this.fromdrop}>
    {op}
</select></td>

<td><button class="btn btn-outline-primary btn-sm m-0 waves-effect" onClick={this.deleteStage}>Delete Stage</button><br></br></td>
</tr>
<tr>
    <td><label>Add Task</label></td>
    <div class="md-form">
<td><input class="form-control" id="ip1" type="text" placeholder="Enter task " onChange={(event)=>this.HandleChange(event)}/><br></br></td>
</div>
<td><select class="browser-default custom-select" onChange={this.adddrop} >
    {op}
</select></td>
<td><button class="btn btn-outline-primary btn-sm m-0 waves-effect" onClick={this.addTask}>Add</button></td>
{/* </div>
</div>
</section> */}
</tr>
</table>
                {/* <table class="table table-striped table-responsive-md btn-table">
                    <thead>
                        {stages}
                    </thead>
                 <tbody>
                     {
                        <tr>
                        
                        </tr>}
                    </tbody>  
                </table> */}
                <div className="site-card3">
                <Row gutter={16}>
                    {array}
                    </Row>
                </div>
                <Task
                modal={this.state.modal}
                taskHadler={this.taskHadler}/>
                
            </div>
        )
    }
}
export default Board;