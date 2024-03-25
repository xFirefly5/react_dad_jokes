import axios from "axios";
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from "react";
import Joke from "./Joke";


function JokeList({ numJokes = 7 }) {
    const JOKE_API = `https://icanhazdadjoke.com/`;

    const [jokes, setJokes] = useState(JSON.parse(window.localStorage.getItem("jokes")) || []);
    const [isLoading, setIsLoading] = useState(false);

    const seenJokes = new Set(jokes.map(j => j.text));
    

    useEffect(() => { if (jokes.length === 0) getJokes() }, []);
    useEffect(() => {window.localStorage.setItem("jokes", JSON.stringify(jokes))}, [jokes]);

    const getJokes = async () => {
        try {
            let jokes = [];

            while (jokes.length < numJokes) {
                const response = await axios.get(JOKE_API, { headers: { Accept: "application/json" } });
                let newJoke = response.data.joke;
                if (!seenJokes.has(newJoke)) {
                    jokes.push({ text: newJoke, id: uuid(), votes: 0 })
                }
            };
            setJokes(oldJokes => [...oldJokes, ...jokes]);
            setIsLoading(false);
  
            window.localStorage.setItem("jokes", JSON.stringify(jokes));
        } catch (err) {
            alert(err);
            setIsLoading(false);
        };
       
    };

    const handleVote = (id, delta) => {
        const votedJoke = jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta} : j);     
        setJokes(votedJoke);
    };

    const handleClick = () => {
        setIsLoading(true, getJokes());
        // getJokes()
    };

    const handleDelete = (id) => {
        const theJoke = jokes.filter(j => j.id !== id);
        setJokes(theJoke);
    };

    // jokes.sort((a, b) => b.votes - a.votes);

    return (
        <>
            {isLoading &&
                <div className="spinner">
                    <i className="far fa-8x fa-laugh fa-spin"></i>
                    <h1>Loading...</h1>
                </div>
            }
           
            { !isLoading &&
                <div className="JokeList">
                    <div className="JokeList-sidebar">
                        <h1><span>Dad</span> Jokes</h1>
                        <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                        <button className="JokeList-button" onClick={handleClick}> 7 New Jokes</button>
                    </div>
                    <div className="JokeList-jokes">
                        {  (jokes.length === 0 ) &&
                            <div className="EmtyDiv">
                                <h1>Empty list of jokes</h1>
                                <i className="em em-zany_face" aria-role="presentation" aria-label="GRINNING FACE WITH ONE LARGE AND ONE SMALL EYE"></i>
                            </div>
                        }
                        {jokes.map(j => (
                            <Joke
                                j={j}
                                key={uuid()}
                                upVote = {() => handleVote(j.id, 1)}
                                downVote={handleVote}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            }
        </>
       
    )
}

export default JokeList