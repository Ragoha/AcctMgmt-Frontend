package kr.co.acctmgmt.mapper;

import java.util.List;

import kr.co.acctmgmt.domain.SBGTCDDomain;

public interface SBGTCDMapper {
	public List<SBGTCDDomain> getSBGTCDData(String groupcd);
	
	public List<SBGTCDDomain> getDetailInfo(String bgt_CD);
}
