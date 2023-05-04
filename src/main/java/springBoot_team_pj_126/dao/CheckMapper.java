package springBoot_team_pj_126.dao;

import java.sql.Timestamp;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.CheckDTO;

@Mapper
public interface CheckMapper {

	// 출근 여부 확인
	public Timestamp isStartWork(String id);
	
	// 퇴근 여부 확인
	public Timestamp isEndWork(String id);
	
	// 근무 현황
	public CheckDTO attendanceList(String id);
	
	// ====================================
	// 근무 체크 메서드
	
	// 출근 
	public int startWork(String id);
	
	// 회의
	public int meeting(String id);
	
	// 외출
	public int goOut(String id);
	
	// 외근
	public int fieldWork(String id);
	
	// 퇴근 
	public int endWork(String id);
	
	// 교육 
	public int education(String id);
	
	// 출장
	public int businessTrip(String id);
	
	// 휴식 
	public int rest(String id);

	// 복귀
	public int returnWork(String id);


	// ====================================

	// 총 날짜
	public int totalDays(String id);
	
	// 총 시간
	public int totalHours(String id);

	// 지각 횟수
	public int tardy(String id);

	// 결근 횟수
	
	// 조기 퇴근 횟수
	public int earlyDeparture(String id);

	// 미체크
	public int unchecked(String id);

}
