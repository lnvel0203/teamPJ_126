package springBoot_team_pj_126.service;
// 부서관리용 서비스 생성(2023-05-04)

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import springBoot_team_pj_126.dto.UserDTO;

public interface DepartmentService {

	public List<UserDTO> DepartmentList(HttpServletRequest req, Model model) 
			throws ServletException, IOException;
}
