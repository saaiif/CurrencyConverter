import React from 'react';
import './App.css';
export default function CurrencyRow(props) {
	const { currentOptions, selectedCurrency, amount, onChangeAmount, onChangeEvent } = props;
	return (
		<div>
			<input type="number" className="input" value={amount} onChange={onChangeAmount} />
			<select value={selectedCurrency} onChange={onChangeEvent}>
				{currentOptions.map((options) => (
					<option key={options} value={options}>
						{options}
					</option>
				))}
			</select>
		</div>
	);
}
