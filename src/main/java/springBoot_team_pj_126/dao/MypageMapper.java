package springBoot_team_pj_126.dao;

import java.util.List;


import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.EmployeeSalaryDTO;
import springBoot_team_pj_126.dto.UserDTO;

@Mapper
public interface MypageMapper {

	//김재인
	public List<UserDTO> mypageList();
	public UserDTO userinfo(String id);

	public void infoupdate (UserDTO dto);
	
	public void photo(UserDTO userDTO);
	
	// 급여 상세 가져오기
	public EmployeeSalaryDTO mySalary(String empId);
	
	
}


