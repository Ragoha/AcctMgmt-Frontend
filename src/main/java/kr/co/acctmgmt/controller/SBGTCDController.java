package kr.co.acctmgmt.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.acctmgmt.domain.SBGTCDDomain;
import kr.co.acctmgmt.service.SBGTCDService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SBGTCDController {

	private final SBGTCDService service;
	
	//http://localhost:8080/acctmgmt/bgt/sbgtcd/getGridData?groupcd=GROUP1
	@GetMapping("/bgt/sbgtcd/getGridData")//groupcd 받아서 첫화면 데이터를 입력하는 코드
	public List<SBGTCDDomain>  getGridData(@RequestParam String groupcd) {
		System.out.println("controller의 getGridData로 연결!");
		System.out.println("groupcd는 왔는가" + groupcd);
		List<SBGTCDDomain> list = service.getSBGTCDData(groupcd);
		return list;
	}
	
	@GetMapping("/bgt/sbgtcd/getDetailInfo")
	public ResponseEntity<List<SBGTCDDomain>> getDetailInfo(@RequestParam String bgt_CD){
		
		List<SBGTCDDomain> list =service.getDetailInfo(bgt_CD);
		
		System.out.println(list.toString());
		
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
}