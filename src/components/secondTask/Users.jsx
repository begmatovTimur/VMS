import axios from "axios"
import { useEffect, useState } from "react"
import Albums from "./Albums"
import Posts from "./Posts"
import Todos from "./Todos"

export default function Users() {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState("")
    const [postModalVisible, setPostModalVisible] = useState(false)
    const [todosModalVisible, setTodosModalVisible] = useState(false)
    const [albumsModalVisible, setAlbumsModalVisible] = useState(false)


    useEffect(() => {
        axios({
            url: "https://jsonplaceholder.typicode.com/users",
            method: "GET"
        }).then((res) => {
            setUsers(res.data)
        })
    }, [])

    function showPosts(id) {
        setCurrentUser(id)
        setPostModalVisible(true)
    }

    function showTodos(id) {
        setCurrentUser(id)
        setTodosModalVisible(true)
    }

    function showAlbums(id) {
        setCurrentUser(id)
        setAlbumsModalVisible(true)
    }



    return (
        <div style={{ position: "relative" }}>
            <table className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((item, index) =>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td></td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => showPosts(item.id)}>posts</button>
                                    <button className="btn btn-info" onClick={() => showTodos(item.id)}>todos</button>
                                    <button className="btn btn-success" onClick={() => showAlbums(item.id)}>albums</button>
                                </td>
                                {
                                    postModalVisible
                                        ?

                                        currentUser === item.id
                                            ?
                                            <div className="container" style={{ position: "relative" }}>
                                                <Posts id={item.id} />
                                                <button className="btn btn-danger" style={{ position: "fixed", top: "70px", right: "10px", zIndex: "1" }} onClick={() => setPostModalVisible(false)}>x</button>
                                            </div>
                                            :
                                            ""
                                        :
                                        ""
                                }
                                {
                                    todosModalVisible
                                        ?

                                        currentUser === item.id
                                            ?
                                            <div className="container" style={{ position: "relative" }}>
                                                <Todos id={item.id} />
                                                <button className="btn btn-danger" style={{ position: "fixed", top: "70px", right: "10px", zIndex: "1" }} onClick={() => setTodosModalVisible(false)}>x</button>
                                            </div>
                                            :
                                            ""

                                        :
                                        ""
                                }
                                {
                                    albumsModalVisible
                                        ?
                                        currentUser === item.id
                                            ?
                                            <div className="container" style={{ position: "relative" }}>
                                                <Albums id={item.id} />

                                                <button className="btn btn-danger" style={{ position: "fixed", top: "70px", right: "10px", zIndex: "1" }} onClick={() => setAlbumsModalVisible(false)}>x</button>
                                            </div>
                                            :
                                            ""
                                        :
                                        ""
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
};
