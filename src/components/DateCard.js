import { useState, useEffect } from 'react';

function DateCard() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(
            () => setNow(new Date()),
            1000
        );

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const formattedDate = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(now);

    return (

        <div class="flex flex-col items-center justify-evenly h-full w-full bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 p-6 space-y-2">
            <div>
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{`${hours}:${minutes}:${seconds}`}</h5>
            </div>
            <p className="mb-3 font-normal text-2xl text-gray-700 dark:text-gray-400">{formattedDate}</p>
            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <a href="/" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Voltar à tela inicial
                </a>
            </div>
        </div>
    );
}

export default DateCard;
