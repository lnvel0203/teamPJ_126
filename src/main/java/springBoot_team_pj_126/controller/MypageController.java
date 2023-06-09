package springBoot_team_pj_126.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import springBoot_team_pj_126.dto.EmployeeSalaryDTO;
import springBoot_team_pj_126.dto.UserDTO;
import springBoot_team_pj_126.service.AttendanceService;
import springBoot_team_pj_126.service.MemberService;
import springBoot_team_pj_126.service.MypageService;

@RequestMapping(value="/members")
@RestController
public class MypageController {

	@Autowired(required=true)
	private MemberService service;
	
	@Autowired(required=true)
	private MypageService mypage;
	
	@Autowired(required=true)
	private AttendanceService attendance;
	
	
	
	
	
	
	private static final Logger logger = LoggerFactory.getLogger(MypageController.class);
	
	// ========================================================

	@GetMapping("/paymentList/{id}")
	public ArrayList<Map<String, Object>> paymentList(@PathVariable String id)
			throws ServletException, IOException {
		logger.info("SalaryController - salaryList()");
		
		System.out.println("id : " + id);
		ArrayList<Map<String, Object>> map = mypage.paymentList(id);
		
		return map;
	}
	
	@GetMapping("/mypage/{id}")
	public UserDTO userinfo(@PathVariable String id) 
			throws ServletException, IOException{
		logger.info("MypageController - mypage()");
		System.out.println("id : "+ id);
		UserDTO dto = mypage.userinfo(id);
		attendance.attendanceList(id);
		return dto;
	}
	
	//프로필 사진 업로드
	@PostMapping("/mypage/{id}/photo")
	public void photo(@PathVariable String id, MultipartFile file) throws Exception {
		System.out.println("file : " + file + "id : " + id);
		File uploadFile = new File("C:\\images\\", file.getOriginalFilename());
		if (!uploadFile.exists()) {
			uploadFile.mkdirs();
		}
		
		file.transferTo(uploadFile);
		
		mypage.photo(id, "http://localhost:8081/images/" + file.getOriginalFilename());
	}
	
	
	@PostMapping("/userInfoUpdate/{id}")
	public void userInfoUpdate( @PathVariable String id,@RequestBody UserDTO NewLists) {
	    logger.info("MypageController - userInfoUpdate()");
	   
	    
	    String email = NewLists.getEmail();
	    String address = NewLists.getAddress();
	    String hp = NewLists.getHp();

	    UserDTO dto = new UserDTO();
	    dto.setId(id);
	    dto.setEmail(email);
	    dto.setAddress(address);
	    dto.setHp(hp);
	    

	    System.out.println("확인해봐" + dto);

	    mypage.userInfoUpdate(dto);
	}
	
	// 급여 상세 가져오기
	@GetMapping("/mySalary/{empId}")
	public EmployeeSalaryDTO mySalary(@PathVariable String empId){
		logger.info("SalaryController - invoiceDetail()");
		
		System.out.println("id:" + empId);
		
		EmployeeSalaryDTO dto = mypage.mySalary(empId);
		System.out.println("dto: " + dto);
		
		return dto;
	}
	
	
		
}
