import { useState, useEffect } from "react";

export const useSayHi = () => {
    const [greeting, setGreeting] = useState('');

    useEffect(()=> {
        const updateGreeting = () => {
            const currentHour = new Date().getHours();
        if (currentHour >= 0 && currentHour < 12){
            setGreeting('Good Morning');
        }
        if (currentHour >= 12 && currentHour < 19){
            setGreeting('Good Afternoon');
        }  if (currentHour >= 19 && currentHour <= 24){
            setGreeting('Good Night');
        };
        }

        updateGreeting();

        const interval = setInterval(updateGreeting,60*60*1000);
        
        return () => clearInterval(interval);
    }, []);

    return greeting;
}