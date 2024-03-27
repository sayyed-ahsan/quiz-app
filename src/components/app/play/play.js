import React, { useEffect, useState } from 'react';
import ClockTimer from './clock';

const Play = () => {
    const [quizStart, setQuizStart] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [givenAnswerIndex, setGivenAnswerIndex] = useState(0);
    const [answerChecking, setAnswerChecking] = useState(false);

    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(false);

    const handleCountdown = (seconds) => {
        setCount(seconds);
        setRunning(true)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/moatsoliman/projectresources/main/questions.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (!quizStart) {
                    setQuestions(data);
                    // handleCountdown(data?.durationInSecs)
                    handleCountdown(3600)
                    setQuizStart(true)
                }
            } catch (error) {
                console.error("Could not fetch the data", error);
            }
        };
        fetchData();
    }, []);

    if (quizStart) {
        if (count === 0) {
            setQuizStart(false)
        }
    }
    const changeQuestion = () => {
        setTimeout(() => {
            setQuestionIndex(questionIndex + 1)
            setAnswerChecking(false)
            console.log('next')
        }, 2000);
    }

    const singleQuestionAnswerCheck = (userAnswer) => {
        setAnswerChecking(true)
        if (questions?.game?.questions.length === questionIndex + 1) {
            alert('success')
        }
        else {
            if (userAnswer === `${questions?.game?.questions[questionIndex]?.corr_ans}`) {
                changeQuestion()
            }
            else {
                changeQuestion()
            }
        }
    }

    return (
        <div className='app'>

            {/* timer  */}
            {quizStart && <ClockTimer {...{ count, running, setCount }} />}

            {/* Quiz content start  */}
            {quizStart &&
                <div>
                    {/* Questions Image */}
                    <img className='max-w-[500px] rounded-[6px]' src={questions?.game?.pic_url} alt="" />
                    {/* Question */}
                    <p >{questions?.game?.questions[questionIndex].question}</p>

                    {/* Question Options  */}
                    {questions?.game?.questions[questionIndex].answers.map((answer, index) =>
                        <div key={answer}>
                            {!answerChecking ?
                                <p
                                    className='cursor-pointer text-white text-[20px]'
                                    onClick={() => { singleQuestionAnswerCheck(answer); setGivenAnswerIndex(index) }}
                                >
                                    {answer}
                                </p>
                                :
                                <p
                                    className={
                                        `cursor-pointer text-[20px] text-white 
                                        ${`${questions?.game?.questions[questionIndex]?.corr_ans}` === answer
                                            ?
                                            'text-green-400'
                                            :
                                            `${index === givenAnswerIndex && 'text-red-400'}`
                                        }`
                                    }
                                >
                                    {answer}
                                </p>
                            }
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default Play;
