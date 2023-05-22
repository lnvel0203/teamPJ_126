package springBoot_team_pj_126.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="board")
@Data
public class BoardDTO {
	@Id
	private int boardNo;
	private String title;
	private String content;
	private String id;
	private String inputDate;
	
}
