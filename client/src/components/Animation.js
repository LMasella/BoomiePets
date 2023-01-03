import { useEffect, useRef } from "react";

const Animation = (props) => {
    const { category, scale, flipX } = props;
    // hacky way to set up animations --- w = width of spritesheet - 1 framewidth, frames = frames - 1 //
    // should probably add objects for each 'state' -- ie walking, idle, etc.
    const spriteDimensions = {
        Dino: {w: 2439, frames: 9}, 
        Zomgurl: {w: 2660, frames: 14}, 
        Robo: {w: 1512, frames: 9}, 
        Jacko: {w: 1593, frames: 9},
        Kitkit: {w: 1494, frames: 9},
        Fufudoggy: {w: 1548, frames: 9},
        Zomboi: {w: 2730, frames: 14}
    };
    const animDiv = useRef();

    useEffect(() => {
        let position = 0;
        let clsName = `${category}Idle`
        if(flipX) clsName += ' flipX';
        animDiv.current.className = clsName;

        const anim = setInterval(() => {
            if (position < parseInt(spriteDimensions[category].w)) position += (parseInt(spriteDimensions[category].w) / parseInt(spriteDimensions[category].frames));
            else position = 0;
            animDiv.current.style.backgroundPosition = `-${position}px 0px`;
        }, 70);

        return (() => {
            clearInterval(anim);
        })
    }, [category]);

    return (
        <div className='d-flex justify-content-center mx-5'>
            <div className={`scale${scale}`}>
                <div ref={animDiv} id='anim' className='mx-5'></div>
            </div>
        </div>
    );
}

export default Animation;