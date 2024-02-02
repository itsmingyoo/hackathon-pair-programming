import { TargetUserProps } from '../../interfaces/user';
import './targetUserSocials.css';

function TargetUserSocials(props: TargetUserProps) {
    const { linkedin, github, portfolio, leetcode } = props.targetUser;

    return (
        <>
            <div className="target-user-socials">
                <div className="up">
                    {/* linkedin */}
                    <button
                        className="card1"
                        onClick={() => {
                            if (!linkedin) {
                                alert('No link provided.');
                            } else {
                                window.open(linkedin, '_blank', 'noopener,noreferrer');
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            width="30"
                            height="30"
                            fillRule="nonzero"
                            className="linkedin"
                        >
                            <g
                                fillRule="nonzero"
                                stroke="none"
                                strokeWidth="1"
                                strokeLinecap="butt"
                                strokeLinejoin="miter"
                                strokeMiterlimit="10"
                                strokeDasharray=""
                                strokeDashoffset="0"
                                fontFamily="none"
                                fontWeight="none"
                                fontSize="none"
                                textAnchor="none"
                                style={{ mixBlendMode: 'normal' }}
                            >
                                <g transform="scale(6,6)">
                                    <path
                                        fill="#0288D1"
                                        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                                    ></path>
                                    <path
                                        fill="#FFF"
                                        d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                    {/* Porfolio */}
                    <button
                        className="card2"
                        onClick={() => {
                            if (!portfolio) {
                                alert('No link provided.');
                            } else {
                                window.open(portfolio, '_blank', 'noopener,noreferrer');
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                            className="portfolio"
                        >
                            <path
                                fill="url(#g5dniRY~PPjSqIO9PSW_ia_NTa3xp2XGiRy_gr1)"
                                d="M28.5,6h-9C18.672,6,18,6.672,18,7.5V9h12V7.5C30,6.672,29.328,6,28.5,6z"
                            ></path>
                            <radialGradient
                                id="g5dniRY~PPjSqIO9PSW_ib_NTa3xp2XGiRy_gr2"
                                cx="23.832"
                                cy="5.992"
                                r="45.74"
                                gradientTransform="matrix(1 0 0 .8044 0 1.172)"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#40150b"></stop>
                                <stop offset=".156" stop-color="#622110"></stop>
                                <stop offset=".417" stop-color="#953218"></stop>
                                <stop offset=".645" stop-color="#ba3f1e"></stop>
                                <stop offset=".828" stop-color="#d14722"></stop>
                                <stop offset=".944" stop-color="#d94a23"></stop>
                            </radialGradient>
                            <path
                                fill="url(#g5dniRY~PPjSqIO9PSW_ib_NTa3xp2XGiRy_gr2)"
                                d="M42,41H6c-1.1,0-2-0.9-2-2V13c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,40.1,43.1,41,42,41z"
                            ></path>
                            <linearGradient
                                id="g5dniRY~PPjSqIO9PSW_ic_NTa3xp2XGiRy_gr3"
                                x1="24"
                                x2="24"
                                y1="9.028"
                                y2="26.927"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stop-color="#fc7d5b"></stop>
                                <stop offset=".06" stop-color="#f8734f"></stop>
                                <stop offset=".18" stop-color="#f3653d"></stop>
                                <stop offset=".326" stop-color="#f05b31"></stop>
                                <stop offset=".523" stop-color="#ee552a"></stop>
                                <stop offset="1" stop-color="#ed5328"></stop>
                            </linearGradient>
                            <path
                                fill="url(#g5dniRY~PPjSqIO9PSW_ic_NTa3xp2XGiRy_gr3)"
                                d="M42.297,25.255L24,28L5.703,25.255C4.724,25.109,4,24.268,4,23.278V13c0-2.2,1.8-4,4-4h32	c2.2,0,4,1.8,4,4v10.278C44,24.268,43.276,25.109,42.297,25.255z"
                            ></path>
                            <path
                                fill="#f6eca5"
                                d="M25.5,21h-3c-0.276,0-0.5,0.224-0.5,0.5v3c0,0.276,0.224,0.5,0.5,0.5h3c0.276,0,0.5-0.224,0.5-0.5v-3	C26,21.224,25.776,21,25.5,21z"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="down">
                    {/* Github */}
                    <button
                        className="card3"
                        onClick={() => {
                            if (!github) {
                                alert('No link provided.');
                            } else {
                                window.open(github, '_blank', 'noopener,noreferrer');
                            }
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                            width="30px"
                            height="30px"
                            className="github"
                        >
                            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                        </svg>
                    </button>
                    {/* leetcode */}
                    <button
                        className="card4"
                        onClick={() => {
                            if (!leetcode) {
                                alert('No link provided.');
                            } else {
                                window.open(leetcode, '_blank', 'noopener,noreferrer');
                            }
                        }}
                    >
                        <svg
                            height="30px"
                            width="30px"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            className="discord"
                        >
                            <path d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

export default TargetUserSocials;
