package springBoot_team_pj_126.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import springBoot_team_pj_126.dao.SalaryMapper;
import springBoot_team_pj_126.dto.SalaryDTO;
import springBoot_team_pj_126.dto.SalaryInfoDTO;


@Component
@Service
public class SalaryServiceImpl implements SalaryService{

	@Autowired
	private SalaryMapper mapper;

	@Override
	public List<SalaryDTO> salaryList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("서비스 - list");
		
		
		List<SalaryDTO> list = mapper.salaryList();
		System.out.println("서비스 : list : " + list);
		
		model.addAttribute("list", list);
		return list;
	}

	// ========================================================
	// [급여 지급에 필요한 메서드]

	// 급여 지급 상세 내역
	@Override
	public SalaryInfoDTO salaryCreateDetail(String id) {
		System.out.println("SalaryServiceImpl - salaryCreateDetail()");
		
		SalaryInfoDTO dto = mapper.salaryCreateDetail(id);
		
		return dto;
	}

	// 주말 제외 총 근무 시간
	@Override
	public Map<String, Object> salaryCreateInfo(String id) {
		System.out.println("SalaryServiceImpl - weeklyWorkingHours()");
		
		Map<String, Object> data = new HashMap<>();
		
		int weeklyWorkingHours = mapper.weeklyWorkingHours(id);
		int weekendWorkingHours = mapper.weekendWorkingHours(id);
		
		data.put("weeklyWorkingHours", weeklyWorkingHours);
		data.put("weekendWorkingHours", weekendWorkingHours);
		
		return data;
	}
	


	@Override
	public void insertSalary(SalaryDTO dto) throws ServletException, IOException {
		System.out.println("서비스 - insert");
		
		mapper.insertSalary(dto);
	}

	@Override
	public void updateSalary(SalaryDTO dto) throws ServletException, IOException {
		System.out.println("서비스 - update");
		mapper.updateSalary(dto);
	}

	@Override
	public void deleteSalary(int salaryId) throws ServletException, IOException {
		System.out.println("서비스 - delete");
		mapper.deleteSalary(salaryId);
	}
//
//	@Override
//	public MemberDTO selectMember(MemberDTO dto) throws ServletException, IOException {
//		System.out.println("서비스 - select");
//		
//		
//		Map<String, Object> map = new HashMap<String, Object>();
//
//		map.put("id", dto.getId());
//		map.put("password", dto.getPassword());
//		
//		MemberDTO dot = mapper.findById(map);
//		if(dot !=null) {
//			System.out.println("성공");
//		}
//		return dot;
//	}


}
