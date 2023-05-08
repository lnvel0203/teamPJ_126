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
	
	@PostMapping("/addDocument")
	public void addDocument(@RequestBody DocumentDTO dto) throws ServletException, IOException{
		System.out.println(dto);
		service.addDocument(dto); 
		
	}

	
}
