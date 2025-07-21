import './singleProductModal.style.scss'
import {useModals} from "../../../ctx/ModalsContext.jsx"
import {IoCloseSharp} from "react-icons/io5"

function SingleProductModal({actor, dialogRef}) {

    const { handleCloseModal } = useModals()

    function closeModal() {
        dialogRef.current?.close()
        handleCloseModal()
    }

    return (<dialog ref={dialogRef} className='modal-singleProduct'
            onClick={(e)=> {
                if (e.target === dialogRef.current) closeModal()
            }}>
            <div className='modal-close-container'>
                <IoCloseSharp onClick={closeModal} className='modal-close-icon'/>
            </div>
            <div className="modal-singleProduct-content">
                <div className="modal-singleProduct-content-container-img">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${actor?.profile_path}`}
                        alt={actor?.name}/>
                </div>
                <p>{actor?.name}</p>
            </div>
    </dialog>)
}

export default SingleProductModal