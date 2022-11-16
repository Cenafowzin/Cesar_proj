import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Clock = styled.h1`
    color: #862CBD
`

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    color: #471F7A;
    background-color: #F5F5F5;
    height: 600px;
`

function Timer() {

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
        <h3>Você obterá uma resposta em até 15 minutos:</h3>
        <Clock>{minutes<10? "0"+minutes: minutes}:{seconds<10? "0"+seconds: seconds}</Clock>
        </Container>
    )
    
    
}

export default Timer;