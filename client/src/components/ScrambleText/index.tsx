import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Define a type for your props if needed
type PageHeaderProps = {
    // Add any props here. Example:
    title: string;
};

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    const titleParent = useRef<HTMLDivElement>(null);
    // const titleString = 'TestString';

    function randChar(): string {
        let sample = ',./<>?0123456789/[]{}!@#$%^&*()_+=-';
        return sample.charAt(Math.floor(Math.random() * sample.length));
    }

    function appearTitle(titlePart: React.RefObject<HTMLHeadingElement>, delay: number): void {
        if (!titlePart.current) return;

        for (let i = 0; i < titlePart.current.children.length; i++) {
            let char = titlePart.current.children[i].children[0] as HTMLSpanElement;
            let initialState = char.innerHTML;
            let inc = 0;
            let dur = 0.3;
            let startDate = 0;
            let del = i * 0.15 + delay;
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

    useEffect(() => {
        appearTitle(titleParent, 0.2);
    }, []);

    return (
        <>
            <div ref={titleParent} id="welcome-message" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {props.title.split('').map((el, i) => (
                    <span key={i} className="span-par">
                        <span>{el}</span>
                    </span>
                ))}
            </div>
        </>
    );
};

export default PageHeader;
