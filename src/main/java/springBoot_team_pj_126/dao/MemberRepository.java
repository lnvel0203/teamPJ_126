package springBoot_team_pj_126.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import springBoot_team_pj_126.dto.UserDTO;

@Mapper
public interface MemberRepository {
	//부석현
	public void join(UserDTO dto);
	public UserDTO duplecate(UserDTO dto);
	public UserDTO login(String dto);
	public String findPassword(String dto);
	
	public List<UserDTO> memberList();
	
	// 4월 28일 김희수 추가
	public void deleteById(String id);
	
	// 5월 2일 김희수 추가
	public void editEmployee(UserDTO dto);
	
	//김성훈 5월 4일 추가
	public List<UserDTO> memberPosition();  // 직원 리스트 보기 

	public void editPosition(String id , String positionName);  // 직원 직급 수정 
	public void editDeptname(String id , String DeptName);  // 직원 팀 수정 

	
}

