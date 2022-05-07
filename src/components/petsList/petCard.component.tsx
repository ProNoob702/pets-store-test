import React from "react";
import { useState } from "react";
import { IPet } from "../../models/IPet";
import { isvalidURL } from "../../utils/checks.utils";
import { NiceBtn } from "../btn.component";
import { ConfirmModal } from "../confirmModal.component";

const defaultPetImageUrl =
  "https://www.dogstrust.ie/sponsor/_media/mystery-dog/133330dog-gallery.dog-profile-mobile-mystery-1.jpg";

interface IPetCardProps {
  petObj: IPet;
  handleDeletePet: (petObj: IPet) => any;
}

export const PetCard: React.FC<IPetCardProps> = ({
  petObj,
  handleDeletePet,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const petImgUrl = petObj.photoUrls?.[0];
  const finalImageUrl = isvalidURL(petImgUrl) ? petImgUrl : defaultPetImageUrl;

  return (
    <>
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img className="w-1/2 m-auto rounded-t-lg" src={finalImageUrl} alt="" />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {petObj.name}
          </h5>
          <div className="mb-2">
            {petObj.tags?.map((x) => (
              <span
                key={x.id}
                className="text-xs font-semibold inline-block py-1 px-2 rounded text-white-600 bg-sky-200 uppercase last:mr-0 mr-1"
              >
                {x.name}
              </span>
            ))}
          </div>
          <NiceBtn
            bgColor="sky"
            textColor="sky"
            label="Edit"
            classname="mr-3"
          />
          <NiceBtn
            bgColor="red"
            textColor="red"
            label="Delete"
            onClick={() => {
              setOpenDeleteModal(true);
            }}
          />
        </div>
      </div>
      <ConfirmModal
        infoTxt={`Sure you wanna delete ${petObj.name} pet ?`}
        okLabel="Delete"
        showModal={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleOk={() => {
          handleDeletePet(petObj);
          setOpenDeleteModal(false);
        }}
      />
    </>
  );
};
