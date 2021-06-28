import {useState, FormEvent} from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import darkThemelogoImg from '../assets/images/dark-theme-logo.svg';

import { database } from '../services/firebase';

import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import { ThemeButton } from '../components/ThemeButton';
import {Button} from '../components/Button';

import '../styles/auth.scss';

export function NewRoom() {
    const {user, signOut} = useAuth();
    const {theme} = useTheme();
    
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();

    async function handleCreateRoom(event:FormEvent) {
        event.preventDefault();

        if (newRoom === '') {
            return;
        }
        
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            author: user?.id,
        });

        //history.push(`/rooms/${firebaseRoom.key}`)
        history.push(`/myroom/${firebaseRoom.key}`)
    }

    if (!user) {
        return (
            <div id="page-auth"  className={`${theme === "dark" ? "dark-theme" : ""}`}>
                <aside>
                    <ThemeButton isFixed />
                    <img src={illustrationImg} alt="Ilustração simbolizando pergunta e resposta" />
                    <strong>Crie uma sala de Q&amp;A ao-vivo</strong>
                    <p>Tire as dúvidas da audiência em tempo real.</p>
                </aside>
                <main>
                    <div className="main-content">
                        <h3>Obtendo informações do usuário ...</h3>
                    </div>
                </main>
            </div>
        );
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
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                        />
                        <Button type="submit" disabled={!user}>
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente <Link to="/">Clique aqui</Link>
                    </p>
                    <p>
                        Para sair da aplicação, <button className="btn-singOut" onClick={signOut}>clique aqui</button>.
                    </p>
                </div>
            </main>
        </div>
    );
}