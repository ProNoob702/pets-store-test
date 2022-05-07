import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { IPet } from "../../models/IPet";
import { deletePet, findPetsByStatus } from "../../services/pets.service";
import { PetCard } from "./petCard.component";
import { NiceTab } from "../niceTab.component";
import { Link } from "react-router-dom";

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
        <Link
          to="/newPet"
          className={`hover:bg-sky-600  text-sky-600 border border-sky-600 hover:text-white
         active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded leading-6
          outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 `}
        >
          Create new pet
        </Link>
        {/* <NiceBtn bgColor="sky" textColor="sky" label="Create new pet" /> */}
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

const TabsContent: React.FC<{ openTab: number }> = ({ openTab }) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 w-full ">
          <div className=" flex-auto">
            <div className="tab-content tab-space">
              {openTab === 1 ? <TabContent status="available" /> : null}
              {openTab === 2 ? <TabContent status="pending" /> : null}
              {openTab === 3 ? <TabContent status="sold" /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabContent: React.FC<{ status: IPet["status"] }> = ({ status }) => {
  const [pets, setPets] = useState<IPet[] | undefined>([]);

  const fetchPets = useCallback(async () => {
    const pets = await findPetsByStatus(status);
    if (pets) setPets(pets);
  }, [status]);

  useEffect(() => {
    fetchPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeletePet = async (petObj: IPet) => {
    try {
      await deletePet(petObj.id);
      toast.success(`${petObj.name} deleted successfly !`);
      fetchPets();
    } catch (error) {
      toast.error(`Failed to delete ${petObj.name}`);
    }
  };

  if (!pets) return <div>There is no pets</div>;
  return (
    <div className="grid gap-4 grid-cols-3">
      {pets.map((p) => (
        <PetCard key={p.id} petObj={p} handleDeletePet={handleDeletePet} />
      ))}
    </div>
  );
};
