package springBoot_team_pj_126.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.MemberDTO;
import springBoot_team_pj_126.dto.UserDTO;

@Mapper
public interface MemberRepository {
	//부석현
	public void join(UserDTO dto);
	public UserDTO duplecate(UserDTO dto);
	public UserDTO login(String dto);
	public String findPassword(String dto);
	
	public List<UserDTO> memberList();
	public void deleteById(String id);
	public void editEmployee(UserDTO dto);
}

