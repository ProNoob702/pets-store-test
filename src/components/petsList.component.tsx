import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { findPetsByStatus } from "../services/pets.service";

export const PetList: React.FC<{}> = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    (async () => {
      const pets = await findPetsByStatus("available");
      setPets(pets);
    })();
  }, []);

  return <div>{JSON.stringify(pets, null, 2)}</div>;
};
