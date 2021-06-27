import logoImg from '../assets/images/logo.svg';

import '../styles/page404.scss';

export function Page404 () {
    return (
        <div className="main-content">
            <img src={logoImg} alt="Letmeask" />
            <h1>Página não localizada.</h1>
        </div>
    );
}