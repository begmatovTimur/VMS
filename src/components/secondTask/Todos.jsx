import { useState, useEffect } from "react"
import axios from "axios"

export default function Todos(id) {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        axios({
            url: `https://jsonplaceholder.typicode.com/todos?userId=${id.id}`,
            method: "GET"
        }).then((res) => {
            setTodos(res.data)
        })
    }, [])


    return (
        <div>
            <table className="table bg-white" style={{ position: "fixed", top: "100px", left: "100px", zIndex: "1" }}>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>body</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        todos.map((item) =>
                            <tr>
                                <td>{item.title}</td>
                                <td>{item.completed}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
};
