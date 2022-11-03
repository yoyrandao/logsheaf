import { Button, Grid, Slider, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

type ButtonColor =
	| "inherit"
	| "primary"
	| "secondary"
	| "success"
	| "error"
	| "info"
	| "warning"
	| undefined;

export const App = () => {
	const [logInterval, setLogInterval] = useLocalStorage<number>('logInterval', 100);
	const onLogIntervalChange = (_: Event, newValue: number | number[]) => {
		setApplied(false);
		setLogInterval(newValue as number);
	};

	const [loggerCount, setLoggerCount] = useLocalStorage<number>('loggerCount', 1);
	const onLogCountChange = (_: Event, newValue: number | number[]) => {
		setApplied(false);
		setLoggerCount(newValue as number);
	};

	const [applied, setApplied] = useLocalStorage<boolean>('settingsApplied', false);
	const [applyButtonColor, setApplyButtonColor] = useState<ButtonColor>(undefined);

	useEffect(() => {
		setApplyButtonColor(applied ? 'success' : 'warning');
	}, [applied])

	const onApply = () => {
		axios
			.post("/apply", { logInterval, loggerCount })
			.then(() => setApplied(true))
			.catch((e) => console.log(e));
	};

	const onCancel = () => {
		axios.post("/cancel").catch((e) => console.log(e));
	};

	return (
		<Container sx={{ marginTop: "100px" }} maxWidth="md">
			<Stack spacing={5} direction="column" alignItems="center">
				<Stack alignItems="center" sx={{ marginBottom: "80px" }}>
					<Typography variant="h2" sx={{ marginBottom: "20px" }}>
						LogSheaf
					</Typography>
					<Typography>Customizable log generation utility</Typography>
				</Stack>

				<Grid container spacing={3}>
					<Grid item xs={2}>
						<Typography id="log-interval-input-slider">Log Interval</Typography>
					</Grid>
					<Grid item xs={8}>
						<Slider
							value={logInterval}
							onChange={onLogIntervalChange}
							size="small"
							min={100}
							max={5000}
							step={100}
							aria-labelledby="log-interval-input-slider"
						/>
					</Grid>
					<Grid item xs={2}>
						<Typography>{logInterval}ms</Typography>
					</Grid>

					<Grid item xs={2}>
						<Typography id="logger-count-input-slider">
							Logger Instances
						</Typography>
					</Grid>
					<Grid item xs={8}>
						<Slider
							value={loggerCount}
							onChange={onLogCountChange}
							size="small"
							min={1}
							max={10}
							step={1}
							aria-labelledby="logger-count-input-slider"
						/>
					</Grid>
					<Grid item xs={2}>
						<Typography>{loggerCount}</Typography>
					</Grid>
				</Grid>

				<Stack spacing={2} direction="row">
					<Button
						variant="contained"
						color={applyButtonColor}
						onClick={onApply}
					>
						Apply
					</Button>
					<Button variant="contained" color="secondary" onClick={onCancel}>
						Cancel
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
};
