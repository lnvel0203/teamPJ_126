package springBoot_team_pj_126.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springBoot_team_pj_126.dao.AttendanceMapper;



@Service
public class AttendanceServiceImpl implements AttendanceService {

	@Autowired
	private AttendanceMapper dao;

	// ========================================================
	// [근무 현황 & 근무 체크]
	
	// 근무 현황 리스트
	@Override
	public ArrayList<Map<String, Object>> statusList(String id) {
		System.out.println("AttendanceServiceImpl - statusList()");
		System.out.println("id: " + id);
		
		ArrayList<Map<String, Object>> map = dao.statusList(id);
		
		return map;
	}

	// 출근 여부 확인
	@Override
	public int isStartWork(String id) {
		System.out.println("AttendanceServiceImpl - isStartWork()");
		
		int selectCnt = dao.isStartWork(id);
		System.out.println("selectCnt: " + selectCnt);
		
		return selectCnt;
	}

	// 퇴근 여부 확인
	@Override
	public int isEndWork(String id) {
		System.out.println("AttendanceServiceImpl - isEndWork()");
		
		int selectCnt = dao.isEndWork(id);
		System.out.println("selectCnt: " + selectCnt);
		
		return selectCnt;
	}

	// 외출 여부 확인
	@Override
	public int checkOutStatus(String id) {
		System.out.println("AttendanceServiceImpl - checkOutStatus()");
	    
		int selectCnt = dao.checkOutStatus(id);

	    return selectCnt;
	}

	// 근무 상태 체크
	@Override
	public void workCheck(Map<String, String> data) {
		System.out.println("AttendanceServiceImpl - workCheck()");
		String id = data.get("id");
		String status = data.get("status");
		
		if (status.equals("end-work")) {
			dao.updateEndWork(id);
			dao.updateEndDuration(id);
		} 
		
		if(status.equals("return-work")) {
			dao.updateReturnWorks(id);
			dao.updateReturDuration(id);
		}
		
		int insertCnt = dao.workCheck(data);
		
		System.out.println("insertCnt: " + insertCnt);
	}

	// ========================================================
	// [근무 계획]
	
	// 근태 현황
	@Override
	public Map<String, Object> attendanceList(String id) {
		System.out.println("AttendanceServiceImpl - attendanceList()");
		
		Map<String, Object> data = new HashMap<>();
		  
		int tardy = dao.tardy(id);
		// #TODO - 결근 바꾸기
		int absence = dao.absence(id);
		int earlyLeave = dao.earlyLeave(id);
		int unchecked = dao.unchecked(id);
		
		System.out.println("지각 " + tardy );
		
		data.put("tardy", tardy);
		data.put("absence", absence);
		data.put("earlyLeave", earlyLeave);
		data.put("unchecked", unchecked);
		
		return data;
	}

	// 근무 시간
	@Override
	public Map<String, Object> getHour(String id) {
		System.out.println("AttendanceServiceImpl - getHour()");
		
		Map<String, Object> data = new HashMap<>();
		
		// 총 근무일
		int totalDays = dao.totalDays(id);
		// 총 시간
		int totalHours = dao.totalHours(id);
		
		data.put("totalDays", totalDays);
		data.put("totalHours", totalHours);
		
		return data;
	}

	// ========================================================
	// 잔여 휴가
	@Override
	public Map<String, Object> getVacation(String id) {
		System.out.println("AttendanceServiceImpl - getVacation()");
		Map<String, Object> data = new HashMap<>();

		data.put("vacation", 1);
		
		return data;
	}



}
