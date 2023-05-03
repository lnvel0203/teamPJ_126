package springBoot_team_pj_126.dao;

import java.sql.Timestamp;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.CheckDTO;

@Mapper
public interface CheckMapper {

	// 출근 여부 확인
	public Timestamp isStartWork();
	
	// 퇴근 여부 확인
	public Timestamp isEndWork();
	
	// 근무 현황
	public CheckDTO attendanceList();
	
	// ====================================
	// 근무 체크 메서드
	// 출근 
	public int startWork();
	
	// 회의
	public int meeting();
	
	// 외출
	public int goOut();
	
	// 외근
	public int fieldWork();
	
	// 퇴근 
	public int endWork();
	
	// 교육 
	public int education();
	
	// 출장
	public int businessTrip();
	
	// 휴식 
	public int rest();

	// 복귀
	public int returnWork();


	// ====================================

	// 총 날짜
	public int totalDays();
	
	// 총 시간
	public int totalHours();

	// 지각 횟수
	public int tardy();

	// 결근 횟수
	
	// 조기 퇴근 횟수
	public int earlyDeparture();

	// 미체크
	public int unchecked();

}
