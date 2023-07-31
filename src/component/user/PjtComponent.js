// import ListIcon from '@mui/icons-material/List';
// import Box from '@mui/material/Box';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import InputAdornment from '@mui/material/InputAdornment';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
// import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
// import { FiCalendar } from 'react-icons/fi'; // 예시로 사용한 아이콘 라이브러리

// class PjtComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       projectDate: null,
//       projectCategory: '',
//       projectClassification: '',
//       selectedDate: null,
//     };
//   }

//   handleDateChange = (date) => {
//     this.setState({ selectedDate: date });
//   };
//   dateChange = (date) => {
//     this.setState({
//       startDate: date
//     });
//   };

//   render() {
//     const projectCategories = [
//       { value: 'category1', label: '카테고리1' },
//       { value: 'category2', label: '카테고리2' },
//       { value: 'category3', label: '카테고리3' },
//     ];

//     const { startDate } = this.state;
//     return (
//       <div>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item>
//             <ListIcon fontSize="large" />
//           </Grid>
//           <Grid item>
//             <span>프로젝트 등록!!</span>
//           </Grid>
//         </Grid>
//         <Divider sx={{ my: 2 }} />
//         <Box sx={{ width: '90%', height: '15%', backgroundColor: '#f0f0f0', padding: '16px' }}>
//           <Grid container spacing={2} alignItems="center">
//             {/* 첫 번째 텍스트 필드와 라벨 */}
//             <Grid item xs={1}>
//               <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트</InputLabel>
//             </Grid>
//             <Grid item xs={3}>
//               <TextField
//                 fullWidth
//                 id="project-textfield"
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <ListIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>

//             {/* 두 번째 텍스트 필드와 라벨 */}
//             <Grid item xs={1}>
//               <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트구분</InputLabel>
//             </Grid>
//             <Grid item xs={3}>
//               <TextField
//                 select
//                 fullWidth
//                 id="project-category-select"
//                 value={this.state.projectCategory}
//               >
//                 {projectCategories.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             {/* 세 번째 텍스트 필드와 라벨 */}
//             <Grid item xs={1}>
//               <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트분류</InputLabel>
//             </Grid>
//             <Grid item xs={3}>
//               <TextField
//                 fullWidth
//                 id="project-classification-textfield"
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <ListIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={1}>
//               <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트기간</InputLabel>
//             </Grid>
//             <Grid item xs={3}>
//               <DatePicker dateFormat="yyyy-mm-dd" showIcon selected={startDate} onChange={this.dateChange} customInput={
//                 <div style={{ position: 'relative' }}>
//                   <input type='text' value={startDate} readOnly />
//                   <FiCalendar style={{ position: 'absolute', right: '10px', top: '5px' }} />
//                 </div>
//               } />
//             </Grid>
//           </Grid>
//         </Box>
//       </div >
//     );
//   }
// }

// export default PjtComponent;
import ListIcon from '@mui/icons-material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { FiCalendar } from 'react-icons/fi'; // 예시로 사용한 아이콘 라이브러리
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';
import Button from '@mui/material/Button';

class PjtComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDate: null,
      projectCategory: '',
      projectClassification: '',
      selectedDate: null,
      cardList: [], // 카드리스트를 저장할 배열
      selectedCard: null, // 클릭한 카드의 정보를 저장할 state 추가
    };
  }
  handleCardClick = (card) => {
    // 카드를 클릭했을 때 해당 카드의 정보를 저장하는 함수
    this.setState({ selectedCard: card });
  };

  handleRightComponentInputChange = (name, value) => {
    const { selectedCard, cardList } = this.state;
    if (selectedCard) {
      const updatedCard = {
        ...selectedCard,
        [name]: value,
      };
      const updatedList = cardList.map((card) =>
        card.id === selectedCard.id ? updatedCard : card
      );
      this.setState({
        cardList: updatedList,
        selectedCard: updatedCard, // Update the selectedCard in state to reflect changes in real-time.
      });
    }
  };

  handleSaveButtonClick = (updatedCard) => {
    const { cardList, selectedCard } = this.state;

    if (selectedCard) {
      const updatedList = cardList.map((card) =>
        card.id === selectedCard.id ? { ...card, ...updatedCard } : card
      );

      this.setState({
        cardList: updatedList,
        selectedCard: null, // 저장 후 선택한 카드 초기화
      });
    }
  };
  handleRightComponentInputChange = (name, value) => {
    // RightComponent에서 입력한 값을 카드리스트에 있는 각 항목에 적용하고자 할 때 사용
    // 여기서는 간단히 name과 value를 cardList에 추가하는 예시를 보여줍니다.
    const { cardList } = this.state;
    const newCardList = cardList.map((card) => ({
      ...card,
      [name]: value,
    }));
    this.setState({ cardList: newCardList });
  };
  handleInsetButtonClick = () => {
    // inset 버튼 클릭 시 새로운 카드리스트 생성
    const newCardList = [...this.state.cardList, { id: Date.now() }];
    this.setState({ cardList: newCardList });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };
  dateChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  render() {
    const projectCategories = [
      { value: 'category1', label: '카테고리1' },
      { value: 'category2', label: '카테고리2' },
      { value: 'category3', label: '카테고리3' },
    ];
    const { cardList } = this.state;
    const { startDate } = this.state;
    return (
      <div>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ListIcon fontSize="large" />
          </Grid>
          <Grid item>
            <span>프로젝트 등록!!</span>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ width: '90%', height: '15%', backgroundColor: '#f0f0f0', padding: '16px' }}>
          <Grid container spacing={2} alignItems="center">
            {/* 첫 번째 텍스트 필드와 라벨 */}
            <Grid item xs={1}>
              <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="project-textfield"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ListIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* 두 번째 텍스트 필드와 라벨 */}
            <Grid item xs={1}>
              <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트구분</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                fullWidth
                id="project-category-select"
                value={this.state.projectCategory}
              >
                {projectCategories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* 세 번째 텍스트 필드와 라벨 */}
            <Grid item xs={1}>
              <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트분류</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id="project-classification-textfield"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ListIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <InputLabel sx={{ display: 'flex', justifyContent: 'center' }}>프로젝트기간</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <DatePicker dateFormat="yyyy-mm-dd" showIcon selected={startDate} onChange={this.dateChange} customInput={
                <div style={{ position: 'relative' }}>
                  <input type='text' value={startDate} readOnly />
                  <FiCalendar style={{ position: 'absolute', right: '10px', top: '5px' }} />
                </div>
              } />
            </Grid>
          </Grid>
        </Box>
        {/* 아래쪽에 2개의 컴포넌트로 화면을 나누기 위해 Grid 컴포넌트를 사용합니다. */}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '20%', padding: '16px', backgroundColor: 'green' }}>
            <LeftComponent
              cardList={this.state.cardList}
              selectedCard={this.state.selectedCard}
              onCardClick={this.handleCardClick}
            />
            <div
              style={{
                position: 'sticky',
                bottom: '8%',
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* Inset 버튼 */}
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleInsetButtonClick}
                style={{ width: '200px' }}
              >
                Insert New Card
              </Button>
            </div>
          </Box>
          <Box sx={{ flex: 1, padding: '16px' }}>
            <RightComponent
              selectedCard={this.state.selectedCard}
              onInputChange={this.handleRightComponentInputChange}
              onSaveButtonClick={this.handleSaveButtonClick}
            />
          </Box>
        </Box>
      </div>
    );
  }
}

export default PjtComponent;
