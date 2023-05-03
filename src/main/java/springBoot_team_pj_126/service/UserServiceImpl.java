package springBoot_team_pj_126.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springBoot_team_pj_126.dao.MemberMapper;
import springBoot_team_pj_126.dao.MemberRepository;
import springBoot_team_pj_126.dto.UserDTO;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private MemberMapper mapper;
	
	@Autowired
	private MemberRepository repository;
	
	//부석현
	@Override
	public void join(UserDTO dto) {
		repository.join(dto);
	}

}
