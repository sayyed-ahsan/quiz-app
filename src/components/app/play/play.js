import React, { useEffect, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import ClockTimer from './clock';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const Play = () => {
    const [quizStart, setQuizStart] = useState(false);
    const [questions, setQuestions] = useState({
        id: 2031,
        q_date: "2024-03-03",
        durationInSecs: 120,
        game: {
            pic_url: "https://raw.githubusercontent.com/moatsoliman/projectresources/7df4f0d7a7793f39458c197aee53a9873a48a339/sample_pic.png",
            questions: [
                {
                    question: "How many red apples in the picture?",
                    answers: [
                        "1",
                        "2",
                        "3",
                        "7"
                    ],
                    corr_ans: 1
                },
                {
                    question: "How many oranges in the picture?",
                    answers: [
                        "3",
                        "8",
                        "1",
                        "0"
                    ],
                    corr_ans: 1
                },
                {
                    question: "how many bananas in the picture?",
                    answers: [
                        "4",
                        "2",
                        "3",
                        "1"
                    ],
                    corr_ans: 4
                }
            ]
        }
    });
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

        <div className='bg-white'>
            <div className='w-full rounded-[6px] sm:w-[660px] md:w-[700px] lg:w-[890px] xl:w-[1000px] mx-auto bg-[#4548e6] relative   min-h-screen'>

                {/* timer  */}
                {quizStart && <ClockTimer {...{ count, running, setCount }} />}

                {/* Quiz content start  */}
                {quizStart &&
                    <div className='max-w-[420px] md:max-w-[490px] p-4 mx-auto'>

                        {/* Questions Image */}
                        <InnerImageZoom
                            src={questions?.game?.pic_url}
                            zoomSrc={questions?.game?.pic_url}
                            zoomType="hover"
                            zoomPreload={true}
                            className='rounded-[10px]'
                        />

                        {/* Question */}
                        <p className='text-white/80 text-[18px] text-center font-semibold my-4'>
                            Questions : {questionIndex + 1}/{questions?.game?.questions.length}
                        </p>

                        <p className='text-white/90 text-[22px] text-center font-bold mt-4 mb-5'>
                            Qus : {questions?.game?.questions[questionIndex].question}
                        </p>

                        {/* Question Options  */}
                        {questions?.game?.questions[questionIndex].answers.map((answer, index) =>
                            <div key={answer}>
                                {!answerChecking ?
                                    <div
                                        className='border-[2px] border-white pl-[20px] py-3 mb-4 rounded-[12px] text-white hover:bg-white/20 duration-200'
                                        onClick={() => { singleQuestionAnswerCheck(answer); setGivenAnswerIndex(index) }}
                                    >
                                        <p className='cursor-pointer font-bold text-[18px]' >
                                            <span className='font-semibold mr-2'>
                                                {index === 0 && ' A.  '}
                                                {index === 1 && ' B.  '}
                                                {index === 2 && ' C.  '}
                                                {index === 3 && ' D.  '}
                                            </span>
                                            {'  '}
                                            {answer}
                                        </p>
                                    </div>
                                    :
                                    <>
                                        <div
                                            className={`pl-[20px] py-3 mb-4 rounded-[12px] border-[2px]  
                                            ${`${questions?.game?.questions[questionIndex]?.corr_ans}` === answer
                                                    ?
                                                    'border-[#05ff3b] text-[#05ff3b] bg-[#00ff622f]'
                                                    :
                                                    `${index === givenAnswerIndex ?
                                                        'border-[#ff0000] text-[#ff0000] bg-[#ff00002f]'
                                                        :
                                                        'border-[2px] border-white text-white'
                                                    }`
                                                } duration-100`}
                                        >
                                            <p className='cursor-pointer font-bold text-[18px]' >
                                                <span className='font-semibold mr-2'>
                                                    {index === 0 && 'A.'}
                                                    {index === 1 && 'B.'}
                                                    {index === 2 && 'C.'}
                                                    {index === 3 && 'D.'}
                                                </span>
                                                {'  '}
                                                {answer}
                                            </p>
                                        </div>
                                    </>
                                }
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default Play;
