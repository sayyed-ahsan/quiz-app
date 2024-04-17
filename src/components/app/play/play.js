import React, { useEffect, useRef, useState } from 'react';
import { BsSkipForwardFill } from "react-icons/bs";
import { BsExclamationCircle } from "react-icons/bs";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
import ClockTimer from './clock';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import Congratulation from './congratulation';
import ExclamationModal from './exclamationModal';

const Play = () => {
    const splideRef = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quizStart, setQuizStart] = useState(false);
    const [showQus, setShowQus] = useState(false);
    const [questions, setQuestions] = useState();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [tryNumber, setTryNumber] = useState(0);
    const [givenAnswerIndex1, setGivenAnswerIndex1] = useState(0);
    const [givenAnswerIndex2, setGivenAnswerIndex2] = useState(0);
    const [givenAnswerIndex3, setGivenAnswerIndex3] = useState(0);
    const [showRightAns, setShowRightAns] = useState(false);
    const [answerChecking, setAnswerChecking] = useState(false);
    const [showGood, setShowGood] = useState(false);
    const [showNextTime, setShowNextTime] = useState(false);
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

        let UserGamePlayObject = localStorage.getItem('UserGamePlay')
        UserGamePlayObject = JSON.parse(UserGamePlayObject)

        if (UserGamePlayObject) {
            const fetchData = async () => {
                try {
                    const response = await fetch('https://raw.githubusercontent.com/moatsoliman/projectresources/main/questions.json');
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    if (UserGamePlayObject.game_data.game.status === 'COMPLETED') {
                        setShowResult(true)
                    }
                    else {
                        if (!showQus) {
                            setQuestions(data);
                            setQuestionIndex(UserGamePlayObject.game_data.game.currentQuestionIndex)
                            console.log(UserGamePlayObject.game_data.game.currentQuestionIndex)
                            setQuizStart(true)
                        }
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

                        let UserGamePlayObject = {
                            game_data: {
                                game: {
                                    gameState: [],
                                    hasSeenPicture: 1,
                                    currentQuestionIndex: 0,
                                    currentScore: 0,
                                    id: data.id,
                                    status: "IN_PROGRESS",
                                    timestamps: {
                                        lastCompleted: 0,
                                        lastPlayed: 0
                                    }
                                },
                                stats: {
                                    gamesPlayed: 0,
                                    currentStreak: 0,
                                    gamesWon: 0,
                                    AvgScorePercentage: 0,
                                }
                            },
                            puzzle_id: data.id,
                            timestamp: Date.now()
                        };

                        localStorage.setItem('UserGamePlay', JSON.stringify(UserGamePlayObject));
                        setQuestions(data);
                        setQuestionIndex(0)
                        handleCountdown(data?.durationInSecs)
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
            setGivenAnswerIndex1(0)
            setGivenAnswerIndex2(0)
            setGivenAnswerIndex3(0)
            goToRight()
            setQuestionIndex(questionIndex + 1)
            setAnswerChecking(false)
            setShowRightAns(false)
            setShowGood(false)
            setShowNextTime(false)
        }, 1000);
    }

    const finalUpdate = () => {
        setTimeout(() => {
            setGivenAnswerIndex1(0)
            setGivenAnswerIndex2(0)
            setGivenAnswerIndex3(0)
            setShowResult(true)
            setAnswerChecking(false)
            setShowQus(false)
            setShowRightAns(false)
        }, 1000);
    }

    const singleQuestionAnswerCheck = (userAnswer) => {

        setAnswerChecking(true)
        let UserObject = localStorage.getItem('UserGamePlay')
        UserObject = JSON.parse(UserObject)

        const { game_data, puzzle_id, timestamp } = UserObject;
        const { gameState, hasSeenPicture, currentQuestionIndex, currentScore, id, status, timestamps } = game_data.game;

        let newCurrentScore;
        switch (tryNumber) {
            case 0:
                newCurrentScore = currentScore + 3;
                break;
            case 1:
                newCurrentScore = currentScore + 2;
                break;
            case 2:
                newCurrentScore = currentScore + 1;
                break;
            default:
                newCurrentScore = currentScore;
        }

        if (!showRightAns) {
            if (questions?.game?.questions.length === questionIndex + 1) {
                if (userAnswer === `${questions?.game?.questions[questionIndex]?.corr_ans}`) {

                    let userObject = {
                        game_data: {
                            game: {
                                gameState: [],
                                hasSeenPicture: hasSeenPicture,
                                currentQuestionIndex: 0,
                                currentScore: newCurrentScore,
                                id: id,
                                status: "COMPLETED",
                                timestamps: {
                                    lastCompleted: Date.now(),
                                    lastPlayed: Date.now()
                                }
                            },
                            stats: {
                                gamesPlayed: status.gamesPlayed + 1,
                                currentStreak: status.currentStreak + 1,
                                gamesWon: status.gamesWon + 1,
                                AvgScorePercentage: status.AvgScorePercentage,
                            }
                        },
                        puzzle_id: puzzle_id,
                        timestamp: timestamp
                    };
                    localStorage.setItem('UserGamePlay', JSON.stringify(userObject));
                    setShowRightAns(true)
                    setTryNumber(0)
                    finalUpdate()
                    if (tryNumber === 0 || tryNumber === 1) {
                        setShowGood(true)
                    }
                }
                else {
                    if (tryNumber === 0 || tryNumber === 1) {
                        setTryNumber(tryNumber + 1)
                    }
                    else if (tryNumber === 2) {
                        let userObject = {
                            game_data: {
                                game: {
                                    gameState: [],
                                    hasSeenPicture: hasSeenPicture,
                                    currentQuestionIndex: 0,
                                    currentScore: currentScore,
                                    id: id,
                                    status: "COMPLETED",
                                    timestamps: {
                                        lastCompleted: Date.now(),
                                        lastPlayed: Date.now()
                                    }
                                },
                                stats: {
                                    gamesPlayed: status.gamesPlayed + 1,
                                    currentStreak: status.currentStreak + 1,
                                    gamesWon: status.gamesWon + 1,
                                    AvgScorePercentage: status.AvgScorePercentage,
                                }
                            },
                            puzzle_id: puzzle_id,
                            timestamp: timestamp
                        };
                        localStorage.setItem('UserGamePlay', JSON.stringify(userObject));
                        setTryNumber(0)
                        finalUpdate()
                        setShowNextTime(true)
                    }
                }
            }
            else {
                if (userAnswer === `${questions?.game?.questions[questionIndex]?.corr_ans}`) {
                    let userObject = {
                        game_data: {
                            game: {
                                gameState: [],
                                hasSeenPicture: hasSeenPicture,
                                currentQuestionIndex: currentQuestionIndex,
                                currentScore: newCurrentScore,
                                id: id,
                                status: "IN_PROGRESS",
                                timestamps: {
                                    lastCompleted: timestamps.lastCompleted,
                                    lastPlayed: Date.now()
                                }
                            },
                            stats: {
                                gamesPlayed: status.gamesPlayed,
                                currentStreak: status.currentStreak,
                                gamesWon: status.gamesWon,
                                AvgScorePercentage: status.AvgScorePercentage,
                            }
                        },
                        puzzle_id: puzzle_id,
                        timestamp: timestamp
                    };
                    localStorage.setItem('UserGamePlay', JSON.stringify(userObject));
                    setShowRightAns(true)
                    changeQuestion()
                    setTryNumber(0)
                    if (tryNumber === 0 || tryNumber === 1) {
                        setShowGood(true)
                    }
                }
                else {
                    if (tryNumber === 0 || tryNumber === 1) {
                        setTryNumber(tryNumber + 1)
                        let userObject = {
                            game_data: {
                                game: {
                                    gameState: [],
                                    hasSeenPicture: hasSeenPicture,
                                    currentQuestionIndex: currentQuestionIndex,
                                    currentScore: currentScore,
                                    id: id,
                                    status: "IN_PROGRESS",
                                    timestamps: {
                                        lastCompleted: timestamps.lastCompleted,
                                        lastPlayed: Date.now()
                                    }
                                },
                                stats: {
                                    gamesPlayed: status.gamesPlayed,
                                    currentStreak: status.currentStreak,
                                    gamesWon: status.gamesWon,
                                    AvgScorePercentage: status.AvgScorePercentage,
                                }
                            },
                            puzzle_id: puzzle_id,
                            timestamp: timestamp
                        };
                        localStorage.setItem('UserGamePlay', JSON.stringify(userObject));
                    }
                    else {
                        let userObject = {
                            game_data: {
                                game: {
                                    gameState: [],
                                    hasSeenPicture: hasSeenPicture,
                                    currentQuestionIndex: currentQuestionIndex + 1,
                                    currentScore: currentScore,
                                    id: id,
                                    status: "IN_PROGRESS",
                                    timestamps: {
                                        lastCompleted: timestamps.lastCompleted,
                                        lastPlayed: Date.now()
                                    }
                                },
                                stats: {
                                    gamesPlayed: status.gamesPlayed,
                                    currentStreak: status.currentStreak,
                                    gamesWon: status.gamesWon,
                                    AvgScorePercentage: status.AvgScorePercentage,
                                }
                            },
                            puzzle_id: puzzle_id,
                            timestamp: timestamp
                        };
                        localStorage.setItem('UserGamePlay', JSON.stringify(userObject));
                        setTryNumber(0)
                        changeQuestion()
                        setShowNextTime(true)
                    }
                }
            }
        }


    }

    return (
        <div className={!showQus ? 'home-main-div' : ''}>

            {quizStart &&
                <>
                    <BsExclamationCircle
                        className='exclamation-icon'
                        onClick={() => setIsModalOpen(true)}
                    />
                    <ExclamationModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />

                    <ClockTimer {...{ count, running, setCount }} />

                    <button
                        className='skip-btn'
                        onClick={() => setCount(0)}
                    >
                        Skip
                    </button>

                    <div className='quiz-img-div'>
                        <InnerImageZoom
                            src={questions?.game?.pic_url}
                            zoomSrc={questions?.game?.pic_url}
                            zoomType="hover"
                            zoomPreload={true}
                        />
                    </div>
                </>
            }

            {/* {all Question  */}
            {(showQus) &&
                <div className='max-w-[420px] md:max-w-[550px] p-6 mx-auto bg-white h-screen'>
                    {showGood &&
                        <button
                            className='good-job-btn'
                        >
                            Good Job
                        </button>
                    }
                    {showNextTime &&
                        <button
                            className='next-time-btn'
                        >
                            Try again next time
                        </button>
                    }

                    {/* Question */}
                    <p className=' text-[28px] text-start font-bold mt-3'>
                        Q{questionIndex + 1}.
                    </p>
                    <p className=' text-[28px] text-start font-bold mt-2 mb-[50px]'>
                        {questions?.game?.questions[questionIndex].question}
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
                            {questions?.game?.questions[questionIndex].answers.map((answer, index) =>
                                <div key={answer} className='mr-2'>
                                    {!answerChecking ?
                                        <div
                                            className='px-[25px] py-3 mb-7 rounded-full border-[1px] border-black text-black cursor-pointer'
                                            onClick={() => {
                                                singleQuestionAnswerCheck(answer); setGivenAnswerIndex1(answer)
                                            }}
                                        >
                                            <p className='font-bold text-[18px]' >
                                                <span className='mr-2'>
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
                                            <div onClick={() => {
                                                singleQuestionAnswerCheck(answer);
                                                { tryNumber === 1 && setGivenAnswerIndex2(answer) }
                                                { tryNumber === 2 && setGivenAnswerIndex3(answer) }
                                            }}
                                                className={`px-[25px] py-3 mb-7 rounded-full text-black
                           ${`${questions?.game?.questions[questionIndex]?.corr_ans}` === answer
                                                        ?
                                                        `${showRightAns ? 'option-shadow border-[1px] border-[#06BF66] bg-[#06BF66] text-white' : 'border-[1px] border-black'}`
                                                        :
                                                        `${(answer === givenAnswerIndex1 || answer === givenAnswerIndex2 || answer === givenAnswerIndex3) ?
                                                            'option-shadow border-[1px] border-[#CD0000] bg-[#CD0000] text-white'
                                                            :
                                                            `${showRightAns ?
                                                                'border-[2px] border-[#A9A9A9] text-[#A9A9A9]'
                                                                :
                                                                'border-[1px] border-black'}`
                                                        }`
                                                    }
                                                    duration-100`}
                                            >
                                                <p className='font-bold text-[18px]' >
                                                    <span className='mr-2'>
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
                            {questions?.game?.questions[questionIndex].answers.map((answer, index) =>
                                <div key={answer} className='mr-2'>
                                    {!answerChecking ?
                                        <div
                                            className='px-[25px] py-3 mb-7 rounded-full border-[1px] border-black text-black cursor-pointer'
                                            onClick={() => {
                                                singleQuestionAnswerCheck(answer); setGivenAnswerIndex1(answer)
                                            }}
                                        >
                                            <p className='font-bold text-[18px]' >
                                                <span className='mr-2'>
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
                                            <div onClick={() => {
                                                singleQuestionAnswerCheck(answer);
                                                { tryNumber === 1 && setGivenAnswerIndex2(answer) }
                                                { tryNumber === 2 && setGivenAnswerIndex3(answer) }
                                            }}
                                                className={`px-[25px] py-3 mb-7 rounded-full text-black
                           ${`${questions?.game?.questions[questionIndex]?.corr_ans}` === answer
                                                        ?
                                                        `${showRightAns ? 'option-shadow border-[1px] border-[#06BF66] bg-[#06BF66] text-white' : 'border-[1px] border-black'}`
                                                        :
                                                        `${(answer === givenAnswerIndex1 || answer === givenAnswerIndex2 || answer === givenAnswerIndex3) ?
                                                            'option-shadow border-[1px] border-[#CD0000] bg-[#CD0000] text-white'
                                                            :
                                                            `${showRightAns ?
                                                                'border-[2px] border-[#A9A9A9] text-[#A9A9A9]'
                                                                :
                                                                'border-[1px] border-black'}`
                                                        }`
                                                    }
                                                    duration-100`}
                                            >
                                                <p className='font-bold text-[18px]' >
                                                    <span className='mr-2'>
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
            {showResult && <Congratulation />}
        </div >
    );
};

export default Play;
