import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IPet } from "../models/IPet";
import { deletePet, findPetsByStatus } from "../services/pets.service";
import { isvalidURL } from "../utils/checks.utils";
import { NiceBtn } from "./btn.component";
import { ConfirmModal } from "./confirmModal.component";

export const PetList: React.FC<{}> = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const handleSetOpenTab = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    i: number
  ) => {
    e.preventDefault();
    setOpenTab(i);
  };
  return (
    <>
      <div className="flex mt-16 mb-2">
        <h6 className="text-4xl font-normal leading-normal text-gray-800">
          Pets list
        </h6>
        <span className="grow"></span>
        <NiceBtn bgColor="sky" label="Create new pet" />
      </div>
      <TabsList handleSetOpenTab={handleSetOpenTab} openTab={openTab} />
      <TabsContent openTab={openTab} />
    </>
  );
};

const TabsList: React.FC<{
  openTab: number;
  handleSetOpenTab: (e: React.MouseEvent<any>, i: number) => unknown;
}> = ({ openTab, handleSetOpenTab }) => {
  return (
    <ul
      className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
      role="tablist"
    >
      <NiceTab clickHandle={handleSetOpenTab} openTab={openTab} i={1}>
        Available
      </NiceTab>
      <NiceTab clickHandle={handleSetOpenTab} openTab={openTab} i={2}>
        Pending
      </NiceTab>
      <NiceTab clickHandle={handleSetOpenTab} openTab={openTab} i={3}>
        Sold
      </NiceTab>
    </ul>
  );
};

const NiceTab: React.FC<{
  children: any;
  openTab: number;
  clickHandle: (e: React.MouseEvent<any>, i: number) => unknown;
  i: number;
}> = ({ children, openTab, clickHandle, i }) => {
  return (
    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <a
        className={
          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
          (openTab === i ? "text-white bg-sky-600" : "text-sky-600 bg-white")
        }
        onClick={(e) => {
          clickHandle(e, i);
        }}
        data-toggle="tab"
        href="#link1"
        role="tablist"
      >
        {children}
      </a>
    </li>
  );
};

const TabsContent: React.FC<{ openTab: number }> = ({ openTab }) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 w-full ">
          <div className=" flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <TabContent status="available" />
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <TabContent status="pending" />
              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <TabContent status="sold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabContent: React.FC<{ status: IPet["status"] }> = ({ status }) => {
  const [pets, setPets] = useState<IPet[] | undefined>([]);
  useEffect(() => {
    (async () => {
      const pets = await findPetsByStatus(status);
      if (pets) setPets(pets);
    })();
  }, [status]);
  if (!pets) return <div>There is no pets</div>;
  return (
    <div className="grid gap-4 grid-cols-3">
      {pets.map((p) => (
        <PetCard key={p.id} petObj={p} />
      ))}
    </div>
  );
};

const defaultPetImageUrl =
  "https://www.dogstrust.ie/sponsor/_media/mystery-dog/133330dog-gallery.dog-profile-mobile-mystery-1.jpg";

const PetCard: React.FC<{ petObj: IPet }> = ({ petObj }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const petImgUrl = petObj.photoUrls?.[0];
  const finalImageUrl = isvalidURL(petImgUrl) ? petImgUrl : defaultPetImageUrl;

  const doDeletePet = async () => {
    const res = await deletePet(petObj.id);
    setOpenDeleteModal(false);
  };

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
          <NiceBtn bgColor="sky" label="Edit" classname="mr-3" />
          <NiceBtn
            bgColor="red"
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
        handleOk={() => doDeletePet()}
      />
    </>
  );
};
