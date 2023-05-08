package springBoot_team_pj_126.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface AttendanceMapper {

	// [근무 현황 & 근무 체크]
	// ====================================
	
	// 근무 현황 리스트
	public ArrayList<Map<String, Object>> statusList(String id);
	
	// 근무 상태 체크
	public int workCheck(Map<String, String> data);
	
	// status가 퇴근일 때 end time 업데이트
	public void updateEndWork(String string);
	
	// status가 퇴근일 때 duration 업데이트
	public void updateEndDuration(String string);
	
	// status가 복귀일 때 end time 업데이트
	public int updateReturnWorks(String string);
	
	// status가 복귀일 때 duration 업데이트
	public int updateReturDuration(String string);
	
	// ====================================
	// [여부 확인]
	
	// 출근 여부 확인
	public int isStartWork(String id);

	// 퇴근 여부 확인
	public int isEndWork(String id);

	// 외출 여부 확인
	public int checkOutStatus(String id);

	// ====================================
	// [근무 계획]
	
	// 지각
	public int tardy(String id);

	// 결근
	public int absence(String id);

	// 조기 퇴근
	public int earlyLeave(String id);
	
	// 미체크
	public int unchecked(String id);

	// ====================================
	// 근무일 수
	public int totalDays(String id);
	
	// 총 시간
	public int totalHours(String id);

	// ====================================
	// 잔여 휴가
//	public Map<String, Object> getVacation(String id);


}
