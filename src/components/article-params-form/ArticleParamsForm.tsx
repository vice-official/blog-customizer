import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useState, useRef, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import {
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleStateType = typeof defaultArticleState;

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onApply: (newState: typeof defaultArticleState) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	articleState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const asideRef = useRef<HTMLElement | null>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (asideRef.current && !asideRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const [draftState, setDraftState] = useState(articleState);

	useEffect(() => {
		setDraftState(articleState);
	}, [articleState]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(draftState);
	};

	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setDraftState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={draftState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => {
							setDraftState((prev) => ({
								...prev,
								fontFamilyOption: value,
							}));
						}}
					/>

					<RadioGroup
						name='radioGroup'
						options={fontSizeOptions}
						selected={draftState.fontSizeOption}
						title='размер шрифта'
						onChange={(value) => {
							setDraftState((prev) => ({
								...prev,
								fontSizeOption: value,
							}));
						}}></RadioGroup>

					<Select
						title='Цвет шрифта'
						selected={draftState.fontColor}
						options={fontColors}
						onChange={(value) => {
							setDraftState((prev) => ({
								...prev,
								fontColor: value,
							}));
						}}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={draftState.backgroundColor}
						options={backgroundColors}
						onChange={(value) => {
							setDraftState((prev) => ({
								...prev,
								backgroundColor: value,
							}));
						}}
					/>

					<Select
						title='Ширина контента'
						selected={draftState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => {
							setDraftState((prev) => ({
								...prev,
								contentWidth: value,
							}));
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
