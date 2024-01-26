import './Footer.css';

//should change github and linkedin names to icons

function Footer() {
    return (
        <div className="footer-container">
            <div className="developer-container">
                <div className="developer-name">Minh Tran</div>
                <div className="developer-links-container">
                    <div className="developer-github">
                        <a className='github' href="https://github.com/itsmingyoo" target="_blank">
                            GitHub
                        </a>
                    </div>
                    <div className="developer-linkedin">
                        <a className='linkedin' href="https://www.linkedin.com/in/minh-tran-36501a251" target="_blank">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
            <div className="developer-container">
                <div className="developer-name">John Wofford</div>
                <div className="developer-links-container">
                    <div className="developer-github">
                        <a className='github' href="https://github.com/jwoff1991" target="_blank">
                            GitHub
                        </a>
                    </div>
                    <div className="developer-linkedin">
                        <a className='linkedin' href="https://www.linkedin.com/in/jonathanbwofford/" target="_blank">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
            <div className="developer-container">
                <div className="developer-name">Melinda Cortez</div>
                <div className="developer-links-container">
                    <div className="developer-github">
                        <a className='github' href="#" target="_blank">
                            GitHub
                        </a>
                    </div>
                    <div className="developer-linkedin">
                        <a className='linkedin' href="#" target="_blank">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
            <div className="developer-container">
                <div className="developer-name">Saad Anwer</div>
                <div className="developer-links-container">
                    <div className="developer-github">
                        <a className='github' href="#" target="_blank">
                            GitHub
                        </a>
                    </div>
                    <div className="developer-linkedin">
                        <a className='linkedin' href="#" target="_blank">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
