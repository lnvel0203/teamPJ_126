package springBoot_team_pj_126.controller;


import java.util.ArrayList;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.service.AttendanceService;


@RequestMapping(value="/members")
@RestController
public class AttendanceController {

	@Autowired(required=true)
	private AttendanceService service;
	
	private static final Logger logger = LoggerFactory.getLogger(AttendanceController.class);
	
	// ========================================================
	// [근무 현황 & 근무 체크]
	
	// 근무 현황 리스트
	@GetMapping("/statusList")
	public ArrayList<Map<String, Object>> statusList(@RequestParam String id) {
		logger.info("AttendanceController - statusList()");
		
		ArrayList<Map<String, Object>> map = service.statusList(id);
		
		return map;
	}
	
	// 출근 여부 확인
	@GetMapping("/isStartWork")
	public int isStartWork(@RequestParam String id) {
		logger.info("AttendanceController - isStartWork()");
		
		int selectCnt = service.isStartWork(id);
		
		return selectCnt;
	}
	
	// 퇴근 여부 확인
	@GetMapping("/isEndWork")
	public int isEndWork(@RequestParam String id) {
		logger.info("AttendanceController - isEndWork()");
		
		int selectCnt = service.isEndWork(id);
		
		return selectCnt;
	}
	
	// 외출 여부 확인
	@GetMapping("/checkOutStatus")
	public int checkOutStatus(@RequestParam String id) {
		logger.info("AttendanceController - checkOutStatus()");
		
		int selectCnt = service.checkOutStatus(id);
		
		System.out.println("checkOutStatus: " + selectCnt);
		
		return selectCnt;
	}
	
	// 근무 상태 체크
	@PostMapping("/workCheck")
	public void workCheck(@RequestBody Map<String, String> data) {
		logger.info("AttendanceController - workCheck()");
		
		service.workCheck(data);
	}

	// ========================================================
	// [근무 계획]
	
	// 근태 현황
	@GetMapping("/attendanceList")
	public Map<String, Object> attendanceList(@RequestParam String id) {
		logger.info("AttendanceController - attendanceList()");
		
		Map<String, Object> map = service.attendanceList(id);
		
		System.out.println("attendanceList: " + map);
		
		return map;
	}
	
	// 근무 시간
	@GetMapping("/getHour")
    public Map<String, Object> getDate(@RequestParam String id) {
        logger.info("AttendanceController - getHour()");
        
        Map<String, Object> data = service.getHour(id);
        
        return data;
    }
	
	// 잔여 휴가	
	@GetMapping("/getVacation")
	public Map<String, Object> getVacation(@RequestParam String id) {
		logger.info("AttendanceController - getVacation()");
		
		Map<String, Object> data =	service.getVacation(id);
		
		return data;
	}

}
