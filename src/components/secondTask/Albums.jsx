import { useState, useEffect } from "react"
import axios from "axios"

export default function Albums(id, close) {
    const [albums, setAlbums] = useState([])


    useEffect(() => {
        axios({
            url: `https://jsonplaceholder.typicode.com/albums?userId=${id.id}`,
            method: "GET"
        }).then((res) => {
            setAlbums(res.data)
        })
    }, [])


    return (
        <table className="table bg-white" style={{ position: "fixed", top: "100px", left: "100px", zIndex: "1" }}>
            <thead>
                <tr>
                    <th>title</th>
                </tr>
            </thead>

            <tbody>
                {
                    albums.map((item) =>
                        <tr>
                            <td>{item.title}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
};
