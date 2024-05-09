'use client'

import { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';
import ClimaCard from '@/components/ClimaCard';
import ClimaSemanal from '@/components/ClimaSemanal';

export default function Clima() {
    const [cidade, setCidade] = useState('');
    const [data, setData] = useState();

    const buscarClima = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt_br&units=metric&appid=42e29d143e6e7b8595bc2a484ea78108`);
            setData(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const iconUrl = `http://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`;

    const iconcode = data ? data.weather[0].icon : '';

    return (
        <main className="flex flex-col w-full min-h-screen p-8 bg-gray-900 items-center center space-y-6">

            <div className='flex flex-row items-center justify-between w-full space-x-2'>
                <Link href="/page">
                    <Image
                        src="/weather.png"
                        alt="Imagem de Fundo"
                        width={40}
                        height={40}
                    />
                </Link>
            </div>

            {/* <div className='flex flex-row'>
                <div className="relative w-full">
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite o nome da cidade" value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        required />
                </div>
                <button type="submit" onClick={buscarClima} className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div> */}

            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
                    <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                    <div className='flex flex-row'>
                        <div className="relative w-full">
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite o nome da cidade" value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                required />
                        </div>
                        <button type="submit" onClick={buscarClima} className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </section>



            {data && (
                <div className='flex flex-row w-full space-x-6'>
                    <ClimaCard
                        iconUrl={iconUrl}
                        name={data.name}
                        temperature={data.main.temp}
                        description={data.weather[0].description}
                        minTemperature={data.main.temp_min}
                        maxTemperature={data.main.temp_max}
                    />

                    <div className=' w-full border border-gray-200 rounded-lg shadow dark:bg-slate-800 dark:border-gray-700'>

                    </div>
                </div>
            )}


            {data && (
                <div className='flex flex-col w-full space-y-6'>

                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Previsão dos próximos 5 dias</h5>
                    <ClimaSemanal cidade={cidade} />
                </div>

            )}


        </main>
    );
}