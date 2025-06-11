function InfoTooltip({ isOpen, onClose, success }) {
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <div className={`popup__icon ${success ? "popup__icon_success" : "popup__icon_fail"}`} />
                <p className="popup__message">
                    {success ? "Cadastro realizado com sucesso!" : "Ocorreu um erro. Tente novamente."}
                </p>
                <button type="button" className="popup__close" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;
