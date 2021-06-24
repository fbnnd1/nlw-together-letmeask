import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';

type RoomParans = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth();
    const parans = useParams<RoomParans>();
    const [newQuestion, setNewQuestion] = useState("");
    const roomId = parans.id;

    const {questions, title} = useRoom(roomId);

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined>Encerrar Sala</Button>
                    </div>
                </div>
            </header>
        
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span> }
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id} 
                                content={question.content} 
                                author={question.author} 
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}