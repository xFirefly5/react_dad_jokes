
function Joke({ j, upVote, downVote, handleDelete }) {
    
    const getColor = () => {
        if (j.votes >= 10) {
            return "#4CAF50";
        } else if (j.votes >= 8) {
            return "#8BC34A";
        } else if (j.votes >= 6) {
            return "#CDDC39";
        } else if (j.votes >= 4) {
            return "#FFEB3B";
        } else if (j.votes >= 2) {
            return "#FFC107";
        } else if (j.votes >= 0) {
            return "#FF9800";
        } else {
            return "#f44336";
        }
    };

    const getEmoji = () => {
        if (j.votes >= 10) {
            return "em em-rolling_on_the_floor_laughing";
        } else if (j.votes >= 8) {
            return "em em-laughing";
        } else if (j.votes >= 6) {
            return "em em-smiley";
        } else if (j.votes >= 4) {
            return "em em-slightly_smiling_face";
        } else if (j.votes >= 2) {
            return "em em-neutral_face";
        } else if (j.votes >= 0) {
            return "em em-confused";
        } else {
            return "em em-pouting_cat"
        }
    };

    return (
        <div className="Joke">
            <div className="Joke-buttons">
                <i className="fas fa-arrow-up" onClick={upVote}></i>
                <span style={{borderColor:getColor()}}>{j.votes}</span>
                <i className="fas fa-arrow-down" onClick={() => downVote(j.id, -1)}></i>
            </div>
            <div className="Joke-text">
                {j.text}
                <i onClick={() => handleDelete(j.id)} className="fa-regular fa-trash-can"></i>
            </div>
            <div className="Joke-emoji"><i className={getEmoji()}></i></div>
        </div>
    )
}

export default Joke