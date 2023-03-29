import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoApiService"
import { usernametobepassed } from "./LoginComponent"

function ListTodosComponent() {

    const[todos,setTodos]=useState([])

    useEffect(
        ()=> refreshTodos() , []
    )
    
    function refreshTodos(){
    retrieveAllTodosForUsernameApi(usernametobepassed)
        .then(  response => { 
            console.log(response.data)
                              setTodos(response.data)
                            }
        )
        .catch((error)=> console.log(error))
    }

    const[message,setMessage] = useState(null)

    function deleteTodo(id){
        deleteTodoApi(usernametobepassed,id)
        .then(
            ()=>{
                setMessage(`Delete Todo ID: ${id} - Successful`)
                refreshTodos()
            }
        )
        .catch((error)=> console.log(error))
    }

    const navigate = useNavigate()

    function updateTodo(id){
       navigate(`/todo/${id}`)
    }

    function addNewTodo(){
        navigate(`/todo/-1`)
    }

    return (
        <div className="container">
            <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><h1>Things You Want To Do!</h1></div>
            {message && <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} className="alert alert-warning">{message}</div>}
            
            <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <table className="table">
                    <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Done?</th>
                                <th>Target Date</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>                                   
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" 
                                        onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" 
                                        onClick={()=>updateTodo(todo.id)}>Update</button></td>                                
                                </tr>
                            )
                        )
                    }
                    </tbody>

                </table>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >
               <button style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} 
                    onClick ={addNewTodo} className="btn btn-success m-5">
                Add new To-do
               </button> 
            </div>
        </div>
    )
}

export default ListTodosComponent