package springBoot_team_pj_126.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.ChartDTO;
import springBoot_team_pj_126.dto.EmployeeSalaryDTO;
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
		
//		SalaryRecordsDTO dto = service.salaryeditDetail(id);
//		System.out.println("dto: " + dto);
		
		SalaryRecordsDTO dto = new SalaryRecordsDTO();
		dto.setEmpId("집갈래");
		return dto;
	}
	
	// 급여 상세 가져오기
	@GetMapping("/invoiceDetail")
	public EmployeeSalaryDTO invoiceDetail(@RequestParam int id){
		logger.info("SalaryController - invoiceDetail()");
		System.out.println("id : " + id);
		EmployeeSalaryDTO dto = service.invoiceDetail(id);
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
	public Map<String, Object> salaryCreateInfo(@RequestParam Map<String, Object> map){
		logger.info("SalaryController - salaryCreateInfo()");
		
		Map<String, Object> data = service.salaryCreateInfo(map);
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
	
	// 지급 상태 업데이트
	@PutMapping("/updateSalaryStatus")
	public int updateSalaryStatus(@RequestBody Map<String, Object> map) {
		logger.info("SalaryController - updateSalaryStatus()");
		
		int salaryRecordId = (int) map.get("SALARYRECORDID");
		System.out.println(salaryRecordId);
		
		int updateCnt = service.updateSalaryStatus(salaryRecordId);
		System.out.println("업데이트 확인: " + updateCnt);
		return updateCnt;
	}


	
	// ========================================================
	   // 기본급 관리 리스트
	   @GetMapping("/baseSalaryList")
	   public ArrayList<Map<String, Object>> baseSalaryList() {
	      logger.info("SalaryController - baseSalaryList()");
	      
	      ArrayList<Map<String, Object>> map = service.baseSalaryList();
	      
	      return map;
	   }
	   
	   // 기본급 업데이트
	   @PutMapping("/updateBaseSalary")
	   public void updateBaseSalary(@RequestBody Map<String, Object> map){
	      logger.info("SalaryController - updateBaseSalary()");
	      System.out.println(map);
	      
	      service.updateBaseSalary(map);
	   }
	   
	// ========================================================
	   // 차트
	   
	   // 부서별 급여 비율
	   @GetMapping("/deptList")
	   public List<ChartDTO> getChartData() {
	      logger.info("SalaryController - getChartData()");
	      
	      List<ChartDTO> list = service.getChartData();
	      
	       return list;
	   }
	   
	   // 부서별 급여 평균, 최저, 최고
	   @GetMapping("/deptList2")
	   public List<ChartDTO> getChartData2() {
	      logger.info("SalaryController - getChartData2()");
	      
	      List<ChartDTO> list = service.getChartData2();
	      
	      return list;
	   }
}


