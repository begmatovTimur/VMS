import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'


export default function Tasks() {
    const [lessons, setLessons] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [taskModalVisible, setTaskModalVisible] = useState(false)
    const [currentTask, setCurrentTask] = useState("")
    const [click, setClick] = useState(false)
    const resetTask = { lesson: "", name: "", url: "" }
    const { register, handleSubmit, reset } = useForm("")

    useEffect(() => {
        let x = localStorage.getItem("tasks")
        setLessons(x ? JSON.parse(x) : [])
    }, [])

    function addTask(data) {
        let obj = {
            lesson: data.lesson,
            videos: [
                {
                    name: data.name,
                    url: data.url
                }
            ]
        }

        if (currentTask === "") {
            lessons.push(obj)
        } else {
            lessons[currentTask].lesson = obj.lesson
            lessons[currentTask].videos.push(obj.videos[0])
            setCurrentTask("")
        }

        setLessons([...lessons])
        setClick(false)
        closeModal()
        reset(resetTask)
        saveToLocalStorage()
    }

    function deleteTask(i) {
        lessons.splice(i, 1)
        setLessons([...lessons])
        saveToLocalStorage()
    }

    function closeModal() {
        setTaskModalVisible(false)
        setModalVisible(false)
        reset(resetTask)
    }

    function showVideos(i) {
        setCurrentTask(i)
        setModalVisible(false)
        setTaskModalVisible(true)
    }

    function showModal() {
        setModalVisible(true)
        setTaskModalVisible(false)
    }

    function addVideo() {
        setClick(true)
    }

    function editTask(i) {
        setCurrentTask(i)
        let currentTask = lessons[i]
        reset(currentTask)
        setModalVisible(true)
    }

    function saveToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(lessons))
    }

    return (
        <div className="container">
            <button className="btn btn-primary" onClick={showModal}>+</button>

            <table className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lessons.map((item, index) =>
                            <tr>
                                <td onClick={() => showVideos(index)}>{item.lesson}</td>
                                <td>
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => editTask(index)}>edit</button>
                                        <button className="btn btn-danger" onClick={() => deleteTask(index)}>x</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {
                modalVisible
                    ?
                    <div style={{ width: "400px", height: "400px" }} className="card">
                        <form onSubmit={handleSubmit(addTask)}>
                            <input type="text" className="form-control" placeholder="lessonName" {...register("lesson")} />

                            {
                                click
                                    ?
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="videoName" {...register("name")} />
                                        <input type="text" className="form-control" placeholder="videoUrl" {...register("url")} />
                                    </div>
                                    :
                                    ""
                            }


                            <button className="btn btn-primary">+</button>
                            <button className="btn btn-dark" type="button" onClick={addVideo}>add video</button>
                            <button className="btn btn-danger" onClick={closeModal}>close</button>
                        </form>
                    </div>
                    :
                    ""
            }

            {
                taskModalVisible
                    ?
                    <div style={{ width: "400px", height: "400px" }} className="card">
                        {
                            lessons.map((item, index) =>
                                currentTask === index
                                    ?
                                    <div>
                                        <table className="table">
                                            <thead>
                                                <th>video name</th>
                                                <th>video url</th>
                                                <th>
                                                    <button className="btn btn-outline-danger" onClick={closeModal}>close</button>
                                                </th>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.videos.map((item) =>
                                                        <tr>
                                                            <td>{item.name}</td>
                                                            <td>
                                                                <a href={item.url}>{item.url}</a>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                    :
                                    ""
                            )
                        }
                    </div>
                    :
                    ""
            }
        </div>
    )
};
