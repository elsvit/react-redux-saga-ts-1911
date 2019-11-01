import Grid from '@material-ui/core/Grid';
import React, {Component} from 'react';

import {ICountryAndDensity} from '../../../types/ICountries';
import LabelValueView from '../../ui-blocks/LabelValueView';

import Modal from '../Modal';

import './countryInfoModal.scss';

interface ICountryInfoModalProps {
  country: ICountryAndDensity;
  onClose: () => void;
}

class CountryInfoModal extends Component<ICountryInfoModalProps> {
  public render() {
    const { country, onClose } = this.props;
    return (
      <Modal
        isModalOpen={true}
        onClose={onClose}
        className={'country-info-modal-wrapper'}
        classNameInside={'country-info-modal'}
      >
        <div className="page-title border-bottom">{country.name}</div>
        <Grid container item className={'country-info-content'}>
          {Object.keys(country).map(key => {
            return (
              <Grid item xs={12} key={key}>
                <LabelValueView label={key} value={country[key]} />
              </Grid>
            );
          })}
        </Grid>
      </Modal>
    );
  }
}

export default CountryInfoModal;
