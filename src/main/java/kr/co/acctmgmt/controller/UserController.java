package kr.co.acctmgmt.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.acctmgmt.domain.Board;
import kr.co.acctmgmt.domain.SBGTCDDomain;
import kr.co.acctmgmt.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	private final UserService userService;
	
	@RequestMapping("/time")
	public String getTime() {
		System.out.println("Controller�� time �޼ҵ� ");
		return userService.getTime();
	}
	
	@RequestMapping("/boardData")
	public String getBoardData() {
		System.out.println("Controller�� getBoardList �޼ҵ� ");
		userService.getBoardData();
		
		System.out.println("UserController��  getBorardData �޼ҵ� ");
		return ">>>this data is come from getBoardData() in spring<<<";
	}
	
	//DataGrid�� ������ �ִ� �޼ҵ� 
	@RequestMapping("/SBGTCD")
	public List<SBGTCDDomain> getDataGridData() {
		System.out.println(">>��Ʈ�ѷ��� getDataGridData<<");
		List<SBGTCDDomain> sbgtcd= userService.getDataGridData();
		String a = sbgtcd.toString();
		System.out.println(">>>>>>>>>>>getDataGridData���� ������" + a);
		return sbgtcd ;
	}
	
	
	@RequestMapping("/deleteBoardData")
	public String deleteBoardData() {
	
		String msg = "";
		Board board = new Board();
		board.setWriter("testWriter");
		int result = userService.deleteBoardData(board);
		
		if(result==0) {
			System.out.println("Delete ���� !");
			msg="DELETE fail :(";
		}else {
			System.out.println("DELETE successsss I'm in Controller deleteBoard Data aaa aa a a ..");
			msg="DELETE success :) ..How many row ? : " + result;
		}
		
		return msg;
	}
	@PostMapping("/test")
	public Board getFrontDataTest(@RequestBody Map<String, String> Data) {
		System.out.println(Data.toString());
		System.out.println("��ſϷ�");
		Board board = userService.getBoardData();
		return board;
	}
	
}

























