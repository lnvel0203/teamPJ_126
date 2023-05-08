import React, { useEffect } from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {datatrans, dataSchedule} from './DataContent';

const Dictaphone = () => {
    const {transcript, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();
   
    useEffect(() => {
      
        return () => {
          
            checking();
        }
    }, [transcript])

    console.log(transcript);
    var word = transcript.split(" ");

    const checking = () =>{
        console.log("체크",word[word.length-1]);

        if((word[word.length-1])==='야'){

            const features = "width=400,height=600,top=100,left=100";
            window.open("/message", "_blank", features);
          
        }
        else if((word[word.length-1])==='캘린더'){

            datatrans();
        }

        else if((word[word.length-1])==='스케줄'){

            dataSchedule();
        }
    }
   

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesnt support speech recognition.</span>;
    }

    return (
        <div>
       
            <p
                onMouseMove={SpeechRecognition
                    .startListening({continuous: true, language: 'ko'})}/>
    
            <p onMouseMove={resetTranscript}/>
            <p>{transcript}</p>
        

           
        </div>
    );
};
export default Dictaphone;