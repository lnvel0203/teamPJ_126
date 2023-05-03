package springBoot_team_pj_126.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Builder;
import lombok.Data;

@Entity
@Table(name="document_tbl")
@Builder
@Data
public class DocumentDTO {
	@Id
	private Long id;
    private String documentNo;
    private String title;
    private String author;
    private Date draftDate;
    private String docType;
    private String docState;
}
