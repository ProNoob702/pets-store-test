import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./reactTags.css";
import { TagsInput } from "react-tag-input-component";
import { IPet } from "../../models/IPet";
import { addNewPet } from "../../services/pets.service";
import { toast } from "react-toastify";

const inputCssClassname =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

type PetWithoutId = Omit<IPet, "id">;

export const NewPetComponent: React.FC<{}> = () => {
  const [petObj, setPetObj] = useState<PetWithoutId | null>(null);

  const handleUpdateNewPet = (e: ChangeEvent<any>) => {
    const inputName = e.target.name;
    const newValue = e.currentTarget.value;
    setPetObj({ ...petObj, [inputName]: newValue } as PetWithoutId);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const petId = Math.floor(Math.random() * 9999999);
    try {
      await addNewPet({ id: petId, ...petObj } as IPet);
      toast.success(`${petObj?.name} added successfly !`);
    } catch (error) {
      toast.error(`Failed to add ${petObj?.name}`);
    }
  };

  return (
    <>
      <div className="flex mt-16 mb-2 ">
        <Link
          to="/"
          className="border border-gray-500 bg-gray-500 text-white active:gray-pink-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 mr-3"
        >
          <i className="fa-solid fa-circle-left text-lg leading-9"></i>
        </Link>
        <h6 className="text-4xl font-normal leading-normal text-gray-800">
          New Pet
        </h6>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-5 m-auto p-5 border border-gray-300 rounded w-1/2"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className={inputCssClassname}
            placeholder="pet name"
            value={petObj?.name ? petObj.name : ""}
            onChange={handleUpdateNewPet}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            onChange={handleUpdateNewPet}
            value={petObj?.name ? petObj.status : ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Tags
          </label>
          <TagsInput
            value={petObj?.tags ? petObj.tags.map((x) => x.name) : []}
            onChange={(tags) => {
              const newTags = tags.map((x, i) => ({ id: i, name: x }));
              setPetObj({ ...petObj, tags: newTags } as PetWithoutId);
            }}
            name="tags"
            placeHolder="enter tags"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="photos"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Photos
          </label>
          <TagsInput
            value={petObj?.photoUrls ? petObj.photoUrls : []}
            onChange={(urls) => {
              setPetObj({ ...petObj, photoUrls: urls } as PetWithoutId);
            }}
            name="photos"
            placeHolder="enter photos urls"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-sky-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          Create
        </button>
      </form>
    </>
  );
};
