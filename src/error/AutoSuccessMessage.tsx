
function AutoSuccessMessage({message} : {message : string}) {
  return (
    <div className='gobal'>
        <div className={`gobal-success message-success`}>
            <p className='btn' >{message}</p>
        </div>
    </div>
  )
}

export default AutoSuccessMessage