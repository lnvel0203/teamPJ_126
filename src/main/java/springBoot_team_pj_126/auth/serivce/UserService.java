package springBoot_team_pj_126.auth.serivce;

import java.nio.CharBuffer;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import springBoot_team_pj_126.auth.dto.CredentialsDTO;
import springBoot_team_pj_126.auth.dto.SignDTO;
import springBoot_team_pj_126.auth.entities.User;
import springBoot_team_pj_126.auth.exception.AppException;
import springBoot_team_pj_126.controller.AttendanceController;
import springBoot_team_pj_126.dao.SalaryMapper;
import springBoot_team_pj_126.dao.UserMapper;
import springBoot_team_pj_126.dao.UserRepository;

//로그인 및 회원가입 처리를 한다.
@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;
	private final PasswordEncoder passwordEncoder;
	@Autowired
	private SalaryMapper salaryMapper;

	private static final Logger logger = LoggerFactory.getLogger(AttendanceController.class);

	public User findById(String id) {
		logger.info("<<JWT Login - loginService - findById>>");
		User user = userMapper.findById(id);

		return userMapper.toUserDTO(user);
	}

	public User login(CredentialsDTO credentialsDTO) {

		logger.info("<<JWT Login - loginService - login>>");

		User user = userMapper.findById(credentialsDTO.getId());
		// 비밀번호 인코더를 사용하여 비밀번호가 일반 텍스트로 저장되는 것을 방지하지만 해시된 비밀번호는 읽을수없다.
		if (passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.getPwd()), user.getPwd())) {

			return user;
		}
		throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
	}

	public String register(SignDTO userDTO) {

		try {
			Optional<User> optionalUser = userMapper.selectId(userDTO.getId());
			System.out.println("optionalUser : "  + optionalUser);

			salaryMapper.setBaseSalary(userDTO.getId());

			if(optionalUser.isPresent()) {
				throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
			}
			User user = new User();
			user.setId(userDTO.getId());   
			user.setPwd(userDTO.getPwd());
			user.setName(userDTO.getName());
			user.setBirth(userDTO.getBirth());
			user.setEmail(userDTO.getEmail());
			user.setAddress(userDTO.getAddress());
			user.setHp(userDTO.getHp());

			// passwordEncoder를 사용하여 암호를 일반 텍스트로 저장하지 않고 해시한다.
			user.setPwd(passwordEncoder.encode(CharBuffer.wrap(userDTO.getPwd())));

			//User savedUser = userRepository.save(user);
			userMapper.join(user);
		}catch(Exception e) {
			e.printStackTrace();
			return "0";
		}
		return "1";
	}
	
	public int passwordChange(SignDTO dto) {
		int changeChk = 0;
		
		if(dto.getId() == null) {
			String email = dto.getEmail();
			String pwd = passwordEncoder.encode(CharBuffer.wrap(dto.getPwd()));
			Map<String, String> userDTO = new HashMap<String, String>();
			
			userDTO.put("email", email);
			userDTO.put("pwd", pwd);
			changeChk = userMapper.passwordChange(userDTO);
			
		}else {
			
			String id = dto.getId();
			String pwd = passwordEncoder.encode(CharBuffer.wrap(dto.getPwd()));
			Map<String, String> userDTO = new HashMap<String, String>();
			
			userDTO.put("id", id);
			userDTO.put("pwd", pwd);
			changeChk = userMapper.passwordChangeId(userDTO);
		}
	
		return changeChk;
	}
}
