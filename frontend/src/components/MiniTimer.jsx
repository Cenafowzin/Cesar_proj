import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Clock = styled.h2`
`

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`

function MiniTimer() {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(15);

    var timer;
    useEffect(() => {

        timer = setInterval(() => {

            setSeconds(seconds - 1);
            if(seconds===0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            }

        }, 850)

        return() => clearInterval(timer);

    });

    const stop = () => {
        clearInterval(timer);
    }

    useEffect(() => {
        if(seconds===0 & minutes===0){
            clearInterval(timer)
        }
    })

    return(
        <Container >
        <Clock>{minutes<10? "0"+minutes: minutes}:{seconds<10? "0"+seconds: seconds}</Clock>
        </Container>
    )
    
    
}

export default MiniTimer;