import { useState, useEffect, useCallback } from "react";
import axios from "axios";
const url = "http://localhost:3001/groups";

interface pickersData {
  id: number;
  name: string;
  color: string;
}

export const readMatPickers = async () => {
  try {
    await axios.get<pickersData[]>(url);
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const addMatPickers = async (name: string, color: string) => {
  try {
    await axios.post(url, {
      name,
      color,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const deleteMatPickers = async (id: number) => {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

export const updateMatPickers = async (
  id: number,
  name: string,
  color: string
) => {
  try {
    await axios.patch(`${url}/${id}`, {
      name,
      color,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
