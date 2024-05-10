'use client'

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import axios from 'axios';
import ClimaCard from '@/components/ClimaCard';
import ClimaSemanal from '@/components/ClimaSemanal';


export default function Home() {
  const [cidade, setCidade] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const buscarClima = async () => {
      if (!navigator.geolocation) {
        console.error('Geolocalização não suportada neste navegador.');
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=pt_br&units=metric&appid=42e29d143e6e7b8595bc2a484ea78108`);
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      });
    };

    buscarClima();
  }, []);

  const iconUrl = data && data.weather && data.weather[0] ? `http://openweathermap.org/img/wn/${data.weather[0].icon}.png` : '';

  const iconcode = data ? data.weather[0].icon : '';


  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-4 bg-gray-900">
      <Image
        src="/weather.png"
        alt="Imagem de Fundo"
        width={180}
        height={180}
      />
      <section className="bg-white dark:bg-gray-900">
        <div className="flex flex-col space-y-8 py-8 px-4 mx-auto max-w-screen-xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl dark:text-white">Vença o clima!</h1>


          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Desafie a Natureza! Descubra a previsão do tempo da sua cidade e esteja preparado para qualquer clima.</p>


          <div className='flex flex-row w-full justify-center'>
            <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-900 p-4 ">
              <div className=" md:rounded-none md:rounded-s-lg">

                <div className="flex w-full items-center ">
                  {data && data.name ? (
                    <ClimaCard
                      iconUrl={iconUrl}
                      name={data.name}
                      temperature={data.main.temp}
                      description={data.weather[0].description}
                      minTemperature={data.main.temp_min}
                      maxTemperature={data.main.temp_max}
                    />
                  ) : (
                    <div className="flex items-center p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                      <svg className="flexShrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">Permita que o navegador acesse sua localização!</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
              {data && (
                <div className="flex flex-col justify-between p-6 leading-normal items-center">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Previsão atual em {data.name}</h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 w-80">Não seja pego desprevenido, confira a previsão completa.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="/clima" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Conferir Previsão Completa
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
