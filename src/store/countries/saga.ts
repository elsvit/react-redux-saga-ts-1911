import { put, takeEvery } from 'redux-saga/effects';

import { setLoaded, setLoading, setError } from '../common';
import { api } from '../store';
import { ICountry } from '../../types/ICountries';
import {setCountriesAction, setRegionCountriesAction, IGetRegionCountriesAction, CountriesActions} from './countries';

export function* sagaGetCountries() {
  const actionType = CountriesActions.GET_COUNTRIES;
  try {
    yield put(setLoading({ actionType }));
    const res: ICountry[] = yield api.countriesApi.getCountries();
    yield put(setCountriesAction(res));
    yield put(setLoaded({ actionType }));
  } catch (error) {
    const message = error.message || 'GET COUNTRIES ERROR';
    console.error(message);
    setError({actionType, message})
  }
}

export function* sagaGetRegionCountries({payload}: IGetRegionCountriesAction) {
  const actionType = CountriesActions.GET_REGION_COUNTRIES;
  try {
    yield put(setLoading({ actionType }));
    const res: ICountry[] = yield api.countriesApi.getRegionCountries(payload);
    yield put(setRegionCountriesAction(res));
    yield put(setLoaded({ actionType }));
  } catch (error) {
    const message = error.message || 'GET REGION COUNTRIES ERROR';
    console.error(message);
    setError({actionType, message})
  }
}

export default function*(): Generator {
  yield takeEvery(CountriesActions.GET_COUNTRIES, sagaGetCountries);
  yield takeEvery(CountriesActions.GET_REGION_COUNTRIES, sagaGetRegionCountries);
}
