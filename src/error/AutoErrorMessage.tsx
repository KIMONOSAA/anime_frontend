
function AutoErrorMessage({message} : {message : string}) {
  return (
    <div className='gobal'>
      <div className={`gobal-error message-error`}>
          <p className='btn'>{message}</p>
      </div>
    </div>
  )
}

export default AutoErrorMessage