package springBoot_team_pj_126.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import lombok.RequiredArgsConstructor;
import springBoot_team_pj_126.dto.UserDTO;



//@CrossOrigin(origins = {"http://localhost:3000"}, maxAge=3600)
//@CrossOrigin(origins = {"http://localhost:8081"}, maxAge=3600)
@RequestMapping(value="/members")
@RestController
@RequiredArgsConstructor
public class IndexController {

	
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
    	
		
		
		//예외처리도 해야한다!!!
		
	
		//redirect:/login -> 이쪽으로 돌아가라!!
		return "1";
		
		
		
	}
	
	
	   @GetMapping("/aa")
	    public String oauthLogin(HttpServletResponse response) throws IOException{
		   System.out.println("옴?");
	    	//String redirect_uri="http://localhost:3000/apps/main-page";
	    	//String redirect_uri="http://localhost:3000/login";
	    	
	    	return "1";
	    	//response.sendRedirect(redirect_uri);
	   
	    }

		
		
}
