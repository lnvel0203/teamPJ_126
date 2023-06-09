package springBoot_team_pj_126.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import springBoot_team_pj_126.dto.MemberDTO;
import springBoot_team_pj_126.dto.UserDTO;


public interface MemberService {

	public List<UserDTO> listAll(HttpServletRequest req, Model model) 
			throws ServletException, IOException;

// < 4월 28일 김희수 추가 - 상태 업데이트문 >
	public void editEmployee(UserDTO dto) throws ServletException, IOException;
//	
	public void deleteMember(String id) throws ServletException, IOException;
	
	
	//김성훈 5월 4일 추가   // 직원 리스트
	public List<UserDTO> memberPositionList(HttpServletRequest req, Model model) 
			throws ServletException, IOException;
	
	//5월 4일 추가 김성훈   // 지원 직급 수정 
	public void editPosition(String id , String positionName) 
			throws ServletException, IOException;

	// 5월 8일 추가 김성훈 // 팀 수정
	public void editDeptname(String id ,String DeptName)
			throws ServletException,IOException;


}
