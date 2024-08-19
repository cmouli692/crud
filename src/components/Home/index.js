import {v4 as uuidv4} from "uuid"
import { Audio } from 'react-loader-spinner'

import {Component} from "react"
import "./index.css"

class Home extends Component{

    state = {userDetails : {}, username : "" , password : "" ,userDetailsList : [] , isLoading : false}

    componentDidMount(){

        console.log("component mounted")

        this.getUserDetails()
       
    }

    getUserDetails = async () => {

        this.setState({isLoading : true})
        const url = "https://crudbackend-wsrv.onrender.com"
        // const url = "http://localhost:3001"
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)

        await this.setState((prevState) => (
            {userDetailsList : [...prevState.userDetailsList,...data]}
        ))
        this.setState({isLoading : false})
    }

    onChangeUsername = (e) => {

        this.setState({username : e.target.value})
    }

    onChangePassword = (e) => {
        this.setState({password : e.target.value})
    }

    onSubmitForm = async(e) => {
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

        const response = await fetch(url,options)
        const data = await response.json()
        
        
      

        this.setState((prevState) => ( {
            userDetailsList: [...prevState.userDetailsList, ...data]
        }))


        

       

    

     
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

    renderLoadingContainer = () => {
        <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
        />

    }

    render(){
        const {isLoading} = this.state
        return(
            <div className="home-page-main-container">
                <h1>POST METHOD</h1>
                {this.formContainer()} 
                {isLoading ? this.renderLoadingContainer() :this.postDetailElementsContainer()}
            </div>
        )
    }
}


export default Home
