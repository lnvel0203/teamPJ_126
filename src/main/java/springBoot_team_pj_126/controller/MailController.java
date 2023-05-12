package springBoot_team_pj_126.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springBoot_team_pj_126.dto.MailDTO;
import springBoot_team_pj_126.service.MailServiceImpl;


@RequestMapping(value="/mail")
@RestController
public class MailController {

	@Autowired
	private MailServiceImpl service;

	private static final Logger logger = LoggerFactory.getLogger(MypageController.class);

	// ========================================================

	@PostMapping("/addMail")
	public void addMail(@RequestBody MailDTO dto) 
			throws ServletException, IOException{
		logger.info("MailController - addMail()");
		System.out.println("mailDTO"+ dto);
		service.addMail(dto);
	}
	
	@GetMapping("/getMailList/{id}")
	public List<MailDTO> mailList(@PathVariable String id) throws ServletException, IOException{
		
		logger.info("MailController - mailList()");
		
		List<MailDTO> list = service.mailList(id);
		return list;
	}

	@GetMapping("/getReMailList/{id}")
	public List<MailDTO> reMailList(@PathVariable String id) throws ServletException, IOException{
		
		logger.info("MailController - mailList()");
		
		List<MailDTO> list = service.reMailList(id);
		return list;
	}

	@GetMapping("/getReqMailList/{id}")
	public List<MailDTO> reqMailList(@PathVariable String id) throws ServletException, IOException{
		
		logger.info("MailController - mailList()");
		
		List<MailDTO> list = service.reqMailList(id);
		return list;
	}




}
