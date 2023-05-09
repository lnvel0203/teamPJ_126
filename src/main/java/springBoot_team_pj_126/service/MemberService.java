package springBoot_team_pj_126.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import springBoot_team_pj_126.dto.MemberDTO;
import springBoot_team_pj_126.dto.UserDTO;


public interface MemberService {

	public List<UserDTO> listAll(HttpServletRequest req, Model model) 
			throws ServletException, IOException;

	
//	public void insertMember(MemberDTO dto) throws ServletException, IOException;
//	
	public void editEmployee(UserDTO dto) throws ServletException, IOException;
//	
	public void deleteMember(String id) throws ServletException, IOException;
//	
//	public MemberDTO selectMember(MemberDTO dto) throws ServletException, IOException;
	
	
	
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
