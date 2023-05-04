package springBoot_team_pj_126.service;

import java.util.Map;

import springBoot_team_pj_126.dto.CheckOption;

public interface CheckService {
	
	// ========================================================
	// [근무 현황 & 근무 체크]
	
	// 현재 상태 확인
	public int checkOutStatus(String id);
	
	// 출근 여부 확인
	public int isStartWork(String id);
	
	// 퇴근 여부 확인
	public int isEndWork(String id);

	// 근무 현황
	public CheckOption attendanceList(String id);
	
	// 근무 체크 메서드
	public void attendenceCheck(String attendenceID, String status); 

	// ========================================================
	// [근무 시간]
	
	// 근무 시간
	public Map<String, Object> getDate(String id);

	// 근태 현황
	public Map<String, Object> getAttendance(String id);



}
