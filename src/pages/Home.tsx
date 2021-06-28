import { useState, FormEvent } from 'react';
import { useHistory, } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import darkThemelogoImg from '../assets/images/dark-theme-logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import {Button} from '../components/Button';
import { ThemeButton } from '../components/ThemeButton';

import '../styles/auth.scss';

export function Home() {
    const [roomCode, setRoomCode] = useState("");
    
    const {theme} = useTheme();
    const {user, signInWithGoogle } = useAuth();
    
    const history = useHistory();

    async function handleCreateRoom() {

        if (!user) {
            await signInWithGoogle();
        }

        history.push("/rooms/new");
    }

    async function handleJoinRoom( event:FormEvent ) {
        event.preventDefault();

        if (roomCode === "") {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert("Room does not exists");
            return;
        }

        if (roomRef.val().endedAt) {
            alert("Room already closed.");
            return;
        }
        
        history.push(`rooms/${roomCode}`);
    }

    return (
        <div id="page-auth" className={`${theme === "dark" ? "dark-theme" : ""}`}>
            <aside>
                <ThemeButton isFixed />
                <img src={illustrationImg} alt="Ilustração simbolizando pergunta e resposta" />
                <strong>Crie uma sala de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da audiência em tempo real.</p>
            </aside>
            <main>
                <div className="main-content">
                    {
                        theme === "dark" 
                        ? ( <img src={darkThemelogoImg} alt="Letmeask" />) 
                        : ( <img src={logoImg} alt="Letmeask" />) 
                    }
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie uma sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}