import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

class LeftComponent extends Component {
  handleCardClick = (card) => {
    // 카드를 클릭했을 때 해당 카드의 정보를 부모 컴포넌트로 전달
    const { onCardClick } = this.props;
    onCardClick(card);
  };

  render() {
    const { cardList, selectedCard } = this.props; // PjtComponent로부터 전달된 cardList와 selectedCard를 사용

    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* 작은 화면 영역 */}
        <Box
          sx={{
            p: 2, // padding
            bgcolor: '#f0f0f0', // 박스 배경색
            flexGrow: 1, // 카드리스트가 화면을 벗어날 경우 작은 화면 영역만 늘어나도록 설정
            height: '50vh', // 카드리스트의 높이를 브라우저 뷰포트 높이의 50%로 설정
            overflowY: 'auto', // 작은 화면 내에서 스크롤바가 나타나도록 설정
            width: '90%', // 카드리스트를 감싸는 Box의 넓이를 전체 화면의 90%로 설정
            margin: '0 auto', // 가운데 정렬
          }}
        >
          {/* 카드리스트를 감싸는 또 다른 Box */}
          <Box
            sx={{
              width: '100%',
            }}
          >
            {/* 카드리스트 형태의 데이터 그리드 */}
            {cardList.map((card) => (
              <Card
                key={card.id}
                elevation={3}
                style={{
                  padding: '8px', // Adjusted padding
                  marginBottom: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedCard && selectedCard.id === card.id ? 'lightblue' : 'white', // 선택된 카드는 배경색을 변경하여 표시
                }}
                onClick={() => this.handleCardClick(card)} // 카드를 클릭했을 때 handleCardClick 함수 호출
              >
                <CardContent>
                  {/* 카드리스트 안에 데이터들을 라벨 형태로 보여줍니다. */}
                  <Box>
                    <span style={{ fontSize: '10px', fontWeight: 'bold' }}>프로젝트 코드: {card.projectCode}</span>
                  </Box>
                  <Box>
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>프로젝트 명:{card.projectName}</span>
                  </Box>
                  <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <span style={{ fontSize: '10px' }}>프로젝트 기간: {card.projectPeriod}</span>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default LeftComponent;
