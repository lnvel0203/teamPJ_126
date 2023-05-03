package springBoot_team_pj_126.controller;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.jar.Attributes;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.eclipse.jdt.internal.compiler.codegen.AttributeNamesConstants;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import springBoot_team_pj_126.dto.MemberDTO;
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
	
	@PostMapping("/editEmployee")
//	@PutMapping("/editEmployee/{no}") //-> @PathVariale로 받는다
//	@GetMapping
	public void memberUpdate(UserDTO dto, Model model) 
			throws ServletException, IOException{ //@RequestBody ==> req.getParameter("dto");
		//리스트 데이터를 넘긴다. -- 리액트에 넘긴다, 주소는 jsp나 타입리프에 넘기는것이다. 지금은 리액트 화면에 넘기기위해 데이터만 넘긴다.
		System.out.println("컨트롤러 - memberUpdate");
		System.out.println(dto);
		service.editEmployee(dto);
	
		System.out.println("update [성공]");
	}
	
//	//RESTAPI를 쓰고있다. ? 이 매핑이 restAPI인가?
//	@PostMapping("/join")
//	public void memberInsert(@RequestBody MemberDTO member) throws ServletException, IOException{
//		//리스트 데이터를 넘긴다. -- 리액트에 넘긴다, 주소는 jsp나 타입리프에 넘기는것이다. 지금은 리액트 화면에 넘기기위해 데이터만 넘긴다.
//		System.out.println("컨트롤러 - insert");
//		mservice.insertMember(member);
//		System.out.println("insert [성공]");
//	}
//	
	
//	//RESTAPI를 쓰고있다. ? 이 매핑이 restAPI인가?
//	@PostMapping("/login")
//	public void login(@RequestBody MemberDTO member) throws ServletException, IOException{
//		//리스트 데이터를 넘긴다. -- 리액트에 넘긴다, 주소는 jsp나 타입리프에 넘기는것이다. 지금은 리액트 화면에 넘기기위해 데이터만 넘긴다.
//		System.out.println("컨트롤러 - login");
//		
//		System.out.println(member.getId());
//		System.out.println(member.getPassword());
//		
//		mservice.selectMember(member);
//		
//		// JWT 인증을 해야한다
//		
//		System.out.println("login [성공]");
//		
//	}
//	

//	
//	@GetMapping("/{id}") // select할때 key값전달을 위함이다.
//	public MemberDTO fetchMemberID(@PathVariable MemberDTO member) throws ServletException, IOException{
//		//리스트 데이터를 넘긴다. -- 리액트에 넘긴다, 주소는 jsp나 타입리프에 넘기는것이다. 지금은 리액트 화면에 넘기기위해 데이터만 넘긴다.
//		System.out.println("컨트롤러 - select");
//		return mservice.selectMember(member);
//	}
//	
//	
//	
//	
//	//!!!! 반드시 @RequestBody를 쓰는 이유를 알아야만 리액트를 쓸수있다.
//	//url 상에 추가된것! put공부하기
//	@PutMapping("/{id}") //-> @PathVariale로 받는다
//	public void memberUpdate(@PathVariable int id, @RequestBody MemberDTO member) throws ServletException, IOException{ //@RequestBody ==> req.getParameter("dto");
//		//리스트 데이터를 넘긴다. -- 리액트에 넘긴다, 주소는 jsp나 타입리프에 넘기는것이다. 지금은 리액트 화면에 넘기기위해 데이터만 넘긴다.
//		System.out.println("컨트롤러 - update");
//		mservice.updateMember(member);
//		
//		System.out.println("update [성공]");
//		
//	}
	//주의 사항 - 엑소시오 의 능력과 restAPI에 대해서 알아보기
	@DeleteMapping("/{no}") 
	public void memberDelete(@PathVariable int no) throws ServletException, IOException{
		
		System.out.println("컨트롤러 - delete");
		service.deleteMember(no);
		
		System.out.println("delete [성공]");
		
	}

	
}
