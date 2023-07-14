package kr.co.acctmgmt.service;

import java.util.List;

import kr.co.acctmgmt.domain.SBGTCDDomain;

public interface SBGTCDService {
	
	public List<SBGTCDDomain> getSBGTCDData(String groupcd);

	public List<SBGTCDDomain> getDetailInfo(String bgt_CD);
}
