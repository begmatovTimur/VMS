import { useState } from "react"
import Snake from "./components/Snake"
import Users from "./components/secondTask/Users"
import Tasks from './components/Tasks'

export default function App() {
    const [task, setTask] = useState("")

    function writing(e) {
        let val = e.target.value
        if (val === "") {
            setTask("")
        } else if (val === "1") {
            setTask(<Users />)
        } else if (val === "2") {
            setTask(<Snake />)
        } else if (val === "3"){
            setTask(<Tasks />)
        }
    }

    return (
        <div className="container my-5">
            <input type="number" className="form-control" onChange={writing} />
            {
                task
            }
        </div>
    )
};
