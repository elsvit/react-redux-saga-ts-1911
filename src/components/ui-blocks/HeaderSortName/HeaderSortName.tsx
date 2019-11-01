import cn from 'classnames';
import React, { Component } from 'react';

import SortArrows from '../../ui-kit/SortArrows';
import { SortType } from '../../../types/IBaseEntities';

import './headerSortName.scss';

interface IHeaderSortNameProps {
  title: string;
  changeSort: (title: string, active: SortType) => void;
  active?: SortType;
  className?: string;
}

class HeaderSortName extends Component<IHeaderSortNameProps> {
  public onArrowUpClick = () => {
    const { title, changeSort } = this.props;
    changeSort(title, SortType.DES);
  };

  public onArrowDownClick = () => {
    const { title, changeSort } = this.props;
    changeSort(title, SortType.ASC);
  };

  public render() {
    const { title, active, className } = this.props;
    const upActive = active === SortType.ASC;
    const downActive = active === SortType.DES;
    return (
      <div className={cn('header-filter-name', className)}>
        <div className="header-filter-name-text">{title}</div>
        <div className="header-filter-name-text-arrows">
          <SortArrows
            upActive={upActive}
            downActive={downActive}
            onArrowUpClick={this.onArrowUpClick}
            onArrowDownClick={this.onArrowDownClick}
          />
        </div>
      </div>
    );
  }
}

export default HeaderSortName;
