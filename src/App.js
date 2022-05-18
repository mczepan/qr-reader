import React, { useState, useRef } from 'react';
import {
	Container,
	Card,
	CardContent,
	Grid,
	TextField,
	Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import QRCode from 'qrcode';
import QrScan from 'modern-react-qr-reader';

const useStyles = makeStyles((theme) => ({
	container: {
		margin: 10,
	},
	title: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: '#3f51b5',
		color: '#fff',
		padding: '1rem',
	},
	button: {
		marginTop: 10,
		marginBottom: 20,
	},
}));

function App() {
	const [url, setUrl] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const [scanResultFile, setScanResultFile] = useState('');
	const [scanResultWebCam, setScanResultWebCam] = useState('');

	const classes = useStyles();

	const qrRef = useRef(null);

	const urlToGenerate = (e) => {
		const { value } = e.target;
		setUrl(value);
	};

	const generateQRCode = async () => {
		try {
			const response = await QRCode.toDataURL(url);
			setImgUrl(response);
		} catch (err) {
			console.log('ERROR:', err);
		}
	};

	const handleErrorFile = (err) => {
		console.log(err);
	};

	const handleScanFile = (result) => {
		if (result) {
			setScanResultFile(result);
		}
	};

	const handleScanButton = () => {
		qrRef.current.openImageDialog();
	};

	const handleErrorWebCam = (err) => {
		console.log(err);
	};

	const [qrscan, setQrscan] = useState('No result');

	const handleScanWebCam = (result) => {
		if (result) {
			setScanResultWebCam(result);
		}
	};

	const handleScan = (data) => {
		if (data) {
			setQrscan(data);
		}
	};

	const handleError = (err) => {
		console.error(err);
	};

	return (
		<Container className={classes.container}>
			<Card>
				<h2
					className={classes.title}
				>{`Generate Download & Scan QR Code with React js`}</h2>
				<CardContent>
					<Grid container spacing={2}>
						<Grid
							item
							xl={6}
							xs={12}
							style={{ boxShadow: '0px 0px 2px 0px rgba(66, 68, 90, 1)' }}
						>
							<div style={{ display: 'flex', justifyContent: 'space-around' }}>
								<TextField
									label="Enter Text Here"
									size="small"
									onChange={urlToGenerate}
									value={url}
								></TextField>
								<Button
									className={classes.btn}
									variant="contained"
									color="primary"
									disabled={!url}
									onClick={generateQRCode}
								>
									Generate
								</Button>
							</div>

							{imgUrl && (
								<div style={{ textAlign: 'center' }}>
									<a href={imgUrl} download>
										<img
											src={imgUrl}
											alt="generated qr url"
											style={{ width: '70%', height: 'auto' }}
										/>
									</a>
								</div>
							)}
						</Grid>
						<Grid
							item
							xl={6}
							xs={12}
							style={{ boxShadow: '0px 0px 2px 0px rgba(66, 68, 90, 1)' }}
						>
							<h3>Qr Code Scan by Web Cam</h3>
							<QrScan
								delay={300}
								facingMode={'environment'}
								onError={handleError}
								onScan={handleScan}
								style={{ width: '100%' }}
							/>
							<h3>Scanned By WebCam: {qrscan}</h3>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Container>
	);
}

export default App;
