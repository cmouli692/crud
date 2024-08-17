import {v4 as uuidv4} from "uuid"

import {Component} from "react"
import "./index.css"

class Home extends Component{

    state = {userDetails : {}, username : "" , password : "" ,userDetailsList : []}

    componentDidMount(){

        console.log("component mounted")

        this.getUserDetails()
       
    }

    getUserDetails = async () => {
        const url = "https://crudbackend-wsrv.onrender.com"
        // const url = "http://localhost:3001"
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)

       await this.setState((prevState) => (
            {userDetailsList : [...prevState.userDetailsList,...data]}
        ))
    }

    onChangeUsername = (e) => {

        this.setState({username : e.target.value})
    }

    onChangePassword = (e) => {
        this.setState({password : e.target.value})
    }

    onSubmitForm = (e) => {
        e.preventDefault()
        const {username,password } = this.state
        const userObject = {
            id : uuidv4(),
            username,
            password

        }

        const url = "https://crudbackend-wsrv.onrender.com"

        // const url = "http://localhost:3001"
        const  options  = {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(userObject)
        }

        fetch(url,options)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(this.setState({username : "", password : ""}))
        .then(this.getUserDetails())
        .catch(err => console.error("Error:",err))


        

       

    

     
    }

    formContainer = () => {
        const {username,password } = this.state
        return(
        <form onSubmit={this.onSubmitForm}>
            <div className="username-container"> 
               <label htmlFor="username">USERNAME</label>
               <br/>
               <input id="username" type="text" onChange={this.onChangeUsername} value={username} required/> 
            </div>
            
            
            <div className="password-container">
                <label htmlFor="password" >PASSWORD</label>
                <br/>
                <input id ="password" type ="password" onChange={this.onChangePassword} value={password} required/> 
            </div>
            <div className="button-container">
                <button type="submit" className="post-btn">Post</button>
            </div>
            
        </form>


        )
    }

    postDetailElementsContainer = () => {
        const {userDetailsList} = this.state 
       return( <ul className="user-details-elements-container">

        {userDetailsList.map((eachUserDetails) => {
            const {username,id}= eachUserDetails
            console.log(id)
          return (<li key={id} className="post-element-container">
                    <p>{username}</p>
                    <p>****</p>

                </li>) 
        })}
        
       
        
        </ul>)
    }

    render(){
        return(
            <div className="home-page-main-container">
                <h1>POST METHOD</h1>
                {this.formContainer()} 
                {this.postDetailElementsContainer()} 
            </div>
        )
    }
}


export default Home
