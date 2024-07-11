import {useState} from "react";
import Button from "../../ui/Button.jsx";
import {Modal} from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

export function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false)

    return (
        <>
            <Button onClick={() => setIsOpenModal(!isOpenModal)}>Add New Cabin</Button>
            {isOpenModal && (
                <Modal onCloseModal={() => setIsOpenModal(false)}>
                    <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
                </Modal>
            )}
        </>
    )
}
