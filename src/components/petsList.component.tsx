import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { IPet } from "../models/IPet";
import { findPetsByStatus } from "../services/pets.service";
import { isvalidURL } from "../utils/checks.utils";

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
      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a
          className={
            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
            (openTab === 1
              ? "text-white bg-blue-600"
              : "text-blue-600 bg-white")
          }
          onClick={(e) => {
            handleSetOpenTab(e, 1);
          }}
          data-toggle="tab"
          href="#link1"
          role="tablist"
        >
          Available
        </a>
      </li>
      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a
          className={
            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
            (openTab === 2
              ? "text-white bg-blue-600"
              : "text-blue-600 bg-white")
          }
          onClick={(e) => {
            handleSetOpenTab(e, 2);
          }}
          data-toggle="tab"
          href="#link2"
          role="tablist"
        >
          Pending
        </a>
      </li>
      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
        <a
          className={
            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
            (openTab === 3
              ? "text-white bg-blue-600"
              : "text-blue-600 bg-white")
          }
          onClick={(e) => {
            handleSetOpenTab(e, 3);
          }}
          data-toggle="tab"
          href="#link3"
          role="tablist"
        >
          Sold
        </a>
      </li>
    </ul>
  );
};

const TabsContent: React.FC<{ openTab: number }> = ({ openTab }) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 w-full ">
          <div className="px-4 py-5 flex-auto">
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
  const petImgUrl = petObj.photoUrls?.[0];
  const finalImageUrl = isvalidURL(petImgUrl) ? petImgUrl : defaultPetImageUrl;
  return (
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
              className="text-xs font-semibold inline-block py-1 px-2 rounded text-white-600 bg-blue-200 uppercase last:mr-0 mr-1"
            >
              {x.name}
            </span>
          ))}
        </div>
        <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
