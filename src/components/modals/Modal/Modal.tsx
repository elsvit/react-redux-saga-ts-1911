import Modal from '@material-ui/core/Modal';
import classNames from 'classnames';
import React, {Component, Fragment} from 'react';

import './modal.scss';

export enum ModalStyleType {
  WHITE_LG = 'WHITE_LG',
  BLACK_LG = 'BLACK_LG',
}

interface IOwnProps {
  onClose: () => void;
  isModalOpen: boolean;
  isHideCross?: boolean;
  className?: string;
  classNameInside?: string;
  styleType?: ModalStyleType;
}

type ModalBodyProps = IOwnProps;

export default class ModalBody extends Component<ModalBodyProps> {
  public componentDidMount(): void {
    document.body.style.overflow = 'hidden';
  }

  public componentWillUnmount(): void {
    document.body.style.overflow = '';
  }

  public render() {
    const { onClose, classNameInside, isModalOpen, className, styleType } = this.props;
    return (
      <Modal
        open={isModalOpen}
        className={`modal-block-container ${isModalOpen ? 'show' : ''} ${
          className ? className : ''
        }`}
        onClose={onClose}
      >
        <Fragment>
          <div
            className={classNames(`modal-block ${classNameInside || ''}`, {
              'modal-white-bg': styleType === ModalStyleType.WHITE_LG,
            })}
          >
            {this.props.children}
            <div
              className={classNames('modal-close-icon', {
                'modal-white-bg': styleType === ModalStyleType.WHITE_LG,
              })}
              onClick={onClose && onClose}
            />
          </div>
        </Fragment>
      </Modal>
    );
  }
}
