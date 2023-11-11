import { useEffect, useState } from 'react';

export function Receta() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [titulo, setTitulo] = useState('');

    useEffect(() => {
        buscarRecetas(); // eslint-disable-next-line
    }, [titulo]);

    const buscarRecetas = () => {
        if (titulo.trim() !== '' || titulo.trim() !== null) {
            fetch(`http://localhost:8080/api/receta/buscarTitulo?cadena=${titulo}`)
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((error) => setError(error));
        } else {
            fetch(`http://localhost:8080/api/receta/all`)
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((error) => setError(error));
        }
    };

    const Dificultad = (nivel) => {
        switch (nivel) {
            case 'Fácil':
                return (
                    <div className="flex">
                        <div className="bg-green-500 w-4 h-4 rounded-full mr-1"></div>
                        <div className="bg-gray-300 w-4 h-4 rounded-full mr-1"></div>
                        <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
                    </div>
                );
            case 'Intermedio':
                return (
                    <div className="flex">
                        <div className="bg-orange-500 w-4 h-4 rounded-full mr-1"></div>
                        <div className="bg-orange-500 w-4 h-4 rounded-full mr-1"></div>
                        <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
                    </div>
                );
            case 'Difícil':
                return (
                    <div className="flex">
                        <div className="bg-red-500 w-4 h-4 rounded-full mr-1"></div>
                        <div className="bg-red-500 w-4 h-4 rounded-full mr-1"></div>
                        <div className="bg-red-500 w-4 h-4 rounded-full"></div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className=' bg-gradient-to-t from-indigo-400 to-teal-500'>
            <div className="flex items-center justify-center p-7">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={titulo}
                    onChange={(e) => {
                        setTitulo(e.target.value);
                        buscarRecetas();
                    }}
                    className="w-130 md:w-120 lg:w-2/3 xl:w-120 border border-gray-300 p-3 rounded-l-md focus:outline-none"
                />
                <img
                    src="icono-busqueda.svg"
                    alt="Lupa"
                    className="w-12 h-13 bg-gray-300 p-2 rounded-r-md"
                />
            </div>
            <div>
                <h1 className='text-center text-6xl font-montserrat font-extrabold'>Recetario</h1>
                <h1 className='text-center text-xl font-montserrat font-medium pt-5'>¿Qué vamos a comer hoy?</h1>
            </div>
            <div className="container mx-auto mt-8 grid gap-8 grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {error && <p className="text-red-500">{error.message}</p>}
                {data?.map((p) => (
                    <div
                        key={p.id}
                        className="bg-white border border-gray-300 font-roboto p-4 rounded-md shadow-md transition-transform transform hover:scale-105"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-center">{p.titulo}</h2>
                        <a href={p.imagen} target="_blank" rel="noopener noreferrer">
                            <img
                                src={p.imagen}
                                alt={p.titulo}
                                className="max-w-full h-auto cursor-pointer mb-2"
                            />
                        </a>
                        <p className="font-semibold mb-2">Ingredientes:</p>
                        <ul>
                            {p.ingredientes.split('\n').map((ingrediente, index) => (
                                <li key={index}>- {ingrediente}</li>
                            ))}
                        </ul>
                        <p className="font-semibold mb-2"> Tiempo de preparación:</p> <p className='mb-2'>{p.tiempo_preparacion} minutos</p>
                        <p className="font-semibold mb-2"> Dificultad: </p> <p className='mb-2'> {Dificultad(p.dificultad)} {p.dificultad} </p>
                        <a href={p.video} target="_blank" rel="noopener noreferrer">
                            <p className="font-semibold mb-2">Video: </p> <p className='text-blue-600 hover:text-sky-400  underline'> {p.video}</p>
                        </a>
                    </div>
                ))}
            </div>

            <div className='text-center p-10'>
                <a href='https://www.recetasnestle.com.mx/recetas' target='_blank' rel="noopener noreferrer"><button className="font-semibold mb-1 bg-red-500 text-white rounded-full py-3 px-10 hover:bg-red-700 transition-transform transform hover:scale-105">Ver más (sitio oficial) </button></a>
            </div>
        </div>
    );


}
