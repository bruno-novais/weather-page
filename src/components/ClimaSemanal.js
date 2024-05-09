// ClimaSemanal.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import ClimaCard from './ClimaCard';

const ClimaSemanal = ({ cidade }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const buscarClima = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&lang=pt_br&units=metric&appid=42e29d143e6e7b8595bc2a484ea78108`);
                setData(response.data.list.slice(0, 5));
            } catch (error) {
                console.error(error);
            }
        };

        buscarClima(); 
    }, [cidade]); 

    return (
        <>
            <div className='flex flex-row justify-between flex-wrap gap-y-6'>
                {data.map((item, index) => (
                    <ClimaCard
                        key={index}
                        iconUrl={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        temperature={item.main.temp}
                        description={item.weather[0].description}
                        minTemperature={item.main.temp_min} maxTemperature={item.main.temp_max}
                    />
                ))}
            </div>
        </>
    );
};

export default ClimaSemanal;