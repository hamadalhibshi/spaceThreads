import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';

export default function MultiActionAreaCard() {
  const authors = [
    {
      name: 'Hamad Alhibshi',
      created: '11/11/11',
    },
    {
      name: 'John Doe',
      created: '12/12/12',
    },
    {
      name: 'Jane Smith',
      created: '13/01/13',
    },
    {
      name: 'Author 4',
      created: '14/02/14',
    },
    {
      name: 'Author 5',
      created: '15/03/15',
    },
    {
      name: 'Author 6',
      created: '16/04/16',
    },
  ];

  const cardStyle = {
    maxWidth: 345,
    boxShadow: 'none',
    borderRadius: '12px',
    marginBottom: '20px',
    marginLeft:'50px'
  };

  const mediaStyle = {
    height: 350,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    objectFit: 'cover',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  };

  const contentStyle = {
    padding: '16px',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    color: '#007bff',
    fontWeight: 'bold',
    borderRadius: '25px',
    textTransform: 'uppercase',
    border: '2px solid #007bff',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    alignItems: 'center',
  };

  const rowStyle = {
    flexBasis: 'calc(33.33% - 20px)',
    marginRight: '20px',
  };

  return (
    <>
      <Typography
        variant='h3'
        sx={{
          mt: 7,
          mb: 4,
          ml: 7
        }}
      >
        Meet the Authors
      </Typography>
      <div style={containerStyle}>
        {authors.map((author, index) => (
          <div key={index} style={rowStyle}>
            <Card style={cardStyle}>
              <CardMedia
                style={mediaStyle}
                component="img"
                image="https://www.mediabistro.com/wp-content/uploads/2014/09/best-selling-author.jpg"
                alt="Author"
              />
              <CardContent style={contentStyle}>
                <Typography variant="h5" component="div" align="center" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  {author.name}
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  style={buttonStyle}
                  component={Link}
                  to="/"
                >
                  Visit Profile
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
