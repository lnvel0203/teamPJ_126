package springBoot_team_pj_126.service;
// 부서관리용 서비스 생성(2023-05-04_김희수)

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import springBoot_team_pj_126.dao.DepartmentMapper;
import springBoot_team_pj_126.dto.DeptDTO;

@Service
public class DepartmentServiceImpl implements DepartmentService {

	@Autowired
	private DepartmentMapper mapper;
	
	@Override
	public List<DeptDTO> DepartmentList(HttpServletRequest req, Model model) 
			throws ServletException, IOException {
		System.out.println("<<< 서비스 - 부서리스트 >>>");

		List<DeptDTO> list = mapper.departmentList();
	
		return list;
	}

	@Override
	public void addDepartment(DeptDTO dto) 
			throws ServletException, IOException {
		System.out.println("<<< 서비스 - 부서추가 >>>");
		
		mapper.addDeptment(dto);
		
	}

	
}
