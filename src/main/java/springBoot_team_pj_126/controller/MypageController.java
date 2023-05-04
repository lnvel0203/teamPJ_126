package springBoot_team_pj_126.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.MemberDTO;
import springBoot_team_pj_126.dto.UserDTO;
import springBoot_team_pj_126.service.MemberService;



//이 어노테이션이 무엇인지 조사하기.
//필터 패키지 
//@CrossOrigin(origins = {"**"}, maxAge=3600)

//@CrossOrigin(origins = {"http://localhost:8081"}, maxAge=3600)
@RequestMapping(value="/members")
@RestController
public class MypageController {

	@Autowired(required=true)
	private MemberService service;

	
	@GetMapping("/mypage")
	public List<UserDTO> mypageList(HttpServletRequest req, Model model) 
			throws ServletException, IOException{
		System.out.println("컨트롤러 - mypage");
		return service.listAll(req, model);
	}
	
	// 백엔드 테스트용 컨트롤러
	@GetMapping("/address/userInfo")
	public ResponseEntity<Map<String, Object>> getTestAddress() {
		System.out.println("요청이 오나요?");
		
		Map<String, Object> testData = new HashMap<>();
		testData.put("name", "김인간");
        testData.put("email", "kim.human@example.com");

	    return ResponseEntity.ok(testData);
	}
	


	
}
