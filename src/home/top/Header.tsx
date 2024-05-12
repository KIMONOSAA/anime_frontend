

import Carousel from './Carousel';
import HomeAnimeList from './HomeAnimeList';
const Header = () => {

    
  return (
    <div className='header'>
       
       <div className='wrapper'>
            <Carousel />
            <HomeAnimeList />
       </div>

    </div>
  )
}

export default Header