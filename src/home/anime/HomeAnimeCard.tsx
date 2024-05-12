
import { Link } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa';

const HomeAnimeCard  = (props: { data: { id: any; alias: any; description: any; name: any; photo: any; type: any; }; }) => {
    const {id,description,name,photo} = props.data;
    const handleContent = (dataDesc:string) => {
        let currentData = dataDesc.replace(/\n/g, "");

        if(currentData.length > 10){
            return currentData.slice(0,Math.ceil(7)) + '...'
        }else{
            return currentData
        }
    }

    return (
        <>
            <div key={id} className='home-imglist'>
                <div className='home-flex-img'>
                    <Link to={`/animeInfo/${id}`} className="link">
                        <div className='home-image-container'>
                            <img src={`data:image/png;base64, ${photo}`} alt='Room Photo'  />
                            <div className="home-circle-button">
                                {/* 你可以在这里放置按钮图标或文本 */}
                                <FaPlay color='white' size='12'  />
                            </div>
                        </div>
                        <p>{handleContent(name)}</p>
                    </Link>
                    <span>{handleContent(description)}</span>
                </div>
            </div>
    </>
  )
}

export default HomeAnimeCard