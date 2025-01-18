import { useState, useEffect, useRef } from "react"
import { download } from "../download";

export default function Main() {

    const [meme, setMeme] = useState({
        topText: "God forgives",
        bottomText: "But I don't",
        imageUrl: "https://i.imgflip.com/28s2gu.jpg", 
        color: "#FFFFFF"
    })
    const [allMemes, setAllMemes] = useState([])
    
    const divRef = useRef();

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function handleChange(event) {
        const {value, name} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    function getMemeImg() {
        const memeIndex = Math.floor(Math.random() * allMemes.length)
        setMeme(prevMeme => ({
            ...prevMeme, 
            imageUrl: allMemes[memeIndex].url
        }))
    }

    return (
        <main>

            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                
                <label className="colorInput">color
                    <input 
                        name="color"
                        type="color" 
                        value={meme.color}
                        onChange={handleChange}
                    /> 
                </label>

                <button onClick={getMemeImg}>Get a new meme image 🖼</button>
            </div>

            <div className="meme" ref={divRef}>
                <img src={meme.imageUrl} />
                <span 
                    className="top" 
                    style={{color: meme.color}}> {meme.topText}
                </span>
                <span 
                    className="bottom" 
                    style={{color: meme.color}}> {meme.bottomText}
                </span>
            </div>

            <button 
                className="downloadButton" 
                onClick={() => download(divRef)}> 
                    Download
            </button>

        </main>
    )
}