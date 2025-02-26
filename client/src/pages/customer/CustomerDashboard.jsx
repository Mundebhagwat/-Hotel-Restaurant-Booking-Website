import React, { useState } from 'react'
import {
	Container,
	Box,
	Typography,
	Tabs,
	Tab,
	Grid,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Button,
	TextField,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material'
import Carousel from 'react-material-ui-carousel'

const CustomerDashboard = () => {
	const [tabIndex, setTabIndex] = useState(0)
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState({
		city: '',
		state: '',
		district: '',
		areaStreet: '',
		price: '',
		rating: '',
	})
	const [selectedHotel, setSelectedHotel] = useState(null)
	const [open, setOpen] = useState(false)

	const hotels = [
		{
			id: 1,
			name: 'Luxury Hotel',
			city: 'New York',
			state: 'NY',
			district: 'Manhattan',
			areaStreet: '5th Ave',
			price: 200,
			rating: 4.8,
			amenities: ['WiFi', 'Pool', 'Spa'],
			images: ['hotel1.jpg', 'hotel2.jpg'],
			description: 'A luxurious hotel with modern amenities and stunning views.',
		},
		{
			id: 2,
			name: 'Elegant Restaurant',
			city: 'Los Angeles',
			state: 'CA',
			district: 'Hollywood',
			areaStreet: 'Sunset Blvd',
			price: 150,
			rating: 4.5,
			amenities: ['Fine Dining', 'Bar', 'Live Music'],
			images: ['restaurant1.jpg', 'restaurant2.jpg'],
			description: 'A premium dining experience with world-class cuisine and ambiance.',
		},
	]

	const handleChangeTab = (event, newValue) => setTabIndex(newValue)
	const handleFilterChange = event =>
		setFilter({ ...filter, [event.target.name]: event.target.value })
	const handleViewDetails = hotel => {
		setSelectedHotel(hotel)
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
		setSelectedHotel(null)
	}

	const filteredHotels = hotels.filter(
		hotel =>
			(filter.city === '' || hotel.city === filter.city) &&
			(filter.state === '' || hotel.state === filter.state) &&
			(filter.district === '' || hotel.district === filter.district) &&
			(filter.areaStreet === '' || hotel.areaStreet === filter.areaStreet) &&
			(filter.price === '' ||
				(filter.price === 'low' ? hotel.price <= 150 : hotel.price > 150)) &&
			(filter.rating === '' || hotel.rating >= parseFloat(filter.rating)) &&
			(search === '' || hotel.name.toLowerCase().includes(search.toLowerCase()))
	)

	return (
		<Container maxWidth='xl'>
			<Box sx={{ my: 4, textAlign: 'center' }}>
				<Typography variant='h3' component='h1' gutterBottom fontWeight='bold'>
					Explore Luxury Hotels & Restaurants
				</Typography>
				<Tabs value={tabIndex} onChange={handleChangeTab} centered>
					<Tab label='Browse Listings' />
					<Tab label='My Bookings' />
				</Tabs>
			</Box>
			<Box display='flex' justifyContent='center' mb={4}>
				<TextField
					label='Search'
					variant='outlined'
					sx={{ width: 300, mr: 2 }}
					onChange={e => setSearch(e.target.value)}
				/>
				<FormControl sx={{ width: 200, mr: 2 }}>
					<InputLabel>City</InputLabel>
					<Select name='city' value={filter.city} onChange={handleFilterChange}>
						<MenuItem value=''>All</MenuItem>
						<MenuItem value='New York'>New York</MenuItem>
						<MenuItem value='Los Angeles'>Los Angeles</MenuItem>
					</Select>
				</FormControl>
				<FormControl sx={{ width: 200, mr: 2 }}>
					<InputLabel>State</InputLabel>
					<Select name='state' value={filter.state} onChange={handleFilterChange}>
						<MenuItem value=''>All</MenuItem>
						<MenuItem value='NY'>NY</MenuItem>
						<MenuItem value='CA'>CA</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<Grid container spacing={4} justifyContent='center'>
				{filteredHotels.map(hotel => (
					<Grid item key={hotel.id} xs={12} sm={6} md={4} lg={3}>
						<Card sx={{ maxWidth: 400, borderRadius: 4, boxShadow: 3 }}>
							<Carousel>
								{hotel.images.map((image, index) => (
									<CardMedia
										key={index}
										component='img'
										height='250'
										image={image}
										alt={hotel.name}
									/>
								))}
							</Carousel>
							<CardContent>
								<Typography variant='h5' fontWeight='bold'>
									{hotel.name}
								</Typography>
								<Typography variant='body2' color='textSecondary'>
									{hotel.city}, {hotel.state}
								</Typography>
								<Typography variant='h6' color='primary'>
									${hotel.price}/night
								</Typography>
								<Typography variant='body2' color='textSecondary'>
									Rating: {hotel.rating} ⭐
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									size='large'
									color='primary'
									variant='contained'
									onClick={() => handleViewDetails(hotel)}
								>
									View Details
								</Button>
								<Button size='large' color='secondary' variant='outlined'>
									Book Now
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
			{selectedHotel && (
				<Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
					<DialogTitle>{selectedHotel.name}</DialogTitle>
					<DialogContent>
						<Carousel>
							{selectedHotel.images.map((image, index) => (
								<CardMedia
									key={index}
									component='img'
									height='300'
									image={image}
									alt={selectedHotel.name}
								/>
							))}
						</Carousel>
						<Typography variant='h6' mt={2}>
							Location: {selectedHotel.city}, {selectedHotel.state}
						</Typography>
						<Typography variant='h6' color='primary'>
							${selectedHotel.price}/night
						</Typography>
						<Typography variant='body1' mt={1}>
							{selectedHotel.description}
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color='primary'>
							Close
						</Button>
						<Button color='secondary' variant='contained'>
							Book Now
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Container>
	)
}

export default CustomerDashboard
