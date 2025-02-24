// src/pages/VendorDashboard.jsx
import React, { useState } from 'react'
import {
	Container,
	Box,
	Tabs,
	Tab,
	Typography,
	TextField,
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	InputAdornment,
} from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import { toast } from 'react-toastify'

function VendorDashboard() {
	const [tabIndex, setTabIndex] = useState(0)
	const [listingForm, setListingForm] = useState({
		propertyName: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		contactInfo: '',
		description: '',
		pricing: '',
		availableTypes: '',
		images: [],
	})

	const handleChangeTab = (event, newValue) => {
		setTabIndex(newValue)
	}

	const handleListingFormChange = e => {
		const { name, value, files } = e.target
		console.log(files)

		// if (name === 'images') {
		// 	setListingForm(prev => ({ ...prev, images: files }))
		// } else {
		// 	setListingForm(prev => ({ ...prev, [name]: value }))
		// }
	}

	const handleAddListing = e => {
		e.preventDefault()
		// TODO: Replace with an API call to add the listing.
		console.log('New Listing Data', listingForm)
		toast.success('Listing added successfully')
		// Reset the form
		setListingForm({
			propertyName: '',
			address: '',
			city: '',
			state: '',
			zip: '',
			contactInfo: '',
			description: '',
			pricing: '',
			availableTypes: '',
			images: null,
		})
	}

	// Dummy data for listings and booking requests
	const dummyListings = [
		{ id: 1, propertyName: 'Hotel Sunshine', city: 'New York', state: 'NY', status: 'Active' },
		{
			id: 2,
			propertyName: 'Restaurant Delight',
			city: 'San Francisco',
			state: 'CA',
			status: 'Pending',
		},
	]

	const dummyBookings = [
		{
			id: 1,
			listing: 'Hotel Sunshine',
			customer: 'Alice',
			date: '2023-10-10',
			status: 'Confirmed',
		},
		{
			id: 2,
			listing: 'Restaurant Delight',
			customer: 'Bob',
			date: '2023-10-12',
			status: 'Pending',
		},
	]

	const analyticsData = {
		totalListings: dummyListings.length,
		totalBookings: dummyBookings.length,
		revenue: '$10,000',
	}

	return (
		<Container maxWidth='lg'>
			<Box sx={{ my: 4 }}>
				<Typography variant='h4' component='h1' gutterBottom>
					Vendor Dashboard
				</Typography>
				<Tabs value={tabIndex} onChange={handleChangeTab} aria-label='Dashboard Tabs'>
					<Tab label='Add Listing' />
					<Tab label='Manage Listings' />
					<Tab label='Booking Requests' />
					<Tab label='Analytics' />
				</Tabs>

				{tabIndex === 0 && (
					<Box sx={{ mt: 3 }}>
						<Typography variant='h6' gutterBottom>
							Add New Listing
						</Typography>
						<Box component='form' onSubmit={handleAddListing} noValidate sx={{ mt: 2 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										label='Property Name'
										name='propertyName'
										value={listingForm.propertyName}
										onChange={handleListingFormChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										label='Address'
										name='address'
										value={listingForm.address}
										onChange={handleListingFormChange}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField
										required
										fullWidth
										label='City'
										name='city'
										value={listingForm.city}
										onChange={handleListingFormChange}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField
										required
										fullWidth
										label='State'
										name='state'
										value={listingForm.state}
										onChange={handleListingFormChange}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField
										required
										fullWidth
										label='Zip'
										name='zip'
										value={listingForm.zip}
										onChange={handleListingFormChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										label='Contact Information'
										name='contactInfo'
										value={listingForm.contactInfo}
										onChange={handleListingFormChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										label='Description & Facilities'
										name='description'
										multiline
										rows={4}
										value={listingForm.description}
										onChange={handleListingFormChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										required
										fullWidth
										label='Pricing Information'
										name='pricing'
										value={listingForm.pricing}
										onChange={handleListingFormChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										required
										fullWidth
										label='Available Room/Table Types'
										name='availableTypes'
										value={listingForm.availableTypes}
										onChange={handleListingFormChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant='contained'
										component='label'
										startIcon={<UploadIcon />}
									>
										Upload Images
										<input
											type='file'
											hidden
											multiple
											name='images'
											onChange={handleListingFormChange}
										/>
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Button type='submit' fullWidth variant='contained'>
										Add Listing
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Box>
				)}

				{tabIndex === 1 && (
					<Box sx={{ mt: 3 }}>
						<Typography variant='h6' gutterBottom>
							Manage Listings
						</Typography>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Property Name</TableCell>
										<TableCell>City</TableCell>
										<TableCell>State</TableCell>
										<TableCell>Status</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{dummyListings.map(listing => (
										<TableRow key={listing.id}>
											<TableCell>{listing.propertyName}</TableCell>
											<TableCell>{listing.city}</TableCell>
											<TableCell>{listing.state}</TableCell>
											<TableCell>{listing.status}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				)}

				{tabIndex === 2 && (
					<Box sx={{ mt: 3 }}>
						<Typography variant='h6' gutterBottom>
							Booking Requests
						</Typography>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Listing</TableCell>
										<TableCell>Customer</TableCell>
										<TableCell>Date</TableCell>
										<TableCell>Status</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{dummyBookings.map(booking => (
										<TableRow key={booking.id}>
											<TableCell>{booking.listing}</TableCell>
											<TableCell>{booking.customer}</TableCell>
											<TableCell>{booking.date}</TableCell>
											<TableCell>{booking.status}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				)}

				{tabIndex === 3 && (
					<Box sx={{ mt: 3 }}>
						<Typography variant='h6' gutterBottom>
							Analytics
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={12} md={4}>
								<Paper elevation={3} sx={{ p: 2 }}>
									<Typography variant='h6'>Total Listings</Typography>
									<Typography variant='h4'>
										{analyticsData.totalListings}
									</Typography>
								</Paper>
							</Grid>
							<Grid item xs={12} md={4}>
								<Paper elevation={3} sx={{ p: 2 }}>
									<Typography variant='h6'>Total Bookings</Typography>
									<Typography variant='h4'>
										{analyticsData.totalBookings}
									</Typography>
								</Paper>
							</Grid>
							<Grid item xs={12} md={4}>
								<Paper elevation={3} sx={{ p: 2 }}>
									<Typography variant='h6'>Revenue</Typography>
									<Typography variant='h4'>{analyticsData.revenue}</Typography>
								</Paper>
							</Grid>
						</Grid>
					</Box>
				)}
			</Box>
		</Container>
	)
}

export default VendorDashboard
