package kr.co.acctmgmt.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class Board {
	Date moddate;
	Date regdate;
	String content;
	String title;
	String writer;
	
}
