import axios, { AxiosRequestHeaders } from "axios";
import { IPet } from "../models/IPet";
import { NoDuplicatesByKey } from "../utils/checks.utils";

const apiBaseUrl = "https://petstore.swagger.io/v2";

const headers: AxiosRequestHeaders = {
  "Content-Type": "application/json",
  api_key: "special-key",
};

export const findPetsByStatus = async (status: IPet["status"]) => {
  const url = `${apiBaseUrl}/pet/findByStatus?status=${status}`;
  const res = await axios.get(url, { headers });
  return NoDuplicatesByKey(res.data, (x) => x.id) as IPet[];
};

export const addNewPet = async (newPet: IPet) => {
  const url = `${apiBaseUrl}/pet`;
  return await axios.post(url, newPet, { headers });
};

export const updatePet = async (updatedPet: IPet) => {
  const url = `${apiBaseUrl}/pet`;
  return await axios.put(url, updatedPet, { headers });
};

export const deletePet = async (petId: number) => {
  const url = `${apiBaseUrl}/pet/${petId}`;
  return await axios.delete(url, { headers });
};
