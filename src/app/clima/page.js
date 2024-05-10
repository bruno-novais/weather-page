'use client'

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';
import ClimaCard from '@/components/ClimaCard';
import ClimaSemanal from '@/components/ClimaSemanal';

export default function Clima() {
    const [cidade, setCidade] = useState(localStorage.getItem('ultimaCidadePesquisada') || '');
    const [data, setData] = useState();

    useEffect(() => {
        const buscarClima = async () => {
            try {
                // Verifica se a localização atual do usuário está disponível
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=pt_br&units=metric&appid=42e29d143e6e7b8595bc2a484ea78108`);
                        setData(response.data);
                        setCidade(response.data.name);
                        localStorage.setItem('ultimaCidadePesquisada', response.data.name); // Armazena a cidade no localStorage
                        localStorage.setItem('clima', JSON.stringify(response.data)); // Armazena a previsão do clima no localStorage
                    });
                } else {
                    console.error('Geolocalização não suportada neste navegador.');
                }
            } catch (error) {
                console.error(error);
            }
        };

        buscarClima();

        if (cidade) {
            buscarClimaPorNome();
        }
    }, [cidade]);

    const iconUrl = data? `http://openweathermap.org/img/wn/${data.weather[0].icon}.png` : '';

    const buscarClimaPorNome = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt_br&units=metric&appid=42e29d143e6e7b8595bc2a484ea78108`);
            setData(response.data);
            localStorage.setItem('ultimaCidadePesquisada', cidade);
            localStorage.setItem('clima', JSON.stringify(response.data)); // Atualiza a previsão do clima no localStorage
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="flex flex-col w-full min-h-screen p-8 bg-gray-900 items-center center space-y-6">
            <div className='flex flex-row items-center justify-between w-full space-x-2'>
                <Link href="/">
                    <Image
                        src="/weather.png"
                        alt="Imagem de Fundo"
                        width={40}
                        height={40}
                    />
                </Link>
            </div>

            <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl text-center">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl dark:text-white">Explore a previsão do tempo local</h1>
                    <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Permita que o navegador acesse sua localização ou pesquise a cidade abaixo.</p>

                    <div className='flex flex-col w-full items-center justify-center'>
                        {!data? (
                            <div class="flex items-center p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 mb-6" role="alert">
                                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10.5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                    <span class="font-medium">Permita que o navegador acesse sua localização!</span>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className='flex flex-row'>
                            <div className="relative w-full">
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite o nome da cidade" value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                    required />
                            </div>
                            <button type="submit" onClick={buscarClimaPorNome} className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {data && (
                <div className='flex flex-row w-full space-x-6'>
                    <div className='flex flex-col p-6 border border-gray-200 rounded-lg shadow dark:bg-slate-900 dark:border-gray-700 space-y-6'>
                        <div><span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-1.5 rounded dark:bg-green-900 dark:text-green-300">Previsão atual</span></div>
                        <ClimaCard
                            iconUrl={iconUrl}
                            name={data.name}
                            temperature={data.main.temp}
                            description={data.weather[0].description}
                        />
                    </div>

                    <div className=' w-full border border-gray-200 rounded-lg shadow dark:bg-slate-800 dark:border-gray-700'>

                    </div>
                </div>
            )}

            {data && (
                <div className='flex flex-col space-y-6 p-6 w-full border border-gray-200 rounded-lg shadow dark:bg-slate-900 dark:border-gray-700'>
                    <div><span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-1.5 rounded dark:bg-green-900 dark:text-green-300">Previsão dos próximos 5 dias</span></div>
                    <ClimaSemanal cidade={cidade} />
                </div>
            )}
        </main>
    );
}
