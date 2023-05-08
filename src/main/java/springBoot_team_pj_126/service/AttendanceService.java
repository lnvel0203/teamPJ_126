package springBoot_team_pj_126.service;

import java.util.ArrayList;
import java.util.Map;

public interface AttendanceService {
	
	// ========================================================
	// [근무 현황 & 근무 체크]
	
	// 근무 현황 리스트
	public ArrayList<Map<String, Object>> statusList(String id);

	// 출근 여부 확인
	public int isStartWork(String id);

	// 퇴근 여부 확인
	public int isEndWork(String id);

	// 외출 여부 확인
	public int checkOutStatus(String id);
	
	// 근무 상태 체크
	public void workCheck(Map<String, String> data);
	
	// ========================================================
	// [근무 계획]
	
	// 근태 현황
	public Map<String, Object> attendanceList(String id);

	// 근무 시간
	public Map<String, Object> getHour(String id);
	
	// ========================================================
	// 잔여 휴가
	public Map<String, Object> getVacation(String id);

	
}
