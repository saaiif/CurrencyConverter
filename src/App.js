import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

const Base_API = 'https://api.exchangeratesapi.io/latest';

function App() {
	const [ currentOptions, setCurrentOptions ] = useState([]);
	const [ fromCurrency, setFromCurrency ] = useState();
	const [ toCurrency, setToCurrency ] = useState();
	const [ exchangeRate, setExchangeRate ] = useState();
	const [ amount, setAmount ] = useState(1);
	const [ amountInFromCurrency, setAmountInFromCurrency ] = useState(true);
	// const [ amountInToCurrency, setAmountInToCurrency ] = useState();

	let toAmount, fromAmount;
	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}

	useState(() => {
		fetch(Base_API).then((res) => res.json()).then((data) => {
			const firstCurrency = Object.keys(data.rates)[0];
			setCurrentOptions([ data.base, ...Object.keys(data.rates) ]);
			setFromCurrency(data.base);
			setToCurrency(firstCurrency);
			setExchangeRate(data.rates[firstCurrency]);
		});
	}, []);

	useEffect(
		() => {
			if (fromCurrency != null && toCurrency != null) {
				fetch(`${Base_API}?base=${fromCurrency}&symbols=${toCurrency}`)
					.then((res) => res.json())
					.then((data) => setExchangeRate(data.rates[toCurrency]));
			}
		},
		[ fromCurrency, toCurrency ]
	);

	function handleFromAmountChange(e) {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	}

	function handleToAmountChange(e) {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	}
	return (
		<div className="App">
			<h1>Convert</h1>
			<CurrencyRow
				currentOptions={currentOptions}
				selectedCurrency={fromCurrency}
				onChangeAmount={handleFromAmountChange}
				amount={fromAmount}
				onChangeEvent={(e) => setFromCurrency(e.target.value)}
			/>
			<div className="equals">=</div>
			<CurrencyRow
				currentOptions={currentOptions}
				selectedCurrency={toCurrency}
				onChangeAmount={handleToAmountChange}
				amount={toAmount}
				onChangeEvent={(e) => setToCurrency(e.target.value)}
			/>
		</div>
	);
}

export default App;
