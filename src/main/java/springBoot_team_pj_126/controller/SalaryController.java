package springBoot_team_pj_126.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.SalaryDTO;
import springBoot_team_pj_126.dto.SalaryInfoDTO;
import springBoot_team_pj_126.service.SalaryService;

@RequestMapping(value="/members")
@RestController
public class SalaryController {
	
	@Autowired(required=true)
	private SalaryService service;

	
	private static final Logger logger = LoggerFactory.getLogger(SalaryController.class);
	
	// ========================================================
	
	@GetMapping("/salary")
	public List<SalaryDTO> SalaryList(HttpServletRequest req, Model model) 
			throws ServletException, IOException{
		logger.info("SalaryController - SalaryList()");
		
		List<SalaryDTO> list = service.salaryList(req, model);
		System.out.println("컨트롤러 : list : " + list);
		
		return service.salaryList(req, model);
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


	   @PostMapping("/insertSalary")
	   public void InsertSalary(@RequestBody SalaryDTO salary) throws ServletException, IOException{
	      System.out.println("컨트롤러 - insertSalary");
	      service.insertSalary(salary);
	      System.out.println("insert [성공]");
	   }
	   
	   

	   @PostMapping("/updateSalary")
	   public void updateSalary(@RequestBody SalaryDTO salary) throws ServletException, IOException{
	      System.out.println("컨트롤러 - updateSalary");
	      service.updateSalary(salary);
	      System.out.println("update [성공]");
	      
	   }
	   

	   @PostMapping("/deleteSalary")
	   public void deleteSalary(@RequestBody int salary) throws ServletException, IOException{
	      System.out.println("컨트롤러 - deleteSalary");
	      service.deleteSalary(salary);
	      System.out.println("delete [성공]");
	      
	   }
	
}
