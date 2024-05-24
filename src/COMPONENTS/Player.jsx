import { useState } from "react";
export default function Player({name , symbol , isActive , onChangeName}){

    const [PlayerName , setPlayerName]=useState(name);

    const [isEditing , setIsEditing]=useState(false);

    function handleClick(){
        setIsEditing((editing) => !editing);

        if(isEditing){
            onChangeName(symbol , PlayerName);
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editPlayerName =<span className="player-name">{PlayerName}</span>;

    if(isEditing){
       editPlayerName=<input type="text" required value={PlayerName} onChange={handleChange}/>;
    }

    return(
        <li className={isActive ? "active" : undefined}>
        <span className="player">
           {editPlayerName}
           <span className="player-symbol">{symbol}</span>
         </span>
          <button onClick={handleClick}>{isEditing ? "Save" : "Edit" }</button>
        </li>

    );
}