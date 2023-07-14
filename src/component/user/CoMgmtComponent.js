import React, { Component } from 'react';
import { Box, Button, Grid, TextField, Card, CardContent, Typography, CardActionArea, Container, IconButton } from '@mui/material';
import UserService from '../../service/UserService';
import { brown, grey } from '@mui/material/colors';

class CoMgmtComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }


    render() {
        const {open, userList} = this.state;
        const currentDate = new Date();
                        //월을 0부터 시작하므로, 0부터 11까지의 값을 반환
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate()}`;
        return(
            <Container sx={{mt: 2}}>
            <Box sx={{ width:300, minHeight:750 , backgroundColor: '#EAEAEA'}}>
            <Box sx={{ width: 300 }}> 
            <Card sx={{mb:1 , border: '1px solid #000' }}>
              <CardActionArea >
                <CardContent>
                  <Typography sx={{ fontSize: 15 }} gutterBottom component='div'>
                    ss
                  </Typography>
                  <Typography sx={{ fontSize: 15 }} style={{ textAlign: 'right', marginTop: '-20px' }} component='div'>
                  {formattedDate}
                  </Typography>
                  <Typography sx={{ fontSize: 25 }} variant='h3' component='div'>
                    ss
                  </Typography>
                </CardContent>
              </CardActionArea></Card>

              <Card sx={{mb:1 , border: '1px solid #000'}}>
              <CardActionArea >
                <CardContent>
                  <Typography sx={{ fontSize: 15 }} gutterBottom component='div'>
                    ss
                  </Typography>
                  <Typography sx={{ fontSize: 15 }} style={{ textAlign: 'right', marginTop: '-20px' }} component='div'>
                  {formattedDate}
                  </Typography>
                  <Typography sx={{ fontSize: 25 }} variant='h3' component='div'>
                    ss
                  </Typography>
                </CardContent>
              </CardActionArea></Card>
              
            <Card sx={{  border: '3px solid #AFE1FF' }}>
            <CardActionArea >
            <CardContent>
                  <Typography sx={{ display: 'flex', justifyContent: 'center' , alignItems: 'center' }}>
                    INSERT
                  </Typography>
            </CardContent>
            </CardActionArea>
            </Card>
            
            </Box>
            </Box>
            
            </Container>
        );
    }
}

export default CoMgmtComponent;