import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import "./index.css"

// Define a type for your props if needed
type PageHeaderProps = {
    // Add any props here. Example:
    title: string;
};

const PageHeader: React.FC<PageHeaderProps> = React.memo((props) => {
    const titleParent = useRef<HTMLDivElement>(null);
    // const titleString = 'TestString';

    function randChar(): string {
        const sample = ',./<>?0123456789/[]{}!@#$%^&*()_+=-';
        return sample.charAt(Math.floor(Math.random() * sample.length));
    }

    function appearTitle(titlePart: React.RefObject<HTMLHeadingElement>, delay: number): void {
        if (!titlePart.current) return;

        for (let i = 0; i < titlePart.current.children.length; i++) {
            const char = titlePart.current.children[i].children[0] as HTMLSpanElement;
            const initialState = char.innerHTML;
            let inc = 0;
            const dur = 0.3;
            let startDate = 0;
            const del = i * 0.15 + delay;
            gsap.fromTo(
                char,
                {
                    opacity: 0,
                    x: '-10%',
                },
                {
                    duration: dur,
                    delay: del,
                    opacity: 1,
                    ease: 'power3.out',
                    x: 0,
                    onStart() {
                        startDate = Date.now();
                    },
                    onUpdate: () => {
                        if (inc % 3 === 0) char.innerHTML = randChar();
                        inc++;
                        if (Date.now() - startDate >= (dur - 0.1) * 1000) char.innerHTML = initialState;
                    },
                }
            );
        }
    }

    useGSAP(() => {
        appearTitle(titleParent, 0.2);
    }, {scope: titleParent});

    return (
        <>
            <div ref={titleParent} id="welcome-message" >
                Welcome To 
                {props.title.split('').map((el, i) => (
                    <span key={i} className="span-par">
                        <span
                            style={i === 0 ? {
                                marginLeft: '0.8rem',
                                color: 'var(--primary)'
                            }: {color: 'var(--primary)'}}
                        >
                            {el}
                        </span>
                    </span>
                ))}
            </div>
        </>
    );
});

export default PageHeader;
