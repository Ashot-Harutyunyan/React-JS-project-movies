import './singleGenreModal.style.scss'
import { useModals } from '../../../ctx/ModalsContext.jsx'
import { Link, useParams } from 'react-router'
import {IoCloseSharp} from "react-icons/io5"
import { LiaLocationArrowSolid } from "react-icons/lia"

function SingleGenreModal({movie, dialogRef, linkText}) {

    const { handleCloseModal } = useModals()
    const { genre, id } = useParams()

    function closeModal() {
        dialogRef.current?.close()
        handleCloseModal()
    }

    return (<dialog ref={dialogRef} className='modal-single-genre'
                onClick={(e)=> {
                    if (e.target === dialogRef.current) closeModal()
                }}
             >
            <div className="modal-single-genre-content">
                <div className='modal-single-genre-content-background'>
                    <div className='modal-single-genre-modal-close-container' onClick={closeModal}>
                        <IoCloseSharp className='modal-single-genre-modal-close-icon'/>
                    </div>
                    <div className="modal-single-genre-content-container-img">
                        <img src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path})`} alt={movie?.title}/>
                    </div>
                    <div className='modal-single-genre-content-info'>
                        <h3>{movie?.title}</h3>
                        <div>
                            <p>{movie?.release_date.split('-').reverse().join(' ')}</p>
                            <p>{movie?.overview}</p>
                            <Link to={`/${genre}/${id}/${movie?.id}`} onClick={closeModal}>
                                {linkText}
                                <LiaLocationArrowSolid className='modal-single-genre-content-info-icon'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    </dialog>)
}

export default SingleGenreModal