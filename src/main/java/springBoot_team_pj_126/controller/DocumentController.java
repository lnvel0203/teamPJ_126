package springBoot_team_pj_126.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

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

import springBoot_team_pj_126.dto.DocumentDTO;
import springBoot_team_pj_126.dto.UserDTO;
import springBoot_team_pj_126.service.DocumentService;


@RequestMapping(value="/members")
@RestController
public class DocumentController {

	@Autowired(required=true)
	private DocumentService service;
	//http://localhost:8081/members	
	//localhost:8080/members =>가 첫 url인데
	
	@GetMapping("/document")
	public List<DocumentDTO> DocumentList(HttpServletRequest req, Model model) 
			throws ServletException, IOException{
		System.out.println("컨트롤러 - DocumentList");
		List<DocumentDTO> list = service.documentList(req, model);
		System.out.println("list : " + list);
		return service.documentList(req, model);
	}
	
	@GetMapping("/approver")
	public List<UserDTO> ApproverList(HttpServletRequest req, Model model) 
			throws ServletException, IOException{
		System.out.println("컨트롤러 - ApproverList");
		List<UserDTO> list = service.approverList(req, model);
		System.out.println("list : " + list);
		return service.approverList(req, model);
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
	
	@PostMapping("/addDocument")
	public void addDocument(@RequestBody DocumentDTO dto) throws ServletException, IOException{
		System.out.println(dto);
		service.addDocument(dto); 
		
	}

	
}
