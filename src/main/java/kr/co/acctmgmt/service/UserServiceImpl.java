package kr.co.acctmgmt.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.acctmgmt.domain.Board;
import kr.co.acctmgmt.domain.SBGTCDDomain;
import kr.co.acctmgmt.mapper.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

	private final UserMapper userMapper;

	@Override
	public String getTime() {
		return userMapper.getTime();
	}

	@Override
	public Board getBoardData() {
		
		Board returnData = userMapper.getBoardData();
		String check = returnData.toString();
		System.out.println("UserService impl 의 getBoardData- check :  " + check);
		return returnData;
	}

	@Override
	public int deleteBoardData(Board board) {
		int result = userMapper.deleteBoardData(board);
		if(result==0) {
			System.out.println("삭제 실패");
		}else if(result != 0) {
			System.out.println("삭제 성공 ! 삭제된 로우의 갯수는 ? " + result);
		}
		return result;
	}

	@Override
	public int insertBoardData(Board board) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<SBGTCDDomain> getDataGridData() {
		// TODO Auto-generated method stub
		System.out.println("userService Impl 의 getDataGridData==1");
		List<SBGTCDDomain> sbgtcd =userMapper.getDataGridData();
		return sbgtcd;
	}
	
	
}
