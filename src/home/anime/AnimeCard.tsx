
import { Link } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa';

const AnimeCard  = (props: { data: { id: any; description: any; name: any; photo: any; }; }) => {
    const {id,description,name,photo} = props.data;
    const handleContent = (dataDesc:string) => {
        let currentData = dataDesc.replace(/\n/g, "");

        if(currentData.length > 10){
            return currentData.slice(0,Math.ceil(10)) + '...'
        }else{
            return currentData
        }
    }

    return (
        <>
            <div key={id} className='imglist'>
                <div className='flex-img'>
                    <Link to={`/animeInfo/${id}`} >
                        <div className='image-container'>
                            <img src={`data:image/png;base64, ${photo}`} alt='Room Photo' style={{width: "200px", maxWidth: "200px", height: "300px"}} />
                            <div className="circle-button">
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

export default AnimeCard