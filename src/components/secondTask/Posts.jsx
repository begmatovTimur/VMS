import { useState, useEffect } from "react"
import axios from "axios"

export default function Posts(id) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios({
            url: `https://jsonplaceholder.typicode.com/posts?userId=${id.id}`,
            method: "GET"
        }).then((res) => {
            setPosts(res.data)
        })
    }, [])


    return (
        <table className="table bg-white" style={{ position: "fixed", top: "100px", left: "100px", zIndex: "1" }}>
            <thead>
                <tr>
                    <th>title</th>
                    <th>body</th>
                </tr>
            </thead>

            <tbody>
                {
                    posts.map((item) =>
                        <tr>
                            <td>{item.title}</td>
                            <td>{item.body}</td>
                        </tr>
                    )
                }
            </tbody>
        </table >
    )
};
