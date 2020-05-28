import { LOADING_DATA, SET_DATA, SET_INDEX, SET_INDICES } from "../types";
import facts from "../../data/facts.json";

export const getFacts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  const data = facts.map((fact) => {
    return {
      id: fact.id,
      fact: fact.fact,
      characters: fact.characters,
      categories: fact.categories,
    };
  });

  dispatch({
    type: SET_DATA,
    payload: data,
  });
};

export const setIndex = (number) => (dispatch) => {
  dispatch({
    type: SET_INDEX,
    payload: number,
  });
};

export const setIndices = (numbers) => (dispatch) => {
  dispatch({
    type: SET_INDICES,
    payload: numbers,
  });
};
