package springBoot_team_pj_126.controller;

import java.util.ArrayList;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.SalaryInfoDTO;
import springBoot_team_pj_126.dto.SalaryRecordsDTO;
import springBoot_team_pj_126.service.SalaryService;



@RequestMapping(value="/members")
@RestController
public class SalaryController {


	
	
	@Autowired
	private SalaryService service;
	
	
	private static final Logger logger = LoggerFactory.getLogger(SalaryController.class);
	
	// ========================================================
	
	// 급여 관리 리스트
	@GetMapping("/salaryList")
	public ArrayList<Map<String, Object>> salaryList() {
		logger.info("SalaryController - salaryList()");
		
		ArrayList<Map<String, Object>> map = service.salaryList();
		
		return map;
	}
	
	// 급여 수정을 위한 상세 내역
	// TODO - id랑 날짜 둘 다 아 아니네 recordId로 바꾸기
	@GetMapping("/salaryeditDetail")
	public SalaryRecordsDTO salaryeditDetail(@RequestParam String id){
		logger.info("SalaryController - salaryeditDetail()");
		
		SalaryRecordsDTO dto = service.salaryeditDetail(id);
		System.out.println("dto: " + dto);
		
		return dto;
	}
	
	// ========================================================
	// [급여 지급에 필요한 메서드]
	
	// 급여 지급 상세 내역
	@GetMapping("/salaryCreateDetail")
	public SalaryInfoDTO salaryCreateDetail(@RequestParam String id){
		logger.info("SalaryController - salaryCreateDetail()");
		
		SalaryInfoDTO dto = service.salaryCreateDetail(id);
		System.out.println("dto: " + dto);
		
		return dto;
	}
	
	// 주말 제외 총 근무 시간
	@GetMapping("/salaryCreateInfo")
	public Map<String, Object> salaryCreateInfo(@RequestParam String id){
		logger.info("SalaryController - salaryCreateInfo()");
		
		Map<String, Object> data = service.salaryCreateInfo(id);
		System.out.println("data: " + data);
		
		return data;
	}
	
	// 급여 지급
	@PostMapping("/invoiceCreate")
	public int workCheck(@RequestBody Map<String, Object> map) {
		logger.info("SalaryController - invoiceCreate()");
		
		System.out.println(map);
		Map<String, Object> data = (Map<String, Object>) map.get("sendData");
		
		int insertCnt = service.invoiceCreate(data);
		
		return insertCnt;
	}

	// ========================================================
	
}


