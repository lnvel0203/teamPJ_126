package springBoot_team_pj_126.service;

import java.util.List;

import springBoot_team_pj_126.dto.MailDTO;

public interface MailService {

	public void addMail(MailDTO dto);
	
	public List<MailDTO> mailList(String id);
}
