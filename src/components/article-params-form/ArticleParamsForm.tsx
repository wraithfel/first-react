import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import { Spacing } from 'components/spacing';
import {
  ArticleStateType,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialState: ArticleStateType,
	onApply: (state:ArticleStateType) => void,
	onReset: () => void
}

export const ArticleParamsForm = ({initialState, onApply, onReset}: ArticleParamsFormProps) => {

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialState);

	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFormState(initialState)
	}, [initialState]);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange:setIsOpen,
		onClose: () => setIsOpen(false)
	})

	const toggle = () => setIsOpen((o) => (!o))

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	}

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(initialState)
		onReset();
		setIsOpen(false)

	}
	
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				className={styles.container}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
