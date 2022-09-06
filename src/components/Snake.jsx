import { useState } from 'react'
import './snake.scss'

export default function Snake() {
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    function goTop() {
        if (top <= 0) {
            alert("o'yindan chiqdiz")
        } else {
            setTop(top - 10)
        }
    }

    function goLeft() {
        if (left <= 0) {
            alert("o'yindan chiqdiz")
        } else {
            setLeft(left - 10)
        }
    }


    function goBottom() {
        if (top > 360) {
            alert("o'yindan chiqdiz")
        } else {
            setTop(top + 10)
        }
    }

    function goRight() {
        if (left > 360) {
            alert("o'yindan chiqdiz")
        } else {
            setLeft(left + 10)
        }
    }

    return (
        <div className="snakeBox bg-secondary">
            <div className="playground m-5" style={{ position: "relative" }}>
                <div className="snake" style={{ position: "absolute", top: `${top}px`, left: `${left}px` }}></div>
            </div>

            <div className="box">
                <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-light topBtn" onClick={goTop}>top</button>
                </div>

                <div className="d-flex justify-content-around">
                    <button className="btn btn-outline-light topBtn" onClick={goLeft}>left</button>
                    <button className="btn btn-outline-light topBtn" onClick={goBottom}>bottom</button>
                    <button className="btn btn-outline-light topBtn" onClick={goRight}>right</button>
                </div>
            </div>
        </div>
    )
};
