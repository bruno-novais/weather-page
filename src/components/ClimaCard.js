// ClimaCard.js
import React from 'react';
import Image from 'next/image';

const ClimaCard = ({ iconUrl, name, temperature, description, minTemperature, maxTemperature }) => {


    return (
        <div className="w-60 max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-slate-800 dark:border-gray-700 space-y-3">

            <h5 className="text-3xl font-semibold tracking-tight text-white dark:text-gray-300">{name}</h5>

            <div className='flex flex-row items-center justify-between'>
                <Image src={iconUrl} alt="Icone do clima" width={60} height={60} className='flex justify-center items-center bg-slate-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' />
                <p className="font-bold text-4xl text-gray-500 dark:text-gray-300 p-4">
                    {Math.round(temperature).toString().slice(0, 2)}°C
                </p>

            </div>

            <div className="flex items-center p-2 px-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-slate-700 dark:text-blue-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{description}</span>
                </div>
            </div>

            <p className="font-normal text-gray-500 dark:text-gray-400">Temp. mínima: {minTemperature}°C</p>
            <p className="font-normal text-gray-500 dark:text-gray-400">Temp. máxima: {maxTemperature}°C</p>
        </div>
    );
};

export default ClimaCard;
