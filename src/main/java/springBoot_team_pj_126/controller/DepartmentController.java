package springBoot_team_pj_126.controller;
// 부서관리용 컨트롤러 생성(2023-05-04)

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.DeptDTO;
import springBoot_team_pj_126.dto.UserDTO;
import springBoot_team_pj_126.service.DepartmentService;

@RequestMapping(value="/department")
@RestController
public class DepartmentController {

	@Autowired
	private DepartmentService service;

	@GetMapping
	public List<DeptDTO> getDepartmentList(HttpServletRequest req, Model model) 
			throws ServletException, IOException{

		System.out.println("컨트롤러 - getDepartmentList");
		
		return service.DepartmentList(req, model);

	}
	
	
	@PostMapping("/addDepartment")
	public void addDepartment(@RequestBody DeptDTO dto)	throws ServletException, IOException{
		System.out.println(dto);
		service.addDepartment(dto);

	}

}