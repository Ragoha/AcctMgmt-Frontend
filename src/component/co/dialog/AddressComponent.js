import React, { Component } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputLabel, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DaumPostcode from 'react-daum-postcode';

const postStyle = {
    height: 470
  };

class AddressComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddr: false
        }
    }

    handleUp = () => {
        this.setState({openAddr: true});
    }

    handleDown = () => {
        this.setState({openAddr: false});
    }


    // 주소 선택 이벤트
    selectAddress = (data) => {
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }

        console.log(fullAddr, data.zonecode);
        this.setState({ coZip: data.zonecode });
        this.setState({ coAddr: fullAddr });
        this.setState({ openAddr: false });// dialog창 꺼주기

        // 추가 코드: 주소 정보를 텍스트 필드에 설정
        // document.getElementById("coZip").value = data.zonecode;
        // document.getElementById("coAddr").value = fullAddr;
   
        this.props.setCoZipAddr({coZip : data.zonecode, coAddr : fullAddr});

    };

    render() {
        const { openAddr } = this.state;

        return (
            <Dialog open={openAddr} PaperProps={{ sx: { width: 430, height: 560 } }}>
                <DialogTitle sx={{ backgroundColor: '#7895CB', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>주소검색<IconButton size='small' onClick={() => this.setState({ openAddr: false })}>
                    <CloseIcon sx={{ color: "white" }} fontSize='medium' />
                </IconButton>
                </DialogTitle>

                <DialogContent sx={{ mt: 1 }} >
                    <DaumPostcode
                        style={postStyle}
                        onComplete={this.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                        autoClose={true} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    //defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                    />
                </DialogContent>
            </Dialog>
        );
    }
}

export default AddressComponent;