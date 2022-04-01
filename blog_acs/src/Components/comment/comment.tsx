import React, {useEffect} from "react";
import "./comment.sass"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useState} from "react";
import {Socket} from "socket.io-client"

interface commentInterface {
    isLikedByUser:boolean,
    likes_NB:number
    author: {username:string},
    created:string,
    image:string,
    text:string,
    id:string,
    currentLoggedUser: {_id:string},
    socket:  Socket
}
export default function Comment({isLikedByUser, likes_NB, author, created, image, text, id, socket}:commentInterface){
    const [isLiked, setIsLiked] = useState(isLikedByUser || false)
    let [likesNB, setLikes] = useState(likes_NB || 0)

    const likeButtonHandler = () =>{
        socket.emit("likeChange",
            id,
            (err:string)=> {
                //if isliked == true, then decrease nb of likes before setting isLiked as false
                if (!err) {
                    !isLiked ? setLikes(likesNB + 1) : setLikes(likesNB - 1)
                    setIsLiked(!isLiked)
                }
            })
    }
    return(
        <div className={"comment_container"}>
            <div className="left">
                <img className={"profile_image"} src={image} alt=""/>
                <div className="reactions">
                    <span className="likes_container" onClick={likeButtonHandler} id={"hearth"}>
                        {isLiked?
                            <FavoriteIcon className={"heart_icon"}/>:
                            <FavoriteBorderIcon className={"heart_icon"}/>
                        }
                        <span className={"likes_total"}>{likesNB}</span>
                    </span>
                    <ReplyAllIcon className={"reply"}/>
                </div>
            </div>
            <div className="right">
                <div className="top">
                    <strong className={"username"}>
                        {author.username}
                    </strong>
                    <span className="creation_date">
                        {created}
                    </span>
                </div>
                <p className={"comment_text"}>
                    {text}
                </p>
            </div>
        </div>
    )
}