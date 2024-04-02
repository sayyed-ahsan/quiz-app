import React, { useEffect, useRef, useState } from 'react';
import { BsSkipForwardFill } from "react-icons/bs";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import ClockTimer from './clock';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const Play = () => {

    const splideRef = useRef();
    const [quizStart, setQuizStart] = useState(false);
    const [showQus, setShowQus] = useState(false);
    const [questions, setQuestions] = useState();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionIndex2, setQuestionIndex2] = useState(questionIndex + 1);
    const [givenAnswerIndex, setGivenAnswerIndex] = useState(0);
    const [answerChecking, setAnswerChecking] = useState(false);
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleCountdown = (seconds) => {
        setCount(seconds);
        setRunning(true)
    };

    const goToRight = () => {
        splideRef.current.splide.go('>');
    };

    useEffect(() => {
        setShowResult(false)
        let UserObject = localStorage.getItem('user')
        UserObject = JSON.parse(UserObject)
        if (UserObject) {
            const fetchData = async () => {
                try {
                    const response = await fetch('https://raw.githubusercontent.com/moatsoliman/projectresources/main/questions.json');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    if (!showQus) {
                        setQuestions(data);
                        setQuestionIndex(UserObject.quesIndex)
                        if (UserObject.quesIndex === 0) {
                            handleCountdown(data.durationInSecs)
                        }
                        else {
                            handleCountdown(0)
                        }
                        setQuizStart(true)
                    }
                } catch (error) {
                    console.error("Could not fetch the data", error);
                }
            };
            fetchData();
        }
        else {
            const fetchData = async () => {
                try {
                    const response = await fetch('https://raw.githubusercontent.com/moatsoliman/projectresources/main/questions.json');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    if (!showQus) {
                        let userObject = {
                            name: "user",
                            quesIndex: 0,
                            matchPlayed: 0,
                            point: 0,
                            dateStored: new Date().toISOString()
                        };
                        localStorage.setItem('user', JSON.stringify(userObject));
                        setQuestions(data);
                        setQuestionIndex(0)
                        // handleCountdown(data?.durationInSecs)
                        handleCountdown(6)
                        setQuizStart(true)
                    }
                } catch (error) {
                    console.error("Could not fetch the data", error);
                }
            };
            fetchData();
        }

    }, []);

    if (quizStart) {
        if (count === 0) {
            setQuizStart(false)
            setShowQus(true)
        }
    }

    const changeQuestion = () => {
        setTimeout(() => {
            goToRight()
            setQuestionIndex(questionIndex + 1)
            setAnswerChecking(false)

        }, 2000);
    }
    const finalUpdate = () => {
        setTimeout(() => {
            setShowResult(true)
            setAnswerChecking(false)
            setShowQus(false)
        }, 1500);
    }

    const singleQuestionAnswerCheck = (userAnswer) => {

        setAnswerChecking(true)
        let UserObject = localStorage.getItem('user')
        UserObject = JSON.parse(UserObject)

        if (questions?.game?.questions.length === questionIndex + 1) {
            if (userAnswer === `${questions?.game?.questions[questionIndex]?.corr_ans}`) {
                let userObject = {
                    name: "user",
                    quesIndex: 0,
                    matchPlayed: UserObject.matchPlayed + 1,
                    point: UserObject.point + 1,
                    dateStored: UserObject.dateStored
                };
                localStorage.setItem('user', JSON.stringify(userObject));
                finalUpdate()
            }
            else {
                let userObject = {
                    name: "user",
                    quesIndex: 0,
                    matchPlayed: UserObject.matchPlayed + 1,
                    point: UserObject.point - 1,
                    dateStored: UserObject.dateStored
                };
                localStorage.setItem('user', JSON.stringify(userObject));
                finalUpdate()
            }
        }
        else {
            if (userAnswer === `${questions?.game?.questions[questionIndex]?.corr_ans}`) {
                let userObject = {
                    name: "user",
                    quesIndex: questionIndex + 1,
                    matchPlayed: 0,
                    point: UserObject.point + 1,
                    dateStored: UserObject.dateStored
                };
                localStorage.setItem('user', JSON.stringify(userObject));
                changeQuestion()
            }
            else {
                let userObject = {
                    name: "user",
                    quesIndex: questionIndex + 1,
                    matchPlayed: 0,
                    point: UserObject.point - 1,
                    dateStored: UserObject.dateStored
                };
                localStorage.setItem('user', JSON.stringify(userObject));
                changeQuestion()
            }
        }
    }

    return (

        <div className='bg-white'>
            <div className='w-full rounded-[6px] sm:w-[660px] md:w-[700px] lg:w-[890px] xl:w-[1000px] mx-auto bg-[#4548e6] relative   min-h-screen'>

                {quizStart &&
                    <>
                        {/* timer  */}
                        <ClockTimer {...{ count, running, setCount }} />

                        <div className='max-w-[700px] max-h-[700px] mx-auto mt-4 p-2'>
                            {/* Questions Image */}
                            <InnerImageZoom
                                src={questions?.game?.pic_url}
                                zoomSrc={questions?.game?.pic_url}
                                zoomType="hover"
                                zoomPreload={true}
                                className='rounded-[10px]'
                            />

                            {/* skip button  */}
                            <div className='flex items-center justify-between gap-[30px] w-full mt-[10px]'>
                                <div className='flex items-center justify-center gap-2'>
                                    <p className='text-white text-[15px] sm:text-[20px] font-semibold'>
                                        Watch this Picture carefully!
                                    </p>
                                    <div class="relative flex flex-col items-center group inline">
                                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                        </svg>
                                        <div class="absolute bottom-0 flex w-[300px] flex-col items-center hidden mb-6 group-hover:flex">
                                            <span class="relative z-10 p-3 text-[16px] text-white rounded-[6px] bg-[#4548e6] border-2 border-[#f7fdff9a]">All the Questions of the Quiz will be based on this Picture.</span>
                                            <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    class="rounded-full min-w-[120px] text-[16px] sm:text-[20px] sm:min-w-[180px] font-semibold py-[10px] border-2 border-white text-white hover:bg-white hover:text-black duration-200"
                                    onClick={() => setCount(0)}
                                >
                                    Skip <BsSkipForwardFill className='inline ml-2' />
                                </button>
                            </div>
                        </div>
                    </>
                }

                {/* {all Question  */}
                {(showQus) &&
                    <div className='max-w-[420px] md:max-w-[550px] p-6 mx-auto'>
                        {/* Question */}
                        <p className='text-white/80 text-[18px] text-center font-semibold my-4'>
                            Questions : {questionIndex + 1}/{questions?.game?.questions.length}
                        </p>

                        <p className='text-white/90 text-[22px] text-center font-bold mt-4 mb-5'>
                            Qus : {questions?.game?.questions[questionIndex].question}
                        </p>
                        <Splide
                            options={{
                                type: 'loop',
                                arrows: false,
                                drag: false,
                                wheel: false,
                                keyboard: false,
                                pagination: false,
                                speed: '1000',
                            }}
                            ref={splideRef}

                        >
                            <SplideSlide>
                                {/* Question Options  */}
                                {questions?.game?.questions[questionIndex].answers.map((answer, index) =>
                                    <div key={answer} className='mr-2'>
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
                                                            'border-[#05ff3b] text-white  bg-[#00ff622f]'
                                                            :
                                                            `${index === givenAnswerIndex ?
                                                                'border-[#ff0000] text-white  bg-[#ff00002f]'
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
                            </SplideSlide>
                            <SplideSlide>
                                {/* Question Options  */}
                                {questions?.game?.questions[questionIndex2].answers.map((answer, index) =>
                                    <div key={answer} className='mr-2'>
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
                                                    className={`pl-[20px] py-3 mb-4 rounded-[12px] border-[2px] text-white 
                    ${`${questions?.game?.questions[questionIndex]?.corr_ans}` === answer
                                                            ?
                                                            'border-[#05ff3b] text-white   bg-[#00ff622f]'
                                                            :
                                                            `${index === givenAnswerIndex ?
                                                                'border-[#ff0000] text-white  bg-[#ff00002f]'
                                                                :
                                                                'border-[2px] border-white '
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
                            </SplideSlide>
                        </Splide>
                    </div>
                }
                {showResult &&
                    <div className='max-w-[420px] md:max-w-[550px] p-6 mx-auto text-white'>
                        <p className='text-center font-semibold text-[30px] mb-4'>Congratulation !</p>
                        <div className='flex items-center justify-between'>
                            <div className='min-w-200px '>
                                <p className='text-[30px] font-semibold text-center'>3</p>
                                <p className='text-[20px] font-semibold'>Played</p>
                            </div>
                            <div className='min-w-200px '>
                                <p className='text-[30px] font-semibold text-center'>90%</p>
                                <p className='text-[20px] font-semibold'>Win %</p>
                            </div>
                            <div className='min-w-200px '>
                                <p className='text-[30px] font-semibold text-center'>1</p>
                                <p className='text-[20px] font-semibold'>Current Streak</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    );
};

export default Play;
