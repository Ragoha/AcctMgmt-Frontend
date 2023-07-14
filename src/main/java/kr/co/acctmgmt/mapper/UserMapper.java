package kr.co.acctmgmt.mapper;

import java.util.List;

import kr.co.acctmgmt.domain.Board;
import kr.co.acctmgmt.domain.SBGTCDDomain;

public interface UserMapper {

	public String getTime();

	public Board getBoardData();
	
	public int deleteBoardData(Board board);
	
	public List<SBGTCDDomain> getDataGridData();
	
}
