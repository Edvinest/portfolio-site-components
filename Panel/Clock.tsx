import {useState, useEffect} from "react";

/*TODO: onClick show a calendar

  Basic Clock widget
*/

export default function Clock(){
    const [date, setDate] = useState(new Date());

    function refreshClock(){
        setDate(new Date());
    }
    useEffect(() =>{
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup(){
            clearInterval(timerId);
        }
    }, []);

    return(
        <li className="clock">
            {date.toLocaleTimeString()}
        </li>
    );
}