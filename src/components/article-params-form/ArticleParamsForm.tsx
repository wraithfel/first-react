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
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open] : isOpen
				})}>
				<form
				 className={styles.form}
				 onSubmit={handleSubmit}
				 onReset={handleReset}
				>
				<Text weight={800} size={31} uppercase>
            Задайте параметры
          </Text>
          <Spacing size={50} />

          {/* Шрифт */}
          <Text size={12} weight={800} uppercase>
            Шрифт
          </Text>
          <Select
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            placeholder="Выберите шрифт"
            onChange={(opt) =>
              setFormState((s) => ({ ...s, fontFamilyOption: opt }))
            }
          />
          <Spacing size={30} />

          {/* Размер шрифта */}
          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(opt) =>
              setFormState((s) => ({ ...s, fontSizeOption: opt }))
            }
          />
          <Spacing size={30} />

          {/* Цвет шрифта */}
          <Text size={12} weight={800} uppercase>
            Цвет шрифта
          </Text>
          <Select
            selected={formState.fontColor}
            options={fontColors}
            placeholder="Выберите цвет шрифта"
            onChange={(opt) =>
              setFormState((s) => ({ ...s, fontColor: opt }))
            }
          />
          <Spacing size={30} />

          <Separator />
          <Spacing size={30} />

          {/* Цвет фона */}
          <Text size={12} weight={800} uppercase>
            Цвет фона
          </Text>
          <Select
            selected={formState.backgroundColor}
            options={backgroundColors}
            placeholder="Выберите цвет фона"
            onChange={(opt) =>
              setFormState((s) => ({ ...s, backgroundColor: opt }))
            }
          />
          <Spacing size={30} />

          {/* Ширина контента */}
          <Text size={12} weight={800} uppercase>
            Ширина контента
          </Text>
          <Select
            selected={formState.contentWidth}
            options={contentWidthArr}
            placeholder="Выберите ширину"
            onChange={(opt) =>
              setFormState((s) => ({ ...s, contentWidth: opt }))
            }
          />
          <Spacing size={50} />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" type="reset" />
            <Button title="Применить" type="submit" />
          </div>
        </form>
      </aside>
    </>
  );
};
