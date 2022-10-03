import React from 'react'
import './styles/filterList.css'

const FilterList = ({ suggestedList, setSearchInput, setSuggestedList }) => {

    const handleClick = id => setSearchInput(id)

    return (
        <ul className='list__suggest'>
            {
                suggestedList?.map(location => (
                    <li onClick={() => {document.getElementById('idLocation').value = '';
                    setSuggestedList()
                    return handleClick(location.id)}} key={location.id} className='filter__item'>{location.name}</li>
                ))
            }
        </ul>
    )
}

export default FilterList