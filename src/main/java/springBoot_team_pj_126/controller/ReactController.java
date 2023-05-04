package springBoot_team_pj_126.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.UserDTO;
import springBoot_team_pj_126.service.MemberService;

//이 어노테이션이 무엇인지 조사하기.
//필터 패키지 
//@CrossOrigin(origins = {"**"}, maxAge=3600)

//@CrossOrigin(origins = {"http://localhost:8081"}, maxAge=3600)
@RequestMapping(value="/members")
@RestController
public class ReactController {

	@Autowired(required=true)
	private MemberService service;
	//http://localhost:8081/members	
	//  =>가 첫 url인데
	//
	
	@GetMapping
	public List<UserDTO> memberList(HttpServletRequest req, Model model) 
			throws ServletException, IOException{
		System.out.println("컨트롤러 - memberList");
		return service.listAll(req, model);
	}
	
//	@PostMapping("/editEmployee")
	@PutMapping("/editEmployee/{no}") //-> @PathVariale로 받는다
//	@GetMapping
	public void memberUpdate(UserDTO dto, Model model) 
			throws ServletException, IOException{ //@RequestBody ==> req.getParameter("dto");
		//리스트 데이터를 넘긴다. -- 리액트에 넘긴다, 주소는 jsp나 타입리프에 넘기는것이다. 지금은 리액트 화면에 넘기기위해 데이터만 넘긴다.
		System.out.println("컨트롤러 - memberUpdate");
		System.out.println(dto);
		service.editEmployee(dto);
	
		System.out.println("update [성공]");
	}

	//주의 사항 - 엑소시오 의 능력과 restAPI에 대해서 알아보기
	@DeleteMapping("/deleteEmployee/{id}") 
	public void memberDelete(@PathVariable String id) throws ServletException, IOException{
		
		System.out.println("컨트롤러 - delete");
		service.deleteMember(id);
		
		System.out.println("delete [성공]");
		
	}

	
}
