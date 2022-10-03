import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResidents from './components/CardResidents'
import ErrorScreen from './components/ErrorScreen'
import FilterList from './components/FilterList'
import LoadingCard from './components/Loading'
import LocationInfo from './components/LocationInfo'
import getRandomNumber from './utils/getRandomNumber'

function App() {
  // save location
  const [location, setLocation] = useState()
  // save input information and do request when realize submit
  const [searchInput, setSearchInput] = useState('')
  // save api suggestions
  const [suggestedList, setSuggestedList] = useState()
  // Set if has error
  const [hasError, setHasError] = useState(false)

  // Refresh when there are changes in the form
  useEffect(() => {
    let id = ''
  searchInput ?
      id = searchInput :
      id = getRandomNumber()

    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      }
      )
      .catch(err => setHasError(true))
  } , [searchInput])

  // Ejecutes when you click (or press enter) on the 'search' button
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchInput(e.target.idLocation.value);
    setSuggestedList()
  }

  //Ejecutes when you write, and recieve the suggestion list
  const handleChange = e => {

    if (e.target.value === '') {
      setSuggestedList()
    } else {

    const URL = `https://rickandmortyapi.com/api/location?name=${e.target.value}`

    axios.get(URL)
      .then(res => setSuggestedList(res.data.results))
      .catch(err => console.log(err))
    }
  }

  return (
    <div className="App">
      <img src="https://static.posters.cz/image/hp/66133.jpg" alt="Failed to load image" className='banner'/>
      <header className="header__info">
        <h1 className='title__general'>Rick and Morty</h1>
        <p>Welcome to the Rick and Morty wiki! Here you can find information of every character of the series.</p>
        <p>You can filter the characters putting in the searcher the location number.</p>
        <p>Also, you can write the name of the location too, with a list of suggestions.</p>
        <br />
        <form className='form' onSubmit={handleSubmit} autoComplete='off'>
          <input className='form__input' placeholder='Enter a number from 1 to 126' type="text" id="idLocation" onChange={handleChange}/>
          <button className='form__button'>Search</button>
          <FilterList
            suggestedList={suggestedList}
            setSearchInput={setSearchInput}
            setSuggestedList={setSuggestedList}
          />
        </form>
      </header>
      {
        hasError ?
          <ErrorScreen />
          :
          <>
            <LocationInfo location={location}/>
            <div className='card-container'>
              {
                (location) ?
                location?.residents.map(url => (
                  <CardResidents
                    key={url}
                    url={url} />
                  )
                )
                :
                  <LoadingCard />
              }
            </div>
          </>
      }
      
    </div>
  )
}

export default App
