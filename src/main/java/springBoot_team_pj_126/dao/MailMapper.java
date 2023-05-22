package springBoot_team_pj_126.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import springBoot_team_pj_126.dto.MailDTO;

@Mapper
public interface MailMapper {

	public void addMailMapper(MailDTO dto);
	
	public List<MailDTO> mailList(String id);
	public List<MailDTO> reMailList(String id);
	public List<MailDTO> reqMailList(String id);
	public MailDTO getMail(int mailNo);
}
