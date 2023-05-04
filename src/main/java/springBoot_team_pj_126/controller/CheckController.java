package springBoot_team_pj_126.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.CheckOption;
import springBoot_team_pj_126.service.CheckService;

@RequestMapping(value="/members")
@RestController
public class CheckController {

	@Autowired(required=true)
	private CheckService service;
	
	private static final Logger logger = LoggerFactory.getLogger(CheckController.class);
	
	// ========================================================
	// [근무 현황 & 근무 체크]
	
	// 현재 상태 확인
	@GetMapping("/checkOutStatus")
	public int checkOutStatus(@RequestParam String id) 
			throws ServletException, IOException {
		logger.info("CheckController - checkOutStatus()");
		
		int selectCnt = service.checkOutStatus(id);
		
		return selectCnt;
	}
	
	// 출근 여부 확인
	@GetMapping("/isStartWork")
	public int isStartWork(@RequestParam String id) 
			throws ServletException, IOException {
		logger.info("CheckController - isStartWork()");
		
		int selectCnt = service.isStartWork(id);
		
		return selectCnt;
	}
	
	// 퇴근 여부 확인
	@GetMapping("/isEndWork")
	public int isEndWork(@RequestParam String id) 
			throws ServletException, IOException {
		logger.info("CheckController - isEndWork()");
		int selectCnt = service.isEndWork(id);
		
		return selectCnt;
	}
	
	// 근무 현황 
	@GetMapping("/attendanceList")
	public CheckOption attendanceList(@RequestParam String id) 
			throws ServletException, IOException {
		logger.info("CheckController - attendanceList()");
		
		CheckOption arr = service.attendanceList(id);
		
		return arr;
	}
	
	// 근무 체크
	@PostMapping("/attendanceCheck")
	public void attendenceCheck(@RequestBody Map<String, String> data) {
		logger.info("CheckController - attendenceCheck()");
		
		String id = data.get("id");
	    String status = data.get("status");
		
		service.attendenceCheck(id, status);
	}
	
	// ========================================================
	// [근무 시간]
	@GetMapping("/getDate")
    public Map<String, Object> getDate(@RequestParam String id) {
        logger.info("CheckController - getDate()");
        
        Map<String, Object> data = service.getDate(id);
        
        return data;
    }

	// 근태 현황
	@GetMapping("/attendance")
    public Map<String, Object> attendance(@RequestParam String id) {
		logger.info("CheckController - attendance()");
        
        Map<String, Object> data =	service.getAttendance(id);

        return data;
    }
	
}
