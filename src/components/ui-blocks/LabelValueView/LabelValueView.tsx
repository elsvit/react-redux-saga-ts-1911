import cn from 'classnames';
import React from 'react';

import './labelValueView.scss';

interface ILabelValueProps {
  label: string;
  value: Maybe<string | number | string[]>;
  className?: string;
}

const LabelValueView = (props: ILabelValueProps) => {
  const { label, value: propsValue, className } = props;
  let value = propsValue || '';
  let isImage = false;
  if (typeof value !== 'string' && typeof value !== 'number') {
    value = JSON.stringify(propsValue);
  } else if (typeof value === 'string' && value.slice(-3).toLowerCase() === 'svg') {
    isImage = true;
  }
  return (
    <div className={cn('label-value', className)}>
      <div className="label-value-label">{label.toString()}</div>
      {!isImage ? (
        <div className="label-value-text">{value}</div>
      ) : (
        <div className="label-value-image" style={{ backgroundImage: `url(${value})` }} />
      )}
    </div>
  );
};

export default LabelValueView;
