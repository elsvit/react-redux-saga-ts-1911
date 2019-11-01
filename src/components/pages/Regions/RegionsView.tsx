import React from 'react';

import { ILabelValue } from '../../../types/IBaseEntities';
import BG_IMG from '../../../resources/images/bg_map.gif';
import RegionRow from './RegionRow';

import './regions.scss';

interface IRegionsViewProps {
  regions: ILabelValue<string>[];
  onClick: (region: string) => void;
}

const RegionsView = ({ regions, onClick }: IRegionsViewProps) => {
  return (
    <div className="regions-wrapper">
      <div className="regions-bg" style={{backgroundImage: `url(${BG_IMG})`}}/>
      <div className="page-title">REGIONS</div>
      {regions.map((region: ILabelValue<string>) => (
        <RegionRow key={region.value} region={region} onClick={onClick} />
      ))}
    </div>
  );
};

export default RegionsView;
