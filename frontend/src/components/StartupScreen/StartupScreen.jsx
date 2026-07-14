import React, { useEffect, useState } from 'react'

const StartupScreen = () => {
  const [secondsLeft, setSecondsLeft] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="startup-screen">
            <h2>Starting server...</h2>

            <p>
                The free backend is waking up.
                This usually takes up to one minute.
            </p>

            <h3>{secondsLeft}s</h3>
        </div>
    );
}

export default StartupScreen