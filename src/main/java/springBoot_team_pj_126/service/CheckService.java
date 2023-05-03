package springBoot_team_pj_126.service;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import springBoot_team_pj_126.dto.CheckOption;

public interface CheckService {
	
	// 현재 상태 확인
	public int checkOutStatus();
	
	// 출근 여부 확인
	public int isStartWork();
	
	// 퇴근 여부 확인
	public int isEndWork();

	// 근무 현황
	public CheckOption attendanceList(HttpServletRequest req, Model model);
	
	// 근무 체크 메서드
	public int attendenceCheck(String attendenceID) throws ServletException, IOException;

	// ========================================================
	
	// 근무 시간
	public Map<String, Object> getDate();

	// 근태 현황
	public Map<String, Object> getAttendance();



}
