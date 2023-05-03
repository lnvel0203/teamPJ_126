package springBoot_team_pj_126.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.Address;
import springBoot_team_pj_126.dto.CheckOption;
import springBoot_team_pj_126.dto.UserDTO;
import springBoot_team_pj_126.service.CheckService;
import springBoot_team_pj_126.service.MemberService;

@RequestMapping(value="/members")
@RestController
public class CheckController {

	@Autowired(required=true)
	private CheckService service;
	
	@Autowired(required=true)
	private MemberService mservice;
	
	// ========================================================
	// 근무 현황 & 근무 체크
	// 현재 상태 확인
	@GetMapping("/checkOutStatus")
	public int checkOutStatus(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("근태 컨트롤러 - checkOutStatus");
		int selectCnt = service.checkOutStatus();
		
		return selectCnt;
	}
	
	// 출근 여부 확인
	@GetMapping("/isStartWork")
	public int isStartWork(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("근태 컨트롤러 - isStartWork");
		int selectCnt = service.isStartWork();
		
		return selectCnt;
	}
	
	// 퇴근 여부 확인
	@GetMapping("/isEndWork")
	public int isEndWork(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("근태 컨트롤러 - isEndWork");
		int selectCnt = service.isEndWork();
		
		return selectCnt;
	}
	
	// 근무 현황 
	// POST로 변경해야 할 수도 있음. 로그인 정보 가져와야 해서 아닐 수도 있음.
	@GetMapping("/attendanceList")
	public CheckOption attendanceList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("근태 컨트롤러 - list");
		
		CheckOption arr = service.attendanceList(req, model);
		
		System.out.println("#컨트롤러 - attendanceList : " + arr);
		
		return arr;
	}
	
	// 근무 체크
	@PostMapping("/attendanceCheck")
	public void attendenceCheck(@RequestBody String id) 
			throws ServletException, IOException {
		System.out.println("근태 컨트롤러 - attendenceCheck");
		System.out.println("#컨트롤러 - id: " + id);
		
		int updateCnt = service.attendenceCheck(id);
		
		System.out.println("updateCnt: " + updateCnt);
	}
	
	// ========================================================
	// 근무 시간
	@GetMapping("/getDate")
    public Map<String, Object> getDate() {
        System.out.println("근태 컨트롤러 - getDate");
        
        Map<String, Object> data = service.getDate();
        
        return data;
    }

	// 근태 현황
	@GetMapping("/attendance")
    public Map<String, Object> attendance() {
        System.out.println("근태 컨트롤러 - attendance");
        
        Map<String, Object> data =	service.getAttendance();

        return data;
    }

}
