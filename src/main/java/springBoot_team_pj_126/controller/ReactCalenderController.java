package springBoot_team_pj_126.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.CalenderDTO;
import springBoot_team_pj_126.service.CalenderServiceImpl;

@RestController
@RequestMapping(value="/members")
public class ReactCalenderController {
	
	private static final Logger logger = LoggerFactory.getLogger(ReactCalenderController.class);

	@Autowired
	CalenderServiceImpl service;
	
	// localhost:8081/calender
	
	@GetMapping("/calender/{id}")
	public List<CalenderDTO> calenderList(@PathVariable String id, HttpServletRequest req, Model model)
		throws ServletException ,IOException{
		logger.info("<<<url - calenderList()>>>");

		
		System.out.println(id);
		
		return service.listAll(id,req, model);
		
	}
	
	@GetMapping("/calender/getcontent/{id}")
	public String calenderContent(@PathVariable String id)
		throws ServletException ,IOException{
		logger.info("<<<url - calenderContent()>>>");

		
		System.out.println(id);
		String content = service.selectCalender(id);
		System.out.println(content);
		return content;
		
	}
	
	@PostMapping("/insert")
	public void calenderInsert(@RequestBody CalenderDTO calenderDTO)
			throws ServletException ,IOException{
		logger.info("<<<url - calenderInsert()>>>");
		
		service.insertCalender(calenderDTO);
		System.out.println("calenderInsert  성공!~~");
	}
	
	@DeleteMapping("/delete/{title}")
	public void calenderDelete(@PathVariable String title)
			throws ServletException ,IOException{
		logger.info("<<<url - calenderDelete()>>>");
		service.deleteCalender(title);
		System.out.println("삭제 성공"+ title);
		
	}
	
	
	
}
