import { useHistory, useParams } from 'react-router-dom';

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { ThemeButton } from '../components/ThemeButton';

import { useRoom } from '../hooks/useRoom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import logoImg from '../assets/images/logo.svg';
import darkThemelogoImg from '../assets/images/dark-theme-logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss';

type RoomParans = {
    id: string;
}

export function AdminRoom() {
    const { user, signOut } = useAuth();
    const { theme } = useTheme();

    const history = useHistory();
    const parans = useParams<RoomParans>();
    const roomId = parans.id;

    const {questions, title, roomEnded, setRoomEnded, authorRoomId} = useRoom(roomId);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        setRoomEnded(true);

        history.push("/");
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem certeza que você deseja excluir a pergunta?")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighLightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        });
    }

    return (
        <div id="page-room" className={`${theme === "dark" ? "dark-theme" : ""}`}>
            <header>
                <div className="content admin-room-header">
                    <div>
                        {
                            theme === "dark" 
                            ? ( <img src={darkThemelogoImg} alt="Letmeask" />) 
                            : ( <img src={logoImg} alt="Letmeask" />) 
                        }
                        <ThemeButton />
                    </div>
                    <div>
                        <RoomCode code={roomId} />
                        {authorRoomId === user?.id && 
                        (   <>
                                <Button isOutlined onClick={handleEndRoom} disabled={roomEnded}>Encerrar Sala</Button>
                                <Button isOutlined onClick={signOut}>Sair</Button>
                            </>
                        )}
                    </div>
                </div>
            </header>
        
            <main>
                <div className="room-title">
                    <h1>Sala {title} {roomEnded && ("(Encerrada)")}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span> }
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id} 
                                content={question.content} 
                                author={question.author}
                                isAnswered={question.isAnswered} 
                                isHighLighted={question.isHighLighted}
                            >
                                {authorRoomId === user?.id && !question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar a pergunta como respondida" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighLightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Destaque à pergunta" />
                                        </button>
                                    </>
                                )}

                                {authorRoomId === user?.id && (
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImg} alt="Remover pergunta" />
                                    </button>
                                )}
                            </Question>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}