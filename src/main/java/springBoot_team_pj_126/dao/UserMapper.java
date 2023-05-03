package springBoot_team_pj_126.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.auth.dto.SignDTO;
import springBoot_team_pj_126.auth.dto.UserDTO;
import springBoot_team_pj_126.auth.entities.User;


@Mapper
public interface UserMapper {

	
	UserDTO toUserDTO(User user);
	
	User signUpToUser(SignDTO userDTO);
	
	public User findById(String id);
	
	public User join(User dto);
	
	public Optional<User> selectId(String id);
}
