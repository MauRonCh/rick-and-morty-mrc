import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingCard from './Loading';
import './styles/cardResidents.css'

const CardResidents = ({ url }) => {

    const [resident, setResident] = useState();

    useEffect(() => {
        axios.get(url)
            .then(res => setResident(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <article className='card'>
            {(resident) ?
            <> <header className='card__header'>
                    <img src={resident?.image} alt="Failed to load image" />
                    <div className='card__container-status'>
                        <div className={`card__circle-status ${resident?.status}`}>ㅤ</div>
                        <span className='card__status'>{resident?.status}</span>
                    </div>
                </header>
                <section className='card__body'>
                    <h3 className='card__name'>{resident?.name}</h3>
                    <ul className='card__list'>
                        <li className='card__item'><span className='card__span'>Specie: </span>{resident?.species}</li>
                        <li className='card__item'><span className='card__span'>Origin: </span>{resident?.origin.name}</li>
                        <li className='card__item'><span className='card__span'>Episodes where appear: </span>{resident?.episode.length}</li>
                    </ul>
                </section>
            </>
            :
            <LoadingCard />
        }
        </article>
    )
}

export default CardResidents