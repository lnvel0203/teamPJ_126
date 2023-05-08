package springBoot_team_pj_126.service;

import java.io.IOException;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import springBoot_team_pj_126.dto.SalaryDTO;
import springBoot_team_pj_126.dto.SalaryInfoDTO;


public interface SalaryService {

	public List<SalaryDTO> salaryList(HttpServletRequest req, Model model) 
			throws ServletException, IOException;

	public void insertSalary(SalaryDTO dto) throws ServletException, IOException;
	
	public void updateSalary(SalaryDTO dto) throws ServletException, IOException;
	
	public void deleteSalary(int salaryId) throws ServletException, IOException;

	// ========================================================
	// [급여 지급에 필요한 메서드]
	
	// 급여 지급 상세 내역
	public SalaryInfoDTO salaryCreateDetail(String id);

	// 주말 제외 총 근무 시간
	public Map<String, Object> salaryCreateInfo(String id);

}
