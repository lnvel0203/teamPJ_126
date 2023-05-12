package springBoot_team_pj_126.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springBoot_team_pj_126.dao.MailMapper;
import springBoot_team_pj_126.dto.MailDTO;

@Service
public class MailServiceImpl implements MailService{

	@Autowired
	private MailMapper mapper;
	
	@Override
	public void addMail(MailDTO dto) {
		
		mapper.addMailMapper(dto);
		
	}

	@Override
	public List<MailDTO> mailList(String id) {
		
		
		List<MailDTO> list = mapper.mailList(id);		
		return list;
	}

}
