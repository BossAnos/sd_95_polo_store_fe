import { React } from "react";
import { useTranslation } from "react-i18next";
import iconCancel from "../../assets/icon/cancel.svg";
import { Button, TYPE_BUTTON } from "../button";

function Modal(props) {
  const { t } = useTranslation();

  const onClickCloseModal = () => {
    props.onCancel();
  };
  const onClickSave = () => {
    props.onSave();
  };

  return (
    <>
      {props.show && (
        <div className="modal">
          <div className="fixed opacity-25 h-screen bottom-0 top-0 left-0 right-0 z-40 bg-black"></div>
          <div
            id="popup-modal"
            className="fixed z-50 md:inset-0 max-h-full flex justify-center overflow-auto my-6"
          >
            <div className="w-600">
              <div className=" bg-white flex flex-col justify-between p-4 relative rounded shadow-xl">
                <div className="flex justify-between">
                  <p
                    className={`text-lg text-gray-700 ${
                      props.classNameTitle ? props.classNameTitle : ""
                    }`}
                  >
                    {props.title}
                  </p>
                  <img
                    src={iconCancel}
                    alt=""
                    onClick={onClickCloseModal}
                    className="w-4 h-4 cursor-pointer"
                  />
                </div>
                <div className="py-6">{props.children}</div>
                <div className="flex justify-end space-x-4">
                  <Button
                    type={TYPE_BUTTON.DEFAULT}
                    title={props.titleCancel || t("Cancel")}
                    onClick={onClickCloseModal}
                  />
                  <Button
                    type={props.typeSave || TYPE_BUTTON.PRIMARY}
                    title={props.titleSave || t("Save")}
                    onClick={onClickSave}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
