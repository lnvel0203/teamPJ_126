package springBoot_team_pj_126.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Table(name="MAIL_TBL")
@Entity
public class MailDTO {

	@Id
	private int mailNo;
	private String documentType;
	private String id;
	private String responser;
	private String title;
	private String content;
	private String mailDate;
	
}
