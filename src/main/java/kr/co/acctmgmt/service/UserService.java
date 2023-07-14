package kr.co.acctmgmt.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.acctmgmt.domain.Board;
import kr.co.acctmgmt.domain.SBGTCDDomain;

public interface UserService {
	
	public String getTime();

	public Board getBoardData();
	
	public int deleteBoardData(Board board);
	
	public int insertBoardData(Board board);
	
	public List<SBGTCDDomain> getDataGridData();
}
