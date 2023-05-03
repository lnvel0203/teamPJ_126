package springBoot_team_pj_126.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import lombok.RequiredArgsConstructor;
import springBoot_team_pj_126.dto.UserDTO;
import springBoot_team_pj_126.service.UserService;



//@CrossOrigin(origins = {"http://localhost:3000"}, maxAge=3600)
//@CrossOrigin(origins = {"http://localhost:8081"}, maxAge=3600)

@RestController
@RequiredArgsConstructor
public class IndexController {

	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	@Autowired
	private UserService service;
	
//	스프링 부트 시큐리티 컨피규에서 제어함으로 만들 필요가 없다.
	@GetMapping("loginForm")
	public String loginProc() {
	return "/login/loginForm";
	}
	

	
	@PostMapping("/join")
	public String joinProc(@RequestBody UserDTO dto) {
		System.out.println("컨트롤러 - 회원가입");
    	System.out.println(dto.getId());
    	System.out.println(dto.getPwd());
    	System.out.println(dto.getName());
    	System.out.println(dto.getHp());
     	System.out.println(dto.getBirth());
     	System.out.println(dto.getEmail());
    	System.out.println(dto.getAddress());    
    	
		System.out.println("회원가입 - 암호화");
		//암호화 작업
		
		//ROLE은 하드코딩이다.
		dto.setRole("ROEL_USER");
		System.out.println("비밀번호 암호화 전 :" +dto.getPwd());
		
		String pwd = bCryptPasswordEncoder.encode(dto.getPwd());
		dto.setPwd(pwd);;
		System.out.println("비밀번호 암호화 후 : " + pwd);
		
		
		//예외처리도 해야한다!!!
		
		service.join(dto);
		//redirect:/login -> 이쪽으로 돌아가라!!
		return "redirect:/loginForm";
		
		
		
	}

		
		
}
