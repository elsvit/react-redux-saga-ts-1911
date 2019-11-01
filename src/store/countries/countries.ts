import { Reducer } from 'redux';

import { ICountry } from '../../types/ICountries';

// Actions
export enum CountriesActions {
  GET_COUNTRIES = 'countries/GET_COUNTRIES',
  SET_COUNTRIES = 'countries/SET_COUNTRIES',
  GET_REGION_COUNTRIES = 'countries/GET_REGION_COUNTRIES',
  SET_REGION_COUNTRIES = 'countries/SET_REGION_COUNTRIES',
  RESET = 'countries/RESET',
}

export type CountriesLoadableT =
  | typeof CountriesActions.GET_COUNTRIES
  | typeof CountriesActions.GET_REGION_COUNTRIES;

export interface IGetCountriesAction {
  type: typeof CountriesActions.GET_COUNTRIES;
}

interface ISetCountriesAction {
  type: typeof CountriesActions.SET_COUNTRIES;
  payload: ICountry[];
}

export interface IGetRegionCountriesAction {
  type: typeof CountriesActions.GET_REGION_COUNTRIES;
  payload: string;
}

interface ISetRegionCountriesAction {
  type: typeof CountriesActions.SET_REGION_COUNTRIES;
  payload: ICountry[];
}

interface IResetCountriesAction {
  type: typeof CountriesActions.RESET;
}

type CountriesActionsT =
  | IGetCountriesAction
  | ISetCountriesAction
  | IResetCountriesAction
  | IGetRegionCountriesAction
  | ISetRegionCountriesAction;

export const getCountriesAction = (): IGetCountriesAction => ({
  type: CountriesActions.GET_COUNTRIES,
});

export const setCountriesAction = (payload: ICountry[]): ISetCountriesAction => ({
  type: CountriesActions.SET_COUNTRIES,
  payload,
});

export const getRegionCountriesAction = (payload: string): IGetRegionCountriesAction => ({
  type: CountriesActions.GET_REGION_COUNTRIES,
  payload,
});

export const setRegionCountriesAction = (payload: ICountry[]): ISetRegionCountriesAction => ({
  type: CountriesActions.SET_REGION_COUNTRIES,
  payload,
});

export const resetCountriesAction = (): IResetCountriesAction => ({
  type: CountriesActions.RESET,
});

//Reducer
export interface ICountriesState {
  countries: ICountry[];
}

export type CountriesStateT = Readonly<ICountriesState>;

const initialState: ICountriesState = {
  countries: [],
};

const reducer: Reducer<CountriesStateT> = (
  state: ICountriesState = initialState,
  action: CountriesActionsT,
) => {
  switch (action.type) {
    case CountriesActions.SET_COUNTRIES:
    case CountriesActions.SET_REGION_COUNTRIES:
      return { ...state, countries: action.payload };

    case CountriesActions.RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
