package springBoot_team_pj_126.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
	
	// 급여 관리 리스트
	public ArrayList<Map<String, Object>> paymentList(String empId);
}


