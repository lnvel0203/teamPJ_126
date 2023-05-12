package springBoot_team_pj_126.dto;


import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.Data;

@Entity
@Table(name="document_tbl")
@Data
public class DocumentDTO {
    
	
    private String id;
    
    @Id
    private String documentNo;
    private String title;
    private String author;
    private Date draftDate;
    private String documentType;
    private String documentState;
    private String retentionPeriod;
    private String securityLevel;
    private String content;
    private String rejectionReason;
    
    private Integer firstApproverNo;
    private Integer secondApproverNo;
    private Integer thirdApproverNo;
    private Integer fourthApproverNo;
    
    private String firstApproverState; 
    private String secondApproverState;
    private String thirdApproverState; 
    private String fourthApproverState;
    private Integer deptid;
    private String filePath;

    
}
