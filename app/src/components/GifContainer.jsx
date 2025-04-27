/* 
This component is meant to display gifs. However, there are two different sets of gifs that this component can display, depending on the user's actions. At first, they should see trending gifs but after submitting a search term in the GifSearch form, they should see gifs related to their search.

TODO:
- use the getTrendingGifs adapter to fetch trending gifs on the first render
- each time the user submits the form in GifSearch, use the getGifsBySearch adapter to fetch gifs according to the search term.
- render the list of fetched gifs (or the defaultGifs) as list items with an `img` inside. Remember to give each list item a unique key!
- Bonus: if at any point an error is returned, render the default gifs again.
*/

import defaultGifs from '../gifs.json';
import { getGifsBySearch, getTrendingGifs } from '../adapters/giphyAdapters';
import { useEffect, useState } from 'react'// you added this
//import { getTrendingGifs } from './adapters/giphyAdapters.js' // you added this
import GifSearch from './GifSearch'


const GifContainer = () => {
    const [gifs, setGifs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
      const fetchTrending = async () => {
        const trendingGifs = await getTrendingGifs()
        console.log(trendingGifs) // <--- See the shape of the data
        setGifs(trendingGifs)
      }
  
      fetchTrending()
    }, []) // <-- empty dependency array = runs ONLY once
    useEffect(() => {
        if (searchTerm) { // Only fetch if searchTerm isn't empty
          const fetchGifs = async () => {
            const searchedGifs = await getGifsBySearch(searchTerm)
            setGifs(searchedGifs)
          }
    
          fetchGifs()
        }
      }, [searchTerm]) // <--- run effect when searchTerm changes
    
  
    return (
        <div>
          <GifSearch setSearchTerm={setSearchTerm} />
          <ul>
            {gifs.map((gif) => (
              <li key={gif.id}>
                <img src={gif.images.original.url} alt={gif.title} />
              </li>
            ))}
          </ul>
        </div>
      )
}

export default GifContainer





