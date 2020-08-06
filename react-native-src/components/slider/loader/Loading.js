import React, { useEffect, useState } from 'react';
export default function Loading() {
    const [showLoading, setShowLoading] = useState(false);

    const timerToClearSomewhere = useRef(false); //now you can pass timer to another component

    useEffect(() => {
        timerToClearSomewhere.current = setInterval(() => setShowLoading(true), 50000);

        return () => {
            clearInterval(timerToClearSomewhere.current);
        };
    }, []);

    //here we can imitate clear from somewhere else place
    useEffect(() => {
        setTimeout(() => clearInterval(timerToClearSomewhere.current), 1000);
    }, []);

    return showLoading ? (
        <div>I will never be visible because interval was cleared</div>
    ) : (
        <div>showLoading is false</div>
    );
}
