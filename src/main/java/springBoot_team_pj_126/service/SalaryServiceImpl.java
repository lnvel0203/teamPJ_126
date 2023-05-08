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
