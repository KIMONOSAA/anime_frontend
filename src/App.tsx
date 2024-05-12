
import AddAnime from './admin/AddAnime'
import Home from './home/Home'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import NavBar from './home/top/NavBar'
import AnimeList from './home/anime/AnimeList'
import AnimeInfo from './home/anime/AnimeInfo'
import AddVideoUrl from './admin/AddVideoUrl'
import AnimePlayers from './home/anime/AnimePlayers'
import UserRegister from './home/register/UserRegister';
import Login from './home/register/Login';
import PersonInfo from './person/PersonInfo'
import ProtectedRoute from './person/ProtectedRoute'
import UploadFIle from './test/UploadFIle'
import Search from './search/Search'
import Leaderboard from './leaderboard/Leaderboard'


function App() { 
    
  return (
      
       
            <Router>
            <NavBar />
              {/* <PlayAnime /> */}
              <Routes>
                <Route path='/test' element={<UploadFIle />} />
                
                <Route path='/leaderboard' element={<Leaderboard />} />
                <Route path='/search' element={<Search />} />
                <Route path='/register' element={<UserRegister />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/Japanese-anime' element={<AnimeList />} />
                <Route path='/addAnime' element={<AddAnime />} />
                <Route path='/animeInfo/:dataId' element={<AnimeInfo />} />
                <Route path='/addVideoUrl/:urlId' element={<AddVideoUrl />} />
                <Route path='/animePlayers/:dataId/:item' element={<AnimePlayers />} />
                <Route  
                    path="/owninfo"  
                    element={(  
                      <ProtectedRoute>  
                        <PersonInfo />  
                      </ProtectedRoute>  
                    )}  
                  />  
              </Routes>
              
              {/* <TestSlider /> */}
              
            </Router>
       
  )
}

export default App
