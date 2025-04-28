import { useState } from 'react';
import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	onClick: OnClick;
	isOpen: boolean;
  };

  
  export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => (
	<div
	  role="button"
	  aria-label="Открыть/Закрыть форму параметров статьи"
	  tabIndex={0}
	  onClick={onClick}
	  className={clsx(styles.container, {
		[styles.container_open]: isOpen,
	  })}
	>
	  <img
		src={arrow}
		alt=""
		className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
	  />
	</div>
  );