import axios, { AxiosRequestHeaders } from "axios";
import { IPet } from "../models/IPet";

const apiBaseUrl = "";

const headers: AxiosRequestHeaders = {
  "Content-Type": "application/json",
};

export const findPetsByStatus = async (status: IPet["status"]) => {
  try {
    const url = `${apiBaseUrl}/pet/findByStatus?status=${status}`;
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const addNewPet = async (newPet: IPet) => {
  const url = `${apiBaseUrl}/pet`;
  try {
    const resp = await axios.post(url, newPet, { headers });
    console.log(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const updatePet = async (updatedPet: IPet) => {
  const url = `${apiBaseUrl}/pet`;
  try {
    const resp = await axios.put(url, updatedPet, { headers });
    console.log(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

export const deletePet = async (petId: number) => {
  const url = `${apiBaseUrl}/pet/${petId}`;
  try {
    const resp = await axios.delete(url, { headers });
    console.log(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
