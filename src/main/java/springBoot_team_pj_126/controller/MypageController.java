package springBoot_team_pj_126.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.UserDTO;
import springBoot_team_pj_126.service.MemberService;

@RequestMapping(value="/members")
@RestController
public class MypageController {

	@Autowired(required=true)
	private MemberService service;
	
	private static final Logger logger = LoggerFactory.getLogger(MypageController.class);
	
	// ========================================================

	@GetMapping("/mypage")
	public List<UserDTO> mypageList(HttpServletRequest req, Model model) 
			throws ServletException, IOException{
		logger.info("MypageController - mypage()");
		
		return service.listAll(req, model);
	}
	
	// 내 정보 상세
	@GetMapping("/userInfoDetail")
	public ResponseEntity<Map<String, Object>> userInfo() {
		logger.info("MypageController - userInfo()");
		
		Map<String, Object> testData = new HashMap<>();
		testData.put("name", "김인간");
        testData.put("email", "kim.human@example.com");

	    return ResponseEntity.ok(testData);
	}
	
	// 내 정보 상세 업데이트
	@PostMapping("/userInfoUpdate")
	public int userInfoUpdate(@RequestBody UserDTO NewLists)
			throws ServletException, IOException {
		logger.info("MypageController - userInfoUpdate()");
		
		System.out.println("근태 컨트롤러 - userInfoUpdate");
		System.out.println("DTO : " + NewLists);
		
		return 1;
	  }
		
}
