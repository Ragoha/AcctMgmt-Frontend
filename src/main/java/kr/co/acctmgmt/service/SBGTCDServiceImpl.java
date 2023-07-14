package kr.co.acctmgmt.service;

import java.util.List;

import org.springframework.stereotype.Service;

import kr.co.acctmgmt.domain.SBGTCDDomain;
import kr.co.acctmgmt.mapper.SBGTCDMapper;
import kr.co.acctmgmt.mapper.UserMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SBGTCDServiceImpl implements SBGTCDService {
	private final SBGTCDMapper mapper ;

	@Override
	public List<SBGTCDDomain> getSBGTCDData(String groupcd) {
		return mapper.getSBGTCDData(groupcd);
	}

	@Override
	public List<SBGTCDDomain> getDetailInfo(String bgt_CD) {
		List<SBGTCDDomain> list = mapper.getDetailInfo(bgt_CD);
		return null ;
	}
	
}
