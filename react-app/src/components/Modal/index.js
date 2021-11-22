import "./Modal.css";
import { useRef } from "react";
const Modal = (props) => {
    const modalRef = useRef();
    if (props.show) {
	return (<div className="modal" onClick={props.onClose}>
		<div className="modal-main" onClick={(e) => e.stopPropagation() }>
			<div className="modal-title">{props.title}</div>
			<div className="modal-content">{props.children}</div>
		</div>
	</div>
    )
    } else {
        return null;
    }
};

export default Modal;
