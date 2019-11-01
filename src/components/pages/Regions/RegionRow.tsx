import React from 'react';
import Paper from '@material-ui/core/Paper';

import { ILabelValue } from '../../../types/IBaseEntities';

interface IRegionRowProps {
  region: ILabelValue<string>;
  onClick: (region: string) => void;
}

const RegionRow = ({ region, onClick }: IRegionRowProps) => {
  return (
    <Paper
      className="region-row"
      onClick={() => onClick(region.value)}
      elevation={2}
    >
      {region.label}
    </Paper>
  );
};

export default RegionRow;
